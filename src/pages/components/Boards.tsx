import { useState, useEffect } from "react"

export default function Boards() {
    const [loading, setLoading] = useState<boolean>(false)
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

                setPuzzle(data.puzzle)
                setSolution(data.solution)
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }
	}

    const getCellBorderStyling = (idx: number): string => {
        let retStr = ""

        // outside edges
        if (idx >= 0 && idx <= 8) {retStr += "border-t-[4px] "}
        if (idx % 9 === 0) {retStr += "border-l-[4px] "}
        if (idx % 9 === 8) {retStr += "border-r-[4px] "}
        if (idx >= 72 && idx <= 80) {retStr += "border-b-[4px] "}

        // half width top (cells in rows 3 and 6)
        if ((idx >= 27 && idx <= 35) || (idx >= 54 && idx <= 62)) {retStr += "border-t-[2px] "}
        // half width left (cells in columns 3 and 6)
        if ((idx % 9 === 3) || (idx % 9 === 6)) {retStr += "border-l-[2px] "}
        // half width right (cells in columns 2 and 5)
        if ((idx % 9 === 2) || (idx % 9 === 5)) {retStr += "border-r-[2px] "}
        // half width bottom (cells in rows 2 and 5)
        if ((idx >= 18 && idx <= 26) || (idx >= 45 && idx <= 53)) {retStr += "border-b-[2px] "}

        // round corners
        if (idx === 0) {retStr += "rounded-tl-lg "}
        else if (idx === 8) {retStr += "rounded-tr-lg "}
        else if (idx === 72) {retStr += "rounded-bl-lg"}
        else if (idx === 80) {retStr += "rounded-br-lg"}

        return retStr
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="font-inter flex flex-col sm:flex-row">
                    <div className="my-1 sm:mx-2 sm:my-0">
                        <div className="text-primary w-full font-semibold xs:text-lg text-center">
                            Puzzle
                        </div>
                        <div className="text-secondary grid grid-cols-9 text-sm md:text-base">
                            {puzzle.split("").map((c: string, idx: number) => (
                                <div key={idx} className={`border-board border-[.5px] ${getCellBorderStyling(idx)} w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 flex justify-center items-center`}>
                                    {c === "0" ? "" : c}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="my-1 sm:mx-2 sm:my-0">
                        <div className="text-primary w-full font-semibold xs:text-lg text-center">
                            Solution
                        </div>
                        <div className="text-secondary grid grid-cols-9 text-sm md:text-base">
                            {solution.split("").map((c: string, idx: number) => (
                                <div key={idx} className={`border-board border-[.5px] ${getCellBorderStyling(idx)} w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 flex justify-center items-center`}>
                                    {c === "0" ? "" : c}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-1.5 xs:mt-3 flex">
                    <button className="text-secondary-btn-text bg-secondary-btn-bg border-secondary-btn-border border-[1px] rounded-lg px-3 py-1 font-inter hover:bg-secondary-btn-bg-hover hover:border-secondary-btn-border-hover duration-300" onClick={(e) => {
                            e.preventDefault()
                            generateBoard()
                        }}>
                        Generate Board
                    </button>
                </div>
            </div>
        </>
    )
}