import "./App.css";
import React from "react";
import { useStopwatch } from "react-timer-hook";
import Stats from "./stats";
import { ResultTable } from "./resultTable";
import { generateNumber, calcResult } from "./utlity";
import { Controls } from "./controls";
import { GuessInput } from "./guessInput";

export default function App() {
  const [ans, setAns] = React.useState();
  const [value, setValue] = React.useState("");
  const [record, setRecord] = React.useState([]);
  const [range, setRange] = React.useState(6);
  const [digit, setDigit] = React.useState(4);
  const [errMsg, setErrMsg] = React.useState("");
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

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
      { number: value, result: calcResult(value, ans, digit) },
    ]);
    setValue("");

    if (ans === value) {
      pause();
      setTimeout(() => {
        alert("You are correct");
      }, 0);
    }
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
        <Controls value={value} ans={ans} initGame={initGame} />
        <Stats minutes={minutes} seconds={seconds} record={record} />
        <br></br>
        <br></br>
        <GuessInput
          range={range}
          digit={digit}
          value={value}
          setValue={setValue}
          handleSubmit={handleSubmit}
          errMsg={errMsg}
        />
        <ResultTable record={record} ans={ans} />
      </div>
    </div>
  );
}
