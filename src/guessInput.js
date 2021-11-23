import React from "react";
import classNames from "classnames";
import { allowedDigits } from "./utlity";

export const GuessInput = ({
  range,
  digit,
  value,
  setValue,
  handleSubmit,
  errMsg,
}) => {
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

  return (
    <>
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
        Allowed digits: {allowedDigits(range)}
      </div>
      <span className={classNames("text-red-500", errMsg || "invisible")}>
        {errMsg || "+"}
      </span>
    </>
  );
};
