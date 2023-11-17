import { useState, useEffect } from "react"

import Boards from "./components/Boards"
import CTA from "./components/CTA"
import Examples from "./components/Examples"
import Features from "./components/Features"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Quickstart from "./components/Quickstart"

export default function Home() {
	const [loading, setLoading] = useState<boolean>(false)
	const [difficulty, setDifficulty] = useState<string>("")
    const [puzzle, setPuzzle] = useState<string>("0".repeat(81))
	const [solution, setSolution] = useState<string>("0".repeat(81))

	useEffect(() => {
		generateBoard()
	}, [])

	const generateBoard = async () => {
        if (!loading) {
            try {
                setLoading(true)

                const res = await fetch("/api", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)]
                    })
                })
                const data = await res.json()

				setDifficulty(data.difficulty)
                setPuzzle(data.puzzle)
                setSolution(data.solution)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }
	}

	return (
		<>
			<Header />
			{/* call to action and boards */}
			<div className="py-8 lg:py-12 xl:py-14 flex flex-col justify-center items-center">
				<CTA />
				<Boards puzzle={puzzle} solution={solution} generateBoard={generateBoard} />
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
	)
}
