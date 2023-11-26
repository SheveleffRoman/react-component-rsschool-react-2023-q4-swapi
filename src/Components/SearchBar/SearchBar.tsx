import ErrorButton from '../Error/ErrorButton';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('searchTerm', event.target.value);
    setSearchText(event.target.value);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.push(`/?search=${searchText}`);
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
            value={searchText}
            onChange={(e) => handleInputChange(e)}
          />
          <button type="submit" onClick={(e) => handleClick(e)}>
            Search planets
          </button>
        </form>
        <ErrorButton />
      </div>
    </>
  );
};

export default SearchBar;
