/*
body parameters:
    - difficulty, string default easy
    - solution, boolean default true,
    - array, boolean default false
*/

import "dotenv/config";
import { Collection, MongoClient, UpdateFilter, WithId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "@/utils/key";
import { boardStringToGrid, getIsometry, getRotation } from "@/utils/puzzles";

const client = new MongoClient(process.env.MONGODB_URI as string);

type ApiKeyDoc = {
  hashedKey: string;
  ipArray?: string[];
  lastUsedAt?: Date;
  requestCountTotal?: number;
  requestCountMonth?: number;
  requestCountMinute?: number;
  currentMonth?: string;
  currentMinute?: string;
  expireAt?: Date | null;
  lastIp?: string | null;
};

type BoardObj = {
  _id: string;
  i: number;
  sudoku: string;
};

const difficultyToDBCollName: { [key: string]: string } = {
  easy: process.env.MONGODB_COLL_EASY as string,
  medium: process.env.MONGODB_COLL_MEDIUM as string,
  hard: process.env.MONGODB_COLL_HARD as string,
};

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

    // time strings used for metadata and validation
    const now = new Date();
    const currentMonth = `${String(now.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${now.getUTCFullYear()}`;
    const currentMinute = `${String(now.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(
      2,
      "0"
    )}-${now.getUTCFullYear()} ${String(now.getHours()).padStart(
      2,
      "0"
    )}:${String(now.getMinutes()).padStart(2, "0")}`;

    // check for valid api key
    if (!req.headers["x-api-key"]) {
      return res.status(400).json({
        error: "Missing API key.",
      });
    }

    const hashedKey = await hash(req.headers["x-api-key"] as string);
    const hashedKeyDoc = await apiKeysColl.findOne({ hashedKey: hashedKey });

    if (!hashedKeyDoc) {
      return res.status(401).json({
        error: "Invalid API key.",
      });
    } else if (!hashedKeyDoc.isActive) {
      return res.status(403).json({
        error:
          "The included API key has been deactivated due to rate limiting issues.",
      });
    } else if (
      hashedKeyDoc.currentMinute === currentMinute &&
      hashedKeyDoc.requestCountMinute >= 60
    ) {
      return res.status(403).json({
        error:
          "The included API key has reached its limit of 60 requests per minute. Please try again momentarily.",
      });
    }

    // get collection from database
    let coll: Collection<Document>;
    if (req.body.difficulty) {
      if (
        req.body.difficulty === "easy" ||
        req.body.difficulty === "medium" ||
        req.body.difficulty === "hard"
      ) {
        coll = db.collection(difficultyToDBCollName[req.body.difficulty]);
      } else {
        return res.status(400).json({
          error:
            "Invalid 'difficulty' input. Please provide 'easy', 'medium', or 'hard', or use the default difficulty of 'easy'.",
        });
      }
    } else {
      coll = db.collection(difficultyToDBCollName["easy"]);
    }

    // instatiate return object with difficulty
    let retObj: { [key: string]: any } = {
      difficulty: req.body.difficulty || "easy",
    };

    // get random puzzle and solution from database
    const randn = Math.floor(Math.random() * 50000) + 1;
    const doc = (await coll.findOne({ i: randn })) as WithId<Document>;
    const docObj: object = { ...doc, _id: doc._id.toString() };
    const boardObj = docObj as BoardObj;
    const [puzzleIsometry, solutionIsometry] = getIsometry(
      boardObj.sudoku.split(",")[0],
      boardObj.sudoku.split(",")[1]
    );
    const [puzzle, solution] = getRotation(puzzleIsometry, solutionIsometry);

    // add puzzle to return object
    retObj.puzzle = puzzle;

    // handle logic for adding/not adding solution
    if (req.body.solution && typeof req.body.solution !== "boolean") {
      return res.status(400).json({
        error:
          "Invalid 'solution' input. Please provide a boolean value or use the default value of false.",
      });
    } else if (req.body.solution !== false) {
      retObj.solution = solution;
    }

    // handle logic for returning string or array
    if (req.body.array && typeof req.body.array !== "boolean") {
      return res.status(400).json({
        error:
          "Invalid 'array' input. Please provide a boolean value or use the default value of false.",
      });
    } else if (req.body.array === true) {
      retObj.puzzle = boardStringToGrid(retObj.puzzle);
      if (retObj.hasOwnProperty("solution")) {
        retObj.solution = boardStringToGrid(retObj.solution);
      }
    }

    // update metadata for associated key
    let update: UpdateFilter<ApiKeyDoc> = {
      $addToSet: {
        ipArray: req.headers["x-forwarded-for"] ?? "",
      },
      $currentDate: {
        lastUsedAt: true,
      },
      $inc: {
        requestCountTotal: 1,
      },
      $set: {
        expireAt: null,
        lastIp:
          typeof req.headers["x-forwarded-for"] === "string"
            ? req.headers["x-forwarded-for"]
            : "",
      },
    };

    // let update;

    if (hashedKeyDoc.currentMonth === currentMonth) {
      if (hashedKeyDoc.requestCountMonth + 1 < 25000) {
        update = {
          ...update,
          $inc: {
            ...update.$inc,
            requestCountMonth: 1,
          },
        };
      } else {
        update = {
          ...update,
          $inc: {
            ...update.$inc,
            requestCountMonth: 1,
          },
          $set: {
            ...update.$set,
            isActive: false,
          },
        };
      }
    } else {
      update = {
        ...update,
        $set: {
          ...update.$set,
          currentMonth: currentMonth,
          requestCountMonth: 1,
        },
      };
    }

    if (hashedKeyDoc.currentMinute === currentMinute) {
      update = {
        ...update,
        $inc: {
          ...update.$inc,
          requestCountMinute: 1,
        },
      };
    } else {
      update = {
        ...update,
        $set: {
          ...update.$set,
          currentMinute: currentMinute,
          requestCountMinute: 1,
        },
      };
    }

    apiKeysColl.updateOne({ hashedKey: hashedKey }, update);

    return res.status(200).json(retObj);
  } catch (_) {
    return res.status(500).json({
      error: "Unable to retrieve puzzle from database.",
    });
  }
}
