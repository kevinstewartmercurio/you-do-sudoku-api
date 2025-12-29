/*
body parameters:
    - difficulty, string default easy
    - solution, boolean default true,
    - array, boolean default false
*/

import "dotenv/config";
import { Collection, MongoClient, WithId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

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

const boardStringToGrid = (s: string): string[][] => {
  // convert string representation of a board to a list of lists representation
  if (s.length !== 81) {
    throw new Error("Invalid input. Input length should be 81.");
  }

  const grid = [];
  for (let i = 0; i < s.length; i += 9) {
    const row = s.slice(i, i + 9).split("");
    grid.push(row);
  }

  return grid;
};

const getIsometry = (puzzle: string, solution: string): string[] => {
  // take the given puzzle and solution and return a random isometry
  // i.e. map all 2s to 9s, etc.
  if (puzzle.length !== 81 || solution.length !== 81) {
    throw new Error("Invalid input. Input length should be 81.");
  }

  let retPuzzle = "";
  let retSolution = "";
  const map = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].sort(
    () => Math.random() - 0.5
  );
  for (let i = 0; i < puzzle.length; i++) {
    retPuzzle += puzzle[i] === "0" ? "0" : map[parseInt(puzzle[i]) - 1];
    retSolution += map[parseInt(solution[i]) - 1];
  }

  return [retPuzzle, retSolution];
};

const getRotation = (puzzle: string, solution: string): string[] => {
  // take the given puzzle and solution, rotate 0-3 times, and return
  if (puzzle.length !== 81 || solution.length !== 81) {
    throw new Error("Invalid input. Input length should be 81.");
  }

  let retPuzzle = "";
  let retSolution = "";
  let tempPuzzle = "";
  let tempSolution = "";
  const randn = Math.floor(Math.random() * 4);
  for (let i = 0; i < randn; i++) {
    for (let i = 0; i < puzzle.length; i++) {
      tempPuzzle += puzzle[9 * (9 - (i % 9) - 1) + Math.floor(i / 9)];
      tempSolution += solution[9 * (9 - (i % 9) - 1) + Math.floor(i / 9)];
    }

    retPuzzle = tempPuzzle;
    retSolution = tempSolution;
    tempPuzzle = "";
    tempSolution = "";
  }

  return randn === 0 ? [puzzle, solution] : [retPuzzle, retSolution];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DBNAME as string);

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
