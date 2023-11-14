import dynamic from "next/dynamic"
import Link from "next/link"
import { updateCopied } from "@/redux/features/copied"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useState, useEffect } from "react"

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {ssr: false})

export default function Header() {
    const copied = useAppSelector(state => state.copied.value)
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

    return (
        <>
            <div className={`border-board border-b-[1px] flex flex-col sticky z-50 ${scrollDirection === "down" ? "-top-[57px] xs:-top-[61px] sm:-top-[69px]" : "top-0"} transition-all duration-500`}>
                {/* header */}
                <div className="bg-header-bg w-full py-2.5 flex items-center relative z-50">
                    <div className="w-1/4"></div>
                    <Link href="/" className="w-full sm:w-1/2 font-poppins font-bold flex justify-center">
                        <div className="text-3xl xs:text-4xl sm:text-5xl gradient-text">
                            YDS
                        </div>
                        <div className="text-sm xs:text-base sm:text-lg gradient-text-alt">
                            (API)
                        </div>
                    </Link>
                    <div className="w-1/4 flex justify-center">
                        <ThemeToggle />
                    </div>
                </div>
                {/* copied to clipboard alert */}
                <div className="sticky z-40">
                    <div className={`bg-copied-bg w-full px-6 py-1.5 flex justify-center font-inter absolute z-40 ${copied ? "top-0" : "-top-8 sm:-top-9 lg:-top-10"} transition-all duration-500`}>
                        <div className="w-max flex items-center">
                            <div className="text-primary flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
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