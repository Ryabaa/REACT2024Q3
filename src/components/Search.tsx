import { Component, ChangeEvent, FormEvent } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

interface SearchState {
  query: string;
}

class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    query: this.props.initialQuery,
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleInputChange}
          placeholder="Search for a Pokémon"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;
