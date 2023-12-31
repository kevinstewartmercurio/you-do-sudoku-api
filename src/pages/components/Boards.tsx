export default function Boards(props: {puzzle: string, solution:string, generateBoard: () => Promise<void>}) {
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
                            {(props.puzzle || "0".repeat(81)).split("").map((c: string, idx: number) => (
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
                            {(props.solution || "0".repeat(81)).split("").map((c: string, idx: number) => (
                                <div key={idx} className={`border-board border-[.5px] ${getCellBorderStyling(idx)} w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 flex justify-center items-center`}>
                                    {c === "0" ? "" : c}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-1.5 xs:mt-3 sm:mt-3.5 flex">
                    <button className="text-secondary-btn-text bg-secondary-btn-bg border-secondary-btn-border border-[1px] rounded-lg px-3 py-1 font-inter text-sm sm:text-base lg:text-lg hover:bg-secondary-btn-bg-hover hover:border-secondary-btn-border-hover duration-300" onClick={(e) => {
                            e.preventDefault()
                            props.generateBoard()
                        }}>
                        Generate Board
                    </button>
                </div>
            </div>
        </>
    )
}