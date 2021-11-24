import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";

export const ResultTable = ({ record, ans }) => {
  return (
    <>
      <div className="flex justify-center mt-4">
        <table>
          <thead className="border-b-4 border-double h-10">
            <tr className="my-1">
              <th className="w-16">No.</th>
              <th className="w-32">Guess</th>
              <th className="w-32">Result</th>
            </tr>
          </thead>

          <tbody>
            {record.map((i, index, arr) => (
              <tr key={index} className="h-8 transition hover:bg-gray-700">
                <td>{index}</td>
                <td>{i.number.split("").join(" ")}</td>
                <td className="relative">
                  <span className="absolute left-1/2  top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {i.result.split("").join(" ")}
                  </span>
                  {ans === i.number && (
                    <CheckCircleIcon
                      className="absolute right-0 transform
                    -translate-y-1/2 h-5 w-5 text-green-500"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {record.length === 0 ? (
        <div className="mt-12">
          {ans ? (
            <span className="text-2xl text-gray-500 italic">
              Try some guesses...
            </span>
          ) : (
            <span className="text-2xl text-gray-500 italic">
              Please start game
            </span>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
