import React from "react";
import { Result } from "../types/types";

interface ResultsProps {
  results: Result[];
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div className="results-container">
      {results.map((result) => (
        <div key={result.name}>
          <p>{result.name}</p>
          <a href={`/detail/${result.name}`}>More details</a>
        </div>
      ))}
    </div>
  );
};

export default Results;
