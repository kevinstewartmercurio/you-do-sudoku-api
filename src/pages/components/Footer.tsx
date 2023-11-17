import Link from "next/link"

export default function Footer() {
    return (
        <>
            <div className="text-footer py-6 font-inter text-xs sm:text-sm flex justify-center items-center">
                <div>
                    Designed and built by&nbsp;
                    <Link href="https://www.kevinstewartmercurio.com/" target="_blank" rel="noreferrer" className="underline">
                        Kevin Stewart-Mercurio
                    </Link>
                </div>
                <div>
                    &nbsp;&nbsp;&#x2022;&nbsp;&nbsp;
                </div>
                <div>
                    November 2023
                </div>
            </div>
        </>
    )
}