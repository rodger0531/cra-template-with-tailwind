import React from "react";

const Stats = ({ minutes, seconds, record }) => {
  return (
    <div className="flex flex-row justify-center">
      <div className="w-1/2 px-8 md:px-16 lg:px-24 flex justify-end items-center">
        Number of Attempts:{" "}
        <span className="ml-3 text-xl text-blue-500">{record.length}</span>
      </div>
      <div className="flex flex-row divide-x-2 divide-gray-500 divide-dashed">
        <div className="px-1"></div>
        <div className="px-1"></div>
      </div>
      <div className="w-1/2 px-8 md:px-16 lg:px-24 flex justify-start items-center">
        Time elapsed:
        {minutes !== 0 && (
          <span className="ml-3">
            <span className="text-xl text-blue-500">{minutes}</span> minute
            {minutes > 1 && "s"}
          </span>
        )}
        <span className="ml-2">
          <span className="text-xl text-blue-500">{seconds}</span> second
          {seconds > 1 && "s"}
        </span>
      </div>
    </div>
  );
};

export default Stats;
