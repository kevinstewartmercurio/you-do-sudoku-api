import "dotenv/config";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateApiKey, hash } from "@/utils/key";

const client = new MongoClient(process.env.MONGODB_URI as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DBNAME as string);
    const ipsColl = db.collection(
      process.env.MONGODB_COLL_IP_ADDRESSES as string
    );
    const apiKeysColl = db.collection(
      process.env.MONGODB_COLL_API_KEYS as string
    );

    const nowStr = new Date().toISOString();
    const currentMonth = `${nowStr.slice(5, 7)}-${nowStr.slice(0, 4)}`;
    const currentDay = `${nowStr.slice(5, 10)}-${nowStr.slice(0, 4)}`;
    const currentMinute = `${nowStr.slice(5, 10)}-${nowStr.slice(
      0,
      4
    )} ${nowStr.slice(11, 16)}`;

    // check daily request count from ip address
    const rawIp = req.headers["x-forwarded-for"];
    const ip = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : null;

    if (ip) {
      const ipExpirationTime = new Date();
      ipExpirationTime.setUTCHours(24, 0, 0, 0);

      const ipDoc = await ipsColl.findOneAndUpdate(
        { ip: ip },
        [
          {
            $set: {
              requestCountDay: {
                $cond: [
                  { $eq: ["$currentDay", currentDay] },
                  { $add: ["$requestCountDay", 1] },
                  1,
                ],
              },
              currentDay: currentDay,
              expireAt: ipExpirationTime,
            },
          },
        ],
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      if (ipDoc?.requestCountDay > 10) {
        return res.status(429).json({
          error:
            "Too many API keys created from this IP address recently. Please try again later.",
        });
      }
    }

    // generate key
    let key = generateApiKey();
    let hashedKey = await hash(key);

    // check that key is not already in use
    let existingDoc = await apiKeysColl.findOne({
      hashedKey: hashedKey,
    });

    while (existingDoc) {
      key = generateApiKey();
      hashedKey = await hash(key);

      existingDoc = await apiKeysColl.findOne({ hashedKey: hashedKey });
    }

    // create document
    const keyExpirationTime = new Date();
    keyExpirationTime.setMinutes(keyExpirationTime.getMinutes() + 60);

    await apiKeysColl.insertOne({
      hashedKey: hashedKey,
      isActive: true,
      createdAt: new Date(),
      expireAt: keyExpirationTime,
      lastUsedAt: null,
      currentMonth: currentMonth,
      currentMinute: currentMinute,
      requestCountTotal: 0,
      requestCountMonth: 0,
      requestCountMinute: 0,
      createdFromIp: req.headers["x-forwarded-for"],
      lastIp: req.headers["x-forwarded-for"],
      ipArray: [req.headers["x-forwarded-for"]],
    });

    return res.status(200).json({
      key: key,
    });
  } catch (_) {
    return res.status(500).json({
      error: "Unable to create API key.",
    });
  }
}
