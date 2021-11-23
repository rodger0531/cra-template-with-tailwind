import React from "react";
import classNames from "classnames";

export const Controls = ({ ans, initGame }) => {
  const [showAnswer, setShowAnswer] = React.useState(false);

  const toggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div className="h-16 mb-8 flex flex-row justify-center items-end">
      <button
        className={classNames(
          "w-36 h-10 py-2 mr-8 md:mr-12 rounded transition duration-200",
          ans
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-green-500 hover:bg-green-400"
        )}
        onClick={initGame}
      >
        {(ans ? "Restart" : "Start") + " game"}
      </button>
      <div>
        {showAnswer && <div className="text-gray-500">Answer: {ans}</div>}
        <button
          className="w-36 h-10 py-2 rounded transition duration-200 bg-gray-700 hover:bg-gray-600"
          onClick={toggleAnswer}
        >
          {(showAnswer ? "Hide" : "Show") + " answer"}
        </button>
      </div>
    </div>
  );
};
