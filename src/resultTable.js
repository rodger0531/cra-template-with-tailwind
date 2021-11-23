import React from "react";

export const ResultTable = ({ record, ans }) => {
  return (
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
  );
};
