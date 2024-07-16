import React, { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import Search from "./components/Search";
import Results from "./components/Results";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pagination from "./components/Pagination";
import DetailSection from "./components/DetailSection";
import NotFound from "./components/NotFound";
import { Result } from "./types/types";

import "./styles/App.css";

const App: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useLocalStorage<string>("pokemonQuery", "");
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    fetchTotalCount();
    fetchResults(query, page);
  }, [query, page]);

  const fetchTotalCount = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1");
      const data = await response.json();
      setTotalCount(data.count);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const fetchResults = async (query: string, page: number) => {
    setLoading(true);
    setError(false);

    try {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`;

      if (query) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`,
        );
        const data = await response.json();
        const results = [{ name: data.name, url: data.url }];
        setResults(results);
      } else {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setResults(data.results);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <div className="search-section">
            <Search onSearch={handleSearch} initialQuery={query} />
          </div>
          <div className="results-section">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error fetching data.</p>
            ) : (
              <Routes>
                <Route path="/" element={<Results results={results} />} />
                <Route path="/detail/:name" element={<DetailSection />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(totalCount / 10)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
