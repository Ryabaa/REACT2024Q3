import { Component } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/App.css";

interface AppState {
  results: Result[];
  loading: boolean;
  error: boolean;
  query: string;
  page: number;
  totalCount: number;
}

interface Result {
  name: string;
  url: string;
}

class App extends Component<AppState> {
  state: AppState = {
    results: [],
    loading: false,
    error: false,
    query: localStorage.getItem("pokemonQuery") || "",
    page: 1,
    totalCount: 0,
  };

  componentDidMount() {
    this.fetchTotalCount();
    this.fetchResults(this.state.query, this.state.page);
  }

  fetchTotalCount = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
      const data = await response.json();
      this.setState({ totalCount: data.count });
    } catch (error) {
      console.error(error);
      this.setState({ error: true });
    }
  };

  fetchResults = async (query: string, page: number) => {
    this.setState({ loading: true, error: false });

    try {
      if (query) {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100000",
        );
        const data = await response.json();
        const pokemonIndex = data.results.findIndex(
          (p: Result) => p.name === query.toLowerCase(),
        );

        if (pokemonIndex !== -1) {
          const pageIndex = Math.floor(pokemonIndex / 10) + 1;
          this.setState({ page: pageIndex }, () => {
            this.fetchPageResults(pageIndex);
          });
        } else {
          this.setState({ results: [], loading: false });
        }
      } else {
        this.fetchPageResults(page);
      }
    } catch (error) {
      console.error(error);
      this.setState({ error: true, loading: false });
    }
  };

  fetchPageResults = async (page: number) => {
    try {
      const offset = (page - 1) * 10;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`,
      );
      const data = await response.json();
      this.setState({ results: data.results, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ error: true, loading: false });
    }
  };

  handleSearch = (query: string) => {
    localStorage.setItem("pokemonQuery", query);
    this.setState({ query, page: 1 }, () => {
      this.fetchResults(query, 1);
    });
  };

  handlePageChange = (newPage: number) => {
    this.setState({ page: newPage }, () => {
      this.fetchResults(this.state.query, newPage);
    });
    this.setState({ query: "" });
  };

  render() {
    const { results, loading, error, query, page, totalCount } = this.state;
    const totalPages = Math.ceil(totalCount / 10);

    return (
      <ErrorBoundary>
        <div className="app">
          <div className="search-section">
            <Search onSearch={this.handleSearch} initialQuery={query} />
          </div>
          <div className="results-section">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error fetching data.</p>
            ) : results.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <Results results={results} />
            )}
            <div className="pagination">
              <button
                onClick={() => this.handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                {"<"}
              </button>
              <button
                onClick={() => this.handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
