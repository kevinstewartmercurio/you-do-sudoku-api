import dynamic from "next/dynamic"
import Link from "next/link"
import { useState, useEffect } from "react"

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {ssr: false})

export default function Header() {
    const [scrollDirection, setScrollDirection] = useState<string | null>(null)

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
            <div className={`bg-header-bg backdrop-blur-md border-board border-b-[1px] py-2.5 flex items-center sticky z-50 ${scrollDirection === "down" ? `-top-[57px] xs:-top-[61px] sm:-top-[69px]` : "top-0"} transition-all duration-500`}>
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
        </>
    )
}