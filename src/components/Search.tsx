import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
  initialQuery: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialQuery }) => {
  const [query, setQuery] = useState<string>(initialQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a Pokémon"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
