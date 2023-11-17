import { CopyToClipboard } from "react-copy-to-clipboard"
import { updateCopied } from "@/redux/features/copied"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

export default function Quickstart() {
    const copied = useAppSelector(state => state.copied.value)
    const dispatch = useAppDispatch()

    return (
        <>
            <div id="quickstart" className="flex flex-col items-center">
                <div className="md:max-w-3xl lg:max-w-6xl mb-3 sm:mb-5 lg:mb-6 px-6 flex flex-col lg:flex-row justify-center">
                    <div className="text-primary mb-1.5 sm:mb-2.5 text-4xl sm:text-5xl lg:text-6xl font-poppins font-semibold">
                        Quickstart
                    </div>
                    <div className="text-secondary lg:ml-8 text-sm sm:text-base lg:text-lg font-inter">
                        There are no external libraries or dependencies required to use the YouDoSudoku API. Simply send a request to the API route.
                    </div>
                </div>
                <CopyToClipboard text="https://you-do-sudoku-api.vercel.app/api">
                    <button className="w-full px-4 flex justify-center" onClick={() => dispatch(updateCopied(true))}>
                        <div className="bg-quickstart-route-accent rounded-l-2xl w-1.5 h-11 lg:h-12"></div>
                        <div className="text-secondary bg-quickstart-route-bg rounded-r-2xl w-64 xs:w-5/6 max-w-lg lg:max-w-xl px-3.5 py-2.5 text-sm sm:text-base lg:text-lg flex items-center overflow-auto whitespace-nowrap">
                            <code>
                                https://youdosudoku.com/api
                            </code>
                        </div>
                    </button>
                </CopyToClipboard>
            </div>
        </>
    )
}