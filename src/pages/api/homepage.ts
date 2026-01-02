import "dotenv/config";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      `${process.env.YOUDOSUDOKU_API_URL ?? "http://localhost:3000"}/api`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.YOUDOSUDOKU_API_KEY ?? "",
        },
        body: JSON.stringify({
          difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)],
        }),
      }
    );
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
}
