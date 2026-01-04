import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { updateCopied } from "@/redux/features/copied";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Quickstart() {
  const [loading, setLoading] = useState(false);
  const [keyGenerated, setKeyGenerated] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const dispatch = useAppDispatch();

  const generateApiKey = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/create-key");
      const data = await res.json();

      setApiKey(data.key);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div id="quickstart" className="flex flex-col items-center">
        <div className="md:max-w-3xl lg:max-w-6xl mb-3 sm:mb-5 lg:mb-6 px-6 flex flex-col lg:flex-row justify-center">
          <div className="text-primary mb-1.5 sm:mb-2.5 text-4xl sm:text-5xl lg:text-6xl font-poppins font-semibold">
            Quickstart
          </div>
          <div className="text-secondary lg:ml-8 text-sm sm:text-base lg:text-lg font-inter">
            There are no external libraries or dependencies required to use the
            YouDoSudoku API. Simply generate an API key and use it to send a
            request to the API route.
          </div>
        </div>
        <div className="w-full px-4">
          <div className="max-w-lg lg:max-w-xl mx-auto">
            <CopyToClipboard text={apiKey}>
              <button
                className="w-full flex justify-center"
                onClick={() => {
                  if (!keyGenerated) {
                    generateApiKey();
                  } else {
                    dispatch(updateCopied(true));
                  }

                  setKeyGenerated(true);
                }}
              >
                {keyGenerated && !loading && (
                  <div className="bg-quickstart-route-accent rounded-l-2xl w-1.5 h-11 lg:h-12"></div>
                )}
                <div
                  className={`
                ${
                  !keyGenerated || loading
                    ? "text-secondary-btn-text bg-secondary-btn-bg border-secondary-btn-border border-[1px] rounded-lg px-3 py-1 font-inter text-sm sm:text-base lg:text-lg hover:bg-secondary-btn-bg-hover hover:border-secondary-btn-border-hover duration-300"
                    : "text-secondary bg-quickstart-route-bg rounded-r-2xl w-64 xs:w-5/6 max-w-lg sm:w-full lg:max-w-xl px-3.5 py-2.5 text-sm sm:text-base lg:text-lg flex items-center overflow-auto whitespace-nowrap"
                }
            `}
                >
                  {loading
                    ? "Loading..."
                    : keyGenerated
                    ? apiKey
                    : "Generate An API Key"}
                </div>
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="mt-1.5 xs:mt-3 sm:mt-3.5 w-full px-4">
          <div className="w-full max-w-lg lg:max-w-xl mx-auto">
            <CopyToClipboard text="https://you-do-sudoku-api.vercel.app/api">
              <button
                className="w-full flex justify-center"
                onClick={() => dispatch(updateCopied(true))}
              >
                <div className="bg-quickstart-route-accent rounded-l-2xl w-1.5 h-11 lg:h-12"></div>
                <div className="text-secondary bg-quickstart-route-bg rounded-r-2xl w-64 xs:w-5/6 sm:w-full max-w-lg lg:max-w-xl px-3.5 py-2.5 text-sm sm:text-base lg:text-lg flex items-center overflow-auto whitespace-nowrap">
                  <code>https://youdosudoku.com/api</code>
                </div>
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </>
  );
}
