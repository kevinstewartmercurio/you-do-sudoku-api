/*
body parameters:
    - difficulty, string default easy
    - solution, boolean default true,
    - array, boolean default false
*/

import "dotenv/config";
import { Collection, MongoClient, WithId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "@/utils/key";
import { boardStringToGrid, getIsometry, getRotation } from "@/utils/puzzles";

const client = new MongoClient(process.env.MONGODB_URI as string);

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

    return res.status(200).json(retObj);
  } catch (_) {
    return res.status(500).json({
      error: "Unable to retrieve puzzle from database.",
    });
  }
}
