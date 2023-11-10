import Board from "./components/Board"
import ThemeToggle from "./components/ThemeToggle"

export default function Home() {
	return (
		<>
			<div className="min-h-[100vh] flex flex-col justify-center items-center">
				<ThemeToggle />
				<div className="mb-10 flex flex-col justify-center items-center">
					<div className="font-poppins font-bold flex">
						<div className="text-[max(48px,min(5vw,76px))] gradient-text">
							YouDoSudoku
						</div>
						<div className="text-[max(21px,min(2.1875vw,33.25px))] gradient-text-alt">
							(API)
						</div>
					</div>
					<div className="text-secondary text-[max(15px,min(2vw,20px))] text-center">
						With varying difficulty levels and guaranteed unique solutions, it&#39;s Sudoku at your fingertips. Made just for you.
					</div>
				</div>
				<Board />
			</div>
		</>
	)
}
