import React from "react";
import "./App.css";

function generateNumber(digit, range) {
  return new Array(digit)
    .fill()
    .map(() => Math.floor(Math.random() * range))
    .join("");
}

function removeElement(str, idx) {
  console.log(str);
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
  const [range, setRange] = React.useState(6);
  const [digit, setDigit] = React.useState(4);

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
    <div className="App">
      <h1>Number-Guessing Game</h1>
      <span>Ans: {ans}</span>
      <div>
        <button onClick={initGame} style={{ marginRight: 10 }}>
          Start
        </button>
        <button onClick={() => alert(ans)}>Show ans</button>
        <br></br>
        <br></br>
        <div>Number of Attempts: {record.length}</div>
      </div>
      <br></br>
      <label>Your guessing: </label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.keyCode === 13) &&
          handleSubmit(e.target.value)
        }
      />
      <button style={{ marginLeft: 10 }} onClick={() => handleSubmit(value)}>
        Submit
      </button>
      {record.map((i, index) => (
        <div key={index} style={{ flexDirection: "row", marginTop: 20 }}>
          <span>Number: {i.number}</span>
          <span> - Result: {i.result}</span>
        </div>
      ))}
    </div>
  );
}
