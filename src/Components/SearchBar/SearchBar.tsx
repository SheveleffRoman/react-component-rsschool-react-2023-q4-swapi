import ErrorButton from '../Error/ErrorButton';
import { useAppContext } from '../../context/appContext.ts';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useAppContext();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    localStorage.setItem('searchTerm', value);
  };

  return (
    <>
      <div className="search-panel">
        <form className="search-form">
          <input
            type="search"
            placeholder="Search"
            name="search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button>Search planets</button>
        </form>
        <ErrorButton />
      </div>
    </>
  );
};

export default SearchBar;
