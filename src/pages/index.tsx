import { useState, useEffect } from "react";

import Boards from "./components/Boards";
import CTA from "./components/CTA";
import Examples from "./components/Examples";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Quickstart from "./components/Quickstart";

import { puzzles } from "@/utils/puzzles";
import { getIsometry, getRotation } from "@/utils/puzzles";

export default function Home() {
  const [difficulty, setDifficulty] = useState<string>("");
  const [puzzle, setPuzzle] = useState<string>("0".repeat(81));
  const [solution, setSolution] = useState<string>("0".repeat(81));

  useEffect(() => {
    generateBoard();
  }, []);

  const generateBoard = async () => {
    const randn = Math.floor(Math.random() * puzzles.length);

    const p = puzzles[randn];
    const [puzzleIsometry, solutionIsometry] = getIsometry(
      p.split(",")[0],
      p.split(",")[1]
    );
    const [rotatedPuzzle, rotatedSolution] = getRotation(
      puzzleIsometry,
      solutionIsometry
    );

    setDifficulty(
      randn / puzzles.length < 0.33
        ? "easy"
        : randn / puzzles.length < 0.66
        ? "medium"
        : "hard"
    );
    setPuzzle(rotatedPuzzle);
    setSolution(rotatedSolution);
  };

  return (
    <>
      <Header />
      {/* call to action and boards */}
      <div className="py-8 lg:py-12 xl:py-14 flex flex-col justify-center items-center">
        <CTA />
        <Boards
          puzzle={puzzle}
          solution={solution}
          generateBoard={generateBoard}
        />
      </div>
      {/* features */}
      <div className="py-8 lg:py-12 xl:py-14 flex justify-center items-center">
        <Features />
      </div>
      {/* quickstart */}
      <div className="py-8 lg:py-12 xl:py-14 flex justify-center items-center">
        <Quickstart />
      </div>
      {/* examples */}
      <div className="pt-8 pb-4 lg:pt-12 lg:pb-6 xl:pt-14 xl:pb-7 flex justify-center items-center">
        <Examples difficulty={difficulty} puzzle={puzzle} solution={solution} />
      </div>
      <Footer />
    </>
  );
}
