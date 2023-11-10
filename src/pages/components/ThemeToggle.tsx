import { updateTheme } from "@/redux/features/theme"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useEffect } from "react"

export default function ThemeToggle() {
    const theme = useAppSelector(state => state.theme.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.documentElement.setAttribute("theme", theme)
    }, [])

    return (
        <button className={`${theme === "light" ? "text-[#000000] bg-[#ffffff] border-[#000000]" : "text-[#ffffff] bg-[#000000] border-[#ffffff]"} border-[1px] rounded-lg px-2 py-0.5`} onClick={(e) => {
            theme === "light" ? dispatch(updateTheme("dark")) : dispatch(updateTheme("light"))

            const rootElement = document.documentElement
            rootElement.setAttribute("theme", (rootElement.getAttribute("theme") === "light" ? "dark" : "light"))
        }}>
            toggle style
        </button>
    )
}