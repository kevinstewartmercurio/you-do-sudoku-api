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
    const apiKeysColl = db.collection(
      process.env.MONGODB_COLL_API_KEYS as string
    );

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
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 1);

    await apiKeysColl.insertOne({
      hashedKey: hashedKey,
      isActive: true,
      createdAt: new Date(),
      expireAt: expirationTime,
      lastUsedAt: null,
      requestCount: 0,
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
