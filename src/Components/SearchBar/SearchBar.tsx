import ErrorButton from '../Error/ErrorButton';
import { useAppContext } from '../../context/appContext.ts';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useAppContext();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    localStorage.setItem('searchTerm', value);
  };

  const handleClick = () => {
    localStorage.setItem('searchTerm', searchTerm);
  };

  return (
    <>
      <div className="search-panel">
        <form className="search-form">
          <input
            role="search"
            type="search"
            placeholder="Search"
            name="search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onClick={handleClick}
          />
          <button>Search planets</button>
        </form>
        <ErrorButton />
      </div>
    </>
  );
};

export default SearchBar;
