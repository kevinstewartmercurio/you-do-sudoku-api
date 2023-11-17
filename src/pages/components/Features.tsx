import { useState, useEffect } from "react"

type Card = {
    svg: JSX.Element,
    title: string,
    content: string
}

const cards: Card[] = [
    {
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
            </svg>
        ),
        title: "Free",
        content: "The YouDoSudokuAPI routes are 100% free to use."
    },
    {
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-braces" viewBox="0 0 16 16">
                <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"/>
            </svg>
        ),
        title: "JSON Formatted",
        content: "Responses are served in JSON format, making for easy use and reliable integration."
    },
    {
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
            </svg>
        ),
        title: "Unique Puzzles",
        content: "Access more than 200 billion puzzles stored in our database."
    }
]

// Our API is designed to be light on resources, ensuring a minimal impact on your application's performance.
// Whether you're handling a handful of users or a massive user base, our lightweight Sudoku API scales effortlessly to meet your application's demands.

export default function Features() {
    return (
        <>
            <div id="features" className="flex flex-col items-center">
                <div className="md:max-w-3xl lg:max-w-6xl mb-3 sm:mb-5 px-6 flex flex-col lg:flex-row justify-center">
                    <div className="text-primary mb-1.5 sm:mb-2.5 text-4xl sm:text-5xl lg:text-6xl font-poppins font-semibold">
                        Features
                    </div>
                    <div className="text-secondary lg:ml-8 text-sm sm:text-base lg:text-lg font-inter">
                        The YouDoSudoku API is designed to be light on resources, ensuring a minimal impact on your application&#39;s performance.
                    </div>
                </div>
                <div className="px-4 flex flex-col lg:flex-row">
                    {cards.map((card, idx) => (
                        <div key={idx} className={`bg-feature-card-bg rounded-md lg:w-1/3 max-w-lg lg:max-w-sm md:mx-2.5 my-1 sm:my-1.5 lg:my-0 px-3.5 py-4 xs:py-5 sm:py-6 flex flex-col hover:scale-105 duration-[400ms] feature-card`}>
                            <div className="mb-2.5 flex items-center">
                                <div className="text-feature-card-icon">
                                    {card.svg}
                                </div>
                                <div className="text-primary ml-2 font-poppins text-xl lg:text-2xl font-bold">
                                    {card.title}
                                </div>
                            </div>
                            <div className="text-secondary px-1 font-inter text-sm sm:text-base lg:text-lg">
                                {card.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}