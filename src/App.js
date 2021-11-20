import React from "react";
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
    <div className="App h-screen mt-36">
      <div className="">
        <h1 className="mb-8 text-2xl">Number-Guessing Game</h1>
        <div>
          <button
            className={`px-5 py-2 rounded text-lg ${
              ans ? "bg-gray-700" : "bg-green-500"
            }`}
            onClick={initGame}
          >
            {ans ? "Restart" : "Start"}
          </button>
          <div>
            <button
              className="mt-8 px-3 py-1 rounded bg-gray-700"
              onClick={toggleAnswer}
            >
              {showAnswer ? "Hide ans" : "Show ans"}
            </button>
          </div>
          {showAnswer && <span>Ans: {ans}</span>}
          <br></br>
          <br></br>
          <div>Number of Attempts: {record.length}</div>
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
          className="px-3 py-1 rounded bg-gray-700"
          style={{ marginLeft: 10 }}
          onClick={() => handleSubmit(value)}
        >
          Submit
        </button>
        {record.map((i, index) => (
          <div key={index} className="flex-row mt-5">
            <span>Number: {i.number}</span>
            <span> - Result: {i.result}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
