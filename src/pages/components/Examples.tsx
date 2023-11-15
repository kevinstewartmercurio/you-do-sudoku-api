import { CopyToClipboard } from "react-copy-to-clipboard"
import { updateCopied } from "@/redux/features/copied"
import { useAppDispatch } from "@/redux/hooks"
import { useState } from "react"

const pythonGETText = 'import requests\n\nresponse = requests.get("https://you-do-sudoku.com/api/")\n\nif response.status_code == 200:\n    data = response.json()\n    print(data)\nelse:\n    print(f"Error: {response.status_code}")'
const javascriptGETText = 'fetch("https://you-do-sudoku.com/api/")\n    .then(response => {\n        if (!response.ok) {\n            throw new Error(`Error: ${response.status}`)\n        }\n        return response.json()\n    })\n    .then(data => {\n        console.log(data)\n    })\n    .catch(error => {\n        console.error(error)\n    })'

const pythonPOSTText = 'body = {\n    "difficulty": "easy", # "easy", "medium", or "hard" (defaults to "easy")\n    "solution": True, # True or False (defaults to True)\n    "array": False # True or False (defaults to False)\n}\nheaders =  {"Content-Type":"application/json"}\n\nresponse = requests.post("https://you-do-sudoku-api.com/api/", json=body, headers=headers)'
const javascriptPOSTText = 'fetch("https://you-do-sudoku.com/api/", {\n    method: "POST",\n    headers: {"Content-Type": "application/json"},\n    body: JSON.stringify({\n        difficulty: "easy", // "easy", "medium", or "hard" (defaults to "easy")\n        solution: true, // true or false (defaults to true)\n        array: false // true or false (defaults to false)\n    })\n})'

