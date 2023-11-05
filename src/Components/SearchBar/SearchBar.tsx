import { FC, useState } from 'react';
import ErrorButton from '../Error/ErrorButton';

interface Props {
  onSearch: (value: string) => void;
}

const SearchBar: FC<Props> = ({ onSearch }) => {
  const getStoredSearchTerm = (): string | null =>
    localStorage.getItem('searchTerm');

  const [storedSearch, setStoredSearch] = useState(getStoredSearchTerm() || '');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoredSearch(event.target.value);
  };

  const searchClick = () => {
    localStorage.setItem('searchTerm', storedSearch.trim());
    onSearch(storedSearch);
  };

  return (
    <>
      <div className="search-panel">
        <form className="search-form">
          <input
            type="search"
            placeholder="Search"
            name="search"
            value={storedSearch}
            onChange={handleSearchChange}
          />
          <button onClick={searchClick}>Search planets</button>
        </form>
        <ErrorButton />
      </div>
    </>
  );
};

export default SearchBar;
