import React from "react";
import classNames from "classnames";
import { useStopwatch } from "react-timer-hook";
import "./App.css";

// Show and hide answer
// timer

function generateNumber(digit, range) {
  return new Array(digit)
    .fill()
    .map(() => Math.floor(Math.random() * range))
    .join("");
}

function removeElement(str, idx) {
  return str.slice(0, idx) + str.slice(idx + 1);
}

function getResult(value, ans, digit) {
  let ansTemp = ans,
    input = value;
  let a = 0,
    b = 0;

  // Count and filter out A's
  for (let i = 0, j = 0; j < digit; j++) {
    if (ansTemp[i] === input[i]) {
      a++;
      ansTemp = removeElement(ansTemp, i);
      input = removeElement(input, i);
    } else {
      i++;
    }
  }

  // Count number of B's

  input.split("").forEach((x) => {
    const idx = ansTemp.indexOf(x);
    if (idx > -1) {
      b++;
      ansTemp = removeElement(ansTemp, idx);
    }
  });

  // Alternative way to count B:

  // input = input.split("");
  // while (input.length) {
  //   const val = input.pop();
  //   const idx = ansTemp.indexOf(val);
  //   if (idx > -1) {
  //     b++;
  //     ansTemp = ansTemp.slice(0, idx) + ansTemp.slice(idx + 1);
  //   }
  // }

  return `${a}A${b}B`;
}

export default function App() {
  const [ans, setAns] = React.useState(); // TODO
  const [value, setValue] = React.useState("");
  const [record, setRecord] = React.useState([]);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [range, setRange] = React.useState(6);
  const [digit, setDigit] = React.useState(4);
  const [errMsg, setErrMsg] = React.useState("");
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  const toggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const allowedDigits = () => {
    return new Array(range)
      .fill()
      .map((_, i) => i)
      .join(", ");
  };

  const handleOnChange = (event) => {
    // If digit larger than allowed digits
    if (
      event.target.value &&
      +event.target.value[event.target.value.length - 1] >= range
    ) {
      return;
    }

    let val = +event.target.value;
    const allowedMax = +new Array(digit).fill(9).join("");
    if (val >= 0 && val <= allowedMax) {
      setValue(event.target.value);
    } else return;
  };

  const handleSubmit = (value) => {
    if (ans === undefined || !isRunning) return alert("Please start game");
    if (value === "") {
      setErrMsg("Empty guess");
      return;
    } else if (value.length < digit) {
      setErrMsg(`Enter ${digit} digit(s)`);
      return;
    }
    if (errMsg) setErrMsg("");

    setRecord((prev) => [
      ...prev,
      { number: value, result: getResult(value, ans, digit) },
    ]);
    setValue("");
    if (ans === value)
      setTimeout(() => {
        pause();
        alert("You are correct");
      }, 0);
  };

  const initGame = () => {
    reset();
    setAns(generateNumber(digit, range));
    setRecord([]);
    start();
  };

  return (
    <div className="App h-screen">
      <div className="py-16">
        <h1 className="mb-6 text-2xl">Number-Guessing Game</h1>
        <div>
          <div className="h-16 mb-6 flex flex-row justify-center items-end">
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
          <div className="flex flex-row justify-center divide-x-2 divide-gray-500 divide-dashed">
            <div className="px-8 md:px-16 lg:px-24 flex justify-center items-center">
              Number of Attempts:{" "}
              <span className="ml-3 text-xl text-blue-500">
                {record.length}
              </span>
            </div>
            <div className="px-8 md:px-16 lg:px-24">
              Time elapsed:
              {minutes !== 0 && (
                <span className="ml-3">
                  <span className="text-xl text-blue-500">{minutes}</span>{" "}
                  minute
                  {minutes > 1 && "s"}
                </span>
              )}
              <span className="ml-2">
                <span className="text-xl text-blue-500">{seconds}</span> second
                {seconds > 1 && "s"}
              </span>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <input
          type="number"
          className="px-2 h-8 rounded"
          placeholder="Your guess"
          value={value}
          onChange={handleOnChange}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.keyCode === 13) &&
            handleSubmit(e.target.value)
          }
        />
        <button
          className="px-3 py-1 ml-3 md:ml-6 rounded bg-gray-700 transition duration-200 bg-gray-700 hover:bg-gray-600"
          onClick={() => handleSubmit(value)}
        >
          Submit
        </button>
        <div className="mt-2 text-gray-400">
          Allowed digits: {allowedDigits()}
        </div>
        <span className={classNames("text-red-500", errMsg || "invisible")}>
          {errMsg || "+"}
        </span>
        <div className="flex justify-center mt-4">
          {record.length ? (
            <table>
              <thead className="border-b-4 border-double h-10">
                <tr className="my-1">
                  <th className="w-16">No.</th>
                  <th className="w-32">Guess</th>
                  <th className="w-32">Result</th>
                </tr>
              </thead>
              <tbody>
                {record.map((i, index) => (
                  <tr key={index} className="h-8 transition hover:bg-gray-700">
                    <td>{index}</td>
                    <td>{i.number.split("").join(" ")}</td>
                    <td>{i.result.split("").join(" ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : ans ? (
            <span className="mt-20 text-2xl text-gray-500 italic">
              Try some guesses...
            </span>
          ) : (
            <span className="mt-20 text-2xl text-gray-500 italic">
              Please start game
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
