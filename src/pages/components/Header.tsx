import Link from "next/link"
import { scroller } from "react-scroll"
import { updateCopied } from "@/redux/features/copied"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useState, useEffect } from "react"

import dynamic from "next/dynamic"
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {ssr: false})

export default function Header() {
    const copied = useAppSelector(state => state.copied.value)
    const theme = useAppSelector(state => state.theme.value)
    const dispatch = useAppDispatch()

    const [scrollDirection, setScrollDirection] = useState<string | null>(null)

    useEffect(() => {
        if (copied) {
            const timeoutId = setTimeout(() => {
                dispatch(updateCopied(false))
            }, 2500)

            return () => clearTimeout(timeoutId)
        }
    }, [copied, dispatch])

    useEffect(() => {
        let prevScrollY = window.scrollY

        const updateScrollDirection = () => {
            const scrollY = window.scrollY
            const direction = scrollY > prevScrollY ? "down" : "up"
            if (direction !== scrollDirection) {
                setScrollDirection(direction)
            }
            prevScrollY = scrollY
        }

        window.addEventListener("scroll", updateScrollDirection)

        return () => {
            window.removeEventListener("scroll", updateScrollDirection)
        }
    }, [scrollDirection])

    const handleClickToScroll = (id: string) => {
        scroller.scrollTo(id, {
            duration: 800,
            delay: 0,
            smooth: true,
            offset: -100
        })
    }

    return (
        <>
            <div className={`border-board border-b-[1px] flex flex-col sticky z-50 ${scrollDirection === "down" ? "-top-[57px] xs:-top-[61px] sm:-top-[69px]" : "top-0"} transition-all duration-500`}>
                {/* header */}
                <div className="bg-header-bg w-full py-2.5 flex justify-center items-center relative z-50">
                    <div className="w-full max-w-6xl flex items-center">
                        <div className="w-1/4 lg:w-0"></div>
                        <Link href="/" className="w-full sm:w-1/2 lg:w-1/5 font-poppins font-bold flex justify-center">
                            <div className="text-3xl xs:text-4xl sm:text-5xl gradient-text">
                                YDS
                            </div>
                            <div className="text-sm xs:text-base sm:text-lg gradient-text-alt">
                                (API)
                            </div>
                        </Link>
                        <div className="text-primary w-3/5 hidden lg:block font-inter text-lg">
                                <button className="mx-3" onClick={() => handleClickToScroll("features")}>
                                    Features
                                </button>
                                <button className="mx-3" onClick={() => handleClickToScroll("quickstart")}>
                                    Quickstart
                                </button>
                                <button className="mx-3" onClick={() => handleClickToScroll("examples")}>
                                    Examples
                                </button>
                            </div>
                        <div className="w-1/4 lg:w-1/5 flex justify-center items-center">
                            <div className="lg:mx-3">
                                <ThemeToggle />
                            </div>
                            <Link href="https://github.com/kevinstewartmercurio/you-do-sudoku-api" target="_blank" rel="noreferrer" className={`${theme === "light" ? "text-[#c4c4c4]" : "text-[#3c3c3c]"} mx-3 hidden lg:flex justify-center items-center hover:text-primary duration-300`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 496 512">
                                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* copied to clipboard alert */}
                <div className="sticky z-40">
                    <div className={`bg-copied-bg w-full px-6 py-1 flex justify-center font-inter absolute z-40 ${copied ? "top-0" : "-top-10"} transition-all duration-500`}>
                        <div className="w-max flex items-center">
                            <div className="text-primary flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg>
                            </div>
                            <div className="text-primary w-full md:max-w-3xl lg:max-w-6xl ml-2.5 text-sm sm:text-base lg:text-lg">
                                Copied to clipboard!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}