import React from "react";
import classNames from "classnames";
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

  const toggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleSubmit = (value) => {
    if (ans === undefined) return alert("Please start game");

    setRecord((prev) => [
      ...prev,
      { number: value, result: getResult(value, ans, digit) },
    ]);
    setValue("");
    if (ans === value) setTimeout(() => alert("You are correct"), 0);
  };

  const initGame = () => {
    setAns(generateNumber(digit, range));
    setRecord([]);
  };

  return (
    <div className="App h-screen">
      <div className="py-24">
        <h1 className="mb-16 text-2xl">Number-Guessing Game</h1>
        <div>
          <button
            className={classNames(
              "px-5 py-2 rounded",
              ans ? "bg-gray-700" : "bg-green-500 text-xl"
            )}
            onClick={initGame}
          >
            {(ans ? "Restart" : "Start") + " game"}
          </button>
          <div>
            <button
              className="mt-8 px-3 py-1 rounded bg-gray-700"
              onClick={toggleAnswer}
            >
              {(showAnswer ? "Hide" : "Show") + " answer"}
            </button>
          </div>
          {showAnswer && <span>Ans: {ans}</span>}
          <br></br>
          <br></br>
          <div className="flex justify-center items-center">
            Number of Attempts:{" "}
            <span className="mx-3 text-2xl text-blue-500">{record.length}</span>
          </div>
        </div>
        <br></br>
        <label>Your guess: </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.keyCode === 13) &&
            handleSubmit(e.target.value)
          }
        />
        <button
          className="px-3 py-1 ml-3 rounded bg-gray-700"
          onClick={() => handleSubmit(value)}
        >
          Submit
        </button>
        <div className="flex justify-center mt-10">
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
        </div>
      </div>
    </div>
  );
}
