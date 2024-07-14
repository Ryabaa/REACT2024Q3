import { Component } from "react";

interface Result {
  name: string;
  url: string;
}

interface ResultsProps {
  results: Result[];
}

class Results extends Component<ResultsProps> {
  render() {
    const { results } = this.props;

    return (
      <div className="results-container">
        {results.map((result) => (
          <div key={result.name}>
            <p>{result.name}</p>
            <a href={result.url}>More details</a>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