function PythonGETExample() {
    return (
        <>
            <code className="w-full flex flex-col items-start">
                {/* import requests */}
                <span className="mb-3.5 sm:mb-4 lg:mb-[18px]">
                    <span className="text-code-4">
                        import&nbsp;
                    </span>
                    <span className="text-code-0">
                        requests
                    </span>
                </span>
                {/* response = requests.get("https://you-do-sudoku.com/api/") */}
                <span className="mb-3.5 sm:mb-4 lg:mb-[18px]">
                    <span className="text-code-0">
                        response&nbsp;
                    </span>
                    <span className="text-code-3">
                        =&nbsp;
                    </span>
                    <span className="text-code-0">
                        requests.
                    </span>
                    <span className="text-code-3">
                        get&#40;
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-1">
                        https://you-do-sudoku.com/api/
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-3">
                        &#41;
                    </span>
                </span>
                {/* if response.status_code == 200: */}
                <span>
                    <span className="text-code-4">
                        if&nbsp;
                    </span>
                    <span className="text-code-0">
                        response.status.code&nbsp;
                    </span>
                    <span className="text-code-3">
                        ==&nbsp;
                    </span>
                    <span className="text-code-5">
                        200
                    </span>
                    <span className="text-code-0">
                        :
                    </span>
                </span>
                {/* data = response.json() */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        data&nbsp;
                    </span>
                    <span className="text-code-3">
                        =&nbsp;
                    </span>
                    <span className="text-code-0">
                        response.
                    </span>
                    <span className="text-code-3">
                        json&#40;&#41;
                    </span>
                </span>
                {/* print(data) */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-3">
                        print&#40;
                    </span>
                    <span className="text-code-0">
                        data
                    </span>
                    <span className="text-code-3">
                        &#41;
                    </span>
                </span>
                {/* else: */}
                <span>
                    <span className="text-code-4">
                        else
                    </span>
                    <span className="text-code-0">
                        :
                    </span>
                </span>
                {/* print(f"Error: {response.status_code}") */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-3">
                        print&#40;
                    </span>
                    <span className="text-code-4">
                        f
                    </span>
                    <span className="text-code-1">
                        "Error:&nbsp;
                    </span>
                    <span className="text-code-3">
                        &#123;
                    </span>
                    <span className="text-code-0">
                        response.status_code
                    </span>
                    <span className="text-code-3">
                        &#125;
                    </span>
                    <span className="text-code-1">
                        "
                    </span>
                    <span className="text-code-3">
                        &#41;
                    </span>
                </span>
            </code>
        </>
    )
}

function JavaScriptGETExample() {
    return (
        <>
            <code className="w-full flex flex-col items-start">
                {/* fetch(https://you-do-sudoku.com/api/) */}
                <span>
                    <span className="text-code-3">
                        fetch&#40;
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-1">
                        https://you-do-sudoku.com/api/
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-3">
                        &#41;
                    </span>
                </span>
                {/* .then(response => { */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        .
                    </span>
                    <span className="text-code-3">
                        then&#40;
                    </span>
                    <span className="text-code-0">
                        response&nbsp;
                    </span>
                    <span className="text-code-3">
                        =&#62; &#123;
                    </span>
                </span>
                {/* if (!response.ok) { */}
                <span className="indent-16 sm:indent-20 lg:indent-24">
                    <span className="text-code-4">
                        if&nbsp;
                    </span>
                    <span className="text-code-3">
                        &#40;!
                    </span>
                    <span className="text-code-0">
                        response.
                    </span>
                    <span className="text-code-4">
                        ok
                    </span>
                    <span className="text-code-3">
                        &#41; &#123;
                    </span>
                </span>
                {/* throw new Error(`Error: ${response.status}`) */}
                <span className="indent-24 sm:indent-[120px] lg:indent-36">
                    <span className="text-code-4">
                        throw new&nbsp;
                    </span>
                    <span className="text-code-3">
                        Error&#40;
                    </span>
                    <span className="text-code-0">
                        &#96;
                    </span>
                    <span className="text-code-1">
                        Error:&nbsp;
                    </span>
                    <span className="text-code-3">
                        $&#123;
                    </span>
                    <span className="text-code-0">
                        response.
                    </span>
                    <span className="text-code-4">
                        status
                    </span>
                    <span className="text-code-3">
                        &#125;
                    </span>
                    <span className="text-code-0">
                        &#96;
                    </span>
                    <span className="text-code-3">
                        &#41;
                    </span>
                </span>
                {/* } */}
                <span className="indent-16 sm:indent-20 lg:indent-24">
                    <span className="text-code-3">
                        &#125;
                    </span>
                </span>
                {/* return response.json() */}
                <span className="indent-16 sm:indent-20 lg:indent-24">
                    <span className="text-code-4">
                        return&nbsp;
                    </span>
                    <span className="text-code-0">
                        response.
                    </span>
                    <span className="text-code-3">
                        json&#40;&#41;
                    </span>
                </span>
                {/* }) */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-3">
                        &#125;&#41;
                    </span>
                </span>
                {/* .then(data => { */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        .
                    </span>
                    <span className="text-code-3">
                        then&#40;
                    </span>
                    <span className="text-code-0">
                        data&nbsp;
                    </span>
                    <span className="text-code-3">
                        =&#62; &#123;
                    </span>
                </span>
                {/* console.log(data) */}
                <span className="indent-16 sm:indent-20 lg:indent-24">
                    <span className="text-code-0">
                        console.
                    </span>
                    <span className="text-code-3">
                        log&#40;
                    </span>
                    <span className="text-code-0">
                        data
                    </span>
                    <span className="text-code-3">
                        &#41;
                    </span>
                </span>
                {/* }) */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-3">
                        &#125;&#41;
                    </span>
                </span>
                {/* .catch(error => { */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        .
                    </span>
                    <span className="text-code-3">
                        catch&#40;
                    </span>
                    <span className="text-code-0">
                        error&nbsp;
                    </span>
                    <span className="text-code-3">
                        =&#62; &#123;
                    </span>
                </span>
                {/* console.log(data) */}
                <span className="indent-16 sm:indent-20 lg:indent-24">
                    <span className="text-code-0">
                        console.
                    </span>
                    <span className="text-code-3">
                        error&#40;
                    </span>
                    <span className="text-code-0">
                        error
                    </span>
                    <span className="text-code-3">
                        &#41;
                    </span>
                </span>
                {/* }) */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-3">
                        &#125;&#41;
                    </span>
                </span>
            </code>
        </>
    )
}

function PythonPOSTExample() {
    return (
        <>
            <code className="w-full flex flex-col items-start">
                {/* body = { */}
                <span>
                    <span className="text-code-0">
                        body&nbsp;
                    </span>
                    <span className="text-code-3">
                        = &#123;
                    </span>
                </span>
                {/* "difficulty": "easy" */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-1">
                        difficulty
                    </span>
                    <span className="text-code-0">
                        ": "
                    </span>
                    <span className="text-code-1">
                        easy
                    </span>
                    <span className="text-code-0">
                        ",&nbsp;
                    </span>
                    <span className="text-code-6">
                        # "easy", "medium", or "hard" (defaults to "easy")
                    </span>
                </span>
                {/* "solution": True */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-1">
                        solution
                    </span>
                    <span className="text-code-0">
                        ":&nbsp;
                    </span>
                    <span className="text-code-4">
                        True
                    </span>
                    <span className="text-code-0">
                        ,&nbsp;
                    </span>
                    <span className="text-code-6">
                        # true or false (defaults to True)
                    </span>
                </span>
                {/* "array": False */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-1">
                        array
                    </span>
                    <span className="text-code-0">
                        ":&nbsp;
                    </span>
                    <span className="text-code-4">
                        False
                    </span>
                    <span className="text-code-0">
                        ,&nbsp;
                    </span>
                    <span className="text-code-6">
                        # true or false (defaults to False)
                    </span>
                </span>
                {/* } */}
                <span>
                    <span className="text-code-3">
                        &#125;
                    </span>
                </span>
                {/* headers = {"Content-Type": "application/json"} */}
                <span className="mb-3.5 sm:mb-4 lg:mb-[18px]">
                    <span className="text-code-0">
                        headers&nbsp;
                    </span>
                    <span className="text-code-3">
                        = &#123;
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-1">
                        Content-Type
                    </span>
                    <span className="text-code-0">
                        ": "
                    </span>
                    <span className="text-code-1">
                        application/json
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-3">
                        &#125;
                    </span>
                </span>
                {/* response = requests.post("https://you-do-sudoku.com/api/", json=body, headers=headers) */}
                <span>
                    <span className="text-code-0">
                        response&nbsp;
                    </span>
                    <span className="text-code-3">
                        =&nbsp;
                    </span>
                    <span className="text-code-0">
                        requests.
                    </span>
                    <span className="text-code-3">
                        post&#40;
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-1">
                        https://you-do-sudoku.com/api/
                    </span>
                    <span className="text-code-0">
                        ", json
                    </span>
                    <span className="text-code-3">
                        =
                    </span>
                    <span className="text-code-0">
                        body, headers
                    </span>
                    <span className="text-code-3">
                        =
                    </span>
                    <span className="text-code-0">
                        headers
                    </span>
                    <span className="text-code-3">
                        &#41;
                    </span>
                </span>
            </code>
        </>
    )
}

function JavaScriptPOSTExample() {
    return (
        <>
            <code className="w-full flex flex-col items-start">
                {/* fetch(https://you-do-sudoku.com/api/) */}
                <span>
                    <span className="text-code-3">
                        fetch&#40;
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-1">
                        https://you-do-sudoku.com/api/
                    </span>
                    <span className="text-code-0">
                        ",&nbsp;
                    </span>
                    <span className="text-code-3">
                        &#123;
                    </span>
                </span>
                {/* method: "POST", */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        method: "
                    </span>
                    <span className="text-code-1">
                        POST
                    </span>
                    <span className="text-code-0">
                        ",
                    </span>
                </span>
                {/* headers: {"Content-Type": "application/json"}, */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        headers:&nbsp;
                    </span>
                    <span className="text-code-3">
                        &#123;
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-1">
                        Content-Type
                    </span>
                    <span className="text-code-0">
                        ": "
                    </span>
                    <span className="text-code-1">
                        application/json
                    </span>
                    <span className="text-code-0">
                        "
                    </span>
                    <span className="text-code-3">
                        &#125;
                    </span>
                    <span className="text-code-0">
                        ,
                    </span>
                </span>
                {/* body: JSON.stringify({ */}
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-0">
                        body: JSON.
                    </span>
                    <span className="text-code-3">
                        stringify&#40;&#123;
                    </span>
                </span>
                {/* difficulty: "easy", */}
                <span className="indent-16 sm:indent-20 lg:indent-24">
                    <span className="text-code-0">
                        difficulty: "
                    </span>
                    <span className="text-code-1">
                        easy
                    </span>
                    <span className="text-code-0">
                        ",&nbsp;
                    </span>
                    <span className="text-code-6">
                        // "easy", "medium", or "hard" (defaults to "easy")
                    </span>
                </span>
                {/* solution: true */}
                <span className="indent-16 sm:indent-20 lg:indent-24">
                    <span className="text-code-0">
                        solution:&nbsp;
                    </span>
                    <span className="text-code-4">
                        true
                    </span>
                    <span className="text-code-0">
                        ,&nbsp;
                    </span>
                    <span className="text-code-6">
                        // true or false (defaults to true)
                    </span>
                </span>
                {/* array: false */}
                <span className="indent-16 sm:indent-20 lg:indent-24">
                    <span className="text-code-0">
                        array:&nbsp;
                    </span>
                    <span className="text-code-4">
                        false
                    </span>
                    <span className="text-code-0">
                        ,&nbsp;
                    </span>
                    <span className="text-code-6">
                        // true or false (defaults to false)
                    </span>
                </span>
                <span className="indent-8 sm:indent-10 lg:indent-12">
                    <span className="text-code-3">
                        &#125;&#41;
                    </span>
                </span>
                <span>
                    <span className="text-code-3">
                        &#125;&#41;
                    </span>
                </span>
            </code>
        </>
    )
}

export default function Examples() {
    const dispatch = useAppDispatch()

    const [language, setLanguage] = useState<string>("python")

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="md:max-w-3xl lg:max-w-6xl mb-3 sm:mb-5 lg:mb-6 px-6 flex flex-col lg:flex-row justify-center">
                    <div className="text-primary mb-1.5 sm:mb-2.5 text-4xl sm:text-5xl lg:text-6xl font-poppins font-semibold">
                        Examples
                    </div>
                    <div className="text-secondary lg:ml-8 text-sm sm:text-base lg:text-lg font-inter">
                        Generate a random difficulty puzzle and solution or specifiy how you&#39;d like to receive your output.
                    </div>
                </div>
                {/* get request */}
                <div className="w-full my-4 flex flex-col items-center">
                    {/* python or javascript */}
                    <div className="bg-header-bg border-board border-[1px] border-b-0 rounded-t-2xl w-72 xs:w-5/6 max-w-lg md:max-w-xl lg:max-w-5xl h-10 px-3.5 flex items-center">
                        <button className={`${language === "python" ? "text-examples-accent underline underline-offset-4" : "text-secondary"} font-sans text-sm ${language !== "python" && "hover:text-primary duration-300"}`} onClick={() => setLanguage("python")}>
                            Python
                        </button>
                        <button className={`${language === "javascript" ? "text-examples-accent underline underline-offset-4" : "text-secondary"} ml-3 font-sans text-sm ${language !== "javascript" && "hover:text-primary duration-300"}`} onClick={() => setLanguage("javascript")}>
                            JavaScript
                        </button>
                    </div>
                    {/* get https://you-do-sudoku.com/api/ */}
                    <div className="bg-quickstart-route-bg border-board border-[1px] w-72 xs:w-5/6 max-w-lg md:max-w-xl lg:max-w-5xl px-3.5 flex items-center">
                        <div className="text-examples-accent font-mono text-xs leading-6">
                            GET
                        </div>
                        <div className="text-secondary mx-3">
                            &#183;
                        </div>
                        <div className="text-secondary text-xs">
                            https://you-do-sudoku.com/api/
                        </div>
                    </div>
                    {/* code snippet */}
                    <CopyToClipboard text={language === "python" ? pythonGETText : javascriptGETText}>
                        <button className="w-full flex justify-center" onClick={() => dispatch(updateCopied(true))}>
                            <div className="text-secondary bg-quickstart-route-bg border-board border-[1px] border-t-0 rounded-b-2xl w-72 xs:w-5/6 max-w-lg md:max-w-xl lg:max-w-5xl px-3.5 py-2.5 text-sm sm:text-base lg:text-lg flex flex-col items-start overflow-auto whitespace-nowrap">
                                {/* <PythonGETExample /> */}
                                {language === "python" ? <PythonGETExample /> : <JavaScriptGETExample />}
                            </div>
                        </button>
                    </CopyToClipboard>
                </div>
                {/* post request */}
                <div className="w-full my-4 flex flex-col items-center">
                    {/* python or javascript */}
                    <div className="bg-header-bg border-board border-[1px] border-b-0 rounded-t-2xl w-72 xs:w-5/6 max-w-lg md:max-w-xl lg:max-w-5xl h-10 px-3.5 flex items-center">
                        <button className={`${language === "python" ? "text-examples-accent underline underline-offset-4" : "text-secondary"} font-sans text-sm ${language !== "python" && "hover:text-primary duration-300"}`} onClick={() => setLanguage("python")}>
                            Python
                        </button>
                        <button className={`${language === "javascript" ? "text-examples-accent underline underline-offset-4" : "text-secondary"} ml-3 font-sans text-sm ${language !== "javascript" && "hover:text-primary duration-300"}`} onClick={() => setLanguage("javascript")}>
                            JavaScript
                        </button>
                    </div>
                    {/* post https://you-do-sudoku.com/api/ */}
                    <div className="bg-quickstart-route-bg border-board border-[1px] w-72 xs:w-5/6 max-w-lg md:max-w-xl lg:max-w-5xl px-3.5 flex items-center">
                        <div className="text-examples-accent font-mono text-xs leading-6">
                            POST
                        </div>
                        <div className="text-secondary mx-3">
                            &#183;
                        </div>
                        <div className="text-secondary text-xs">
                            https://you-do-sudoku.com/api/
                        </div>
                    </div>
                    {/* code snippet */}
                    <CopyToClipboard text={language === "python" ? pythonPOSTText : javascriptPOSTText}>
                        <button className="w-full flex justify-center" onClick={() => dispatch(updateCopied(true))}>
                            <div className="text-secondary bg-quickstart-route-bg border-board border-[1px] border-t-0 rounded-b-2xl w-72 xs:w-5/6 max-w-lg md:max-w-xl lg:max-w-5xl px-3.5 py-2.5 text-sm sm:text-base lg:text-lg flex flex-col items-start overflow-auto whitespace-nowrap">
                                {/* <PythonGETExample /> */}
                                {language === "python" ? <PythonPOSTExample /> : <JavaScriptPOSTExample />}
                            </div>
                        </button>
                    </CopyToClipboard>
                </div>
            </div>
        </>
    )
}