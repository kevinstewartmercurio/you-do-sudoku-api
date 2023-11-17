export default function CTA() {
    return (
        <div className="max-w-[768px] lg:max-w-[860px] mb-6 flex flex-col justify-center items-center">
            <div className="mb-2 xs:mb-4 sm:mb-6 md:mb-7 font-poppins font-bold flex">
                <div className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl gradient-text">
                    YouDoSudoku
                </div>
                <div className="xs:text-lg sm:text-xl md:text-2xl gradient-text-alt">
                    (API)
                </div>
            </div>
            <div className="text-secondary px-4 text-sm sm:text-base lg:text-lg text-center">
                With varying levels of difficulty and guaranteed unique solutions, it&#39;s Sudoku at your fingertips. Made just for you.
            </div>
        </div>
    )
}