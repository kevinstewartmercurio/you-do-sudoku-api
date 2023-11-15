import Boards from "./components/Boards"
import CTA from "./components/CTA"
import Examples from "./components/Examples"
import Features from "./components/Features"
import Header from "./components/Header"
import Quickstart from "./components/Quickstart"

export default function Home() {
	return (
		<>
			<Header />
			{/* call to action and boards */}
			<div className="py-8 lg:py-12 flex flex-col justify-center items-center">
				<CTA />
				<Boards />
			</div>
			{/* features */}
			<div className="py-8 lg:py-12 flex justify-center items-center">
				<Features />
			</div>
			{/* quickstart */}
			<div className="py-8 lg:py-12 flex justify-center items-center">
				<Quickstart />
			</div>
			{/* examples */}
			<div className="py-8 lg:py-12 flex justify-center items-center">
				<Examples />
			</div>
			<div className="h-[200vh]"></div>
		</>
	)
}
