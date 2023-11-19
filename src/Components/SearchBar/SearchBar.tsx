import ErrorButton from '../Error/ErrorButton';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { searchSlice } from '../../store/reducers/SearchSlice';
import { useEffect, useState } from 'react';

const SearchBar = () => {
  const { searchValue } = useAppSelector((state) => state.searchReducer);
  const { changeValue } = searchSlice.actions;
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setSearchText(searchValue!);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('searchTerm', event.target.value);
    setSearchText(event.target.value);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(changeValue(searchText));
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
