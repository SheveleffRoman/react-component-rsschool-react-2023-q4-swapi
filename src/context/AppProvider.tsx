import { useState } from 'react';
import { Planet } from '../App';
import { useNavigate } from 'react-router-dom';
import { AppContext, AppContextData } from './appContext.ts';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [searchResults, setSearchResults] = useState<Planet[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<string>('');
  const [prevPage, setPrevPage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<string>('1');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const openDetails = () => {
    setIsDetailsOpen(true);
  };

  const closeDetails = () => {
    if (isDetailsOpen) {
      setIsDetailsOpen(false);
      navigate('/');
    }
  };

  const contextValue: AppContextData = {
    searchResults,
    setSearchResults,
    error,
    setError,
    isLoading,
    setIsLoading,
    nextPage,
    setNextPage,
    prevPage,
    setPrevPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    isDetailsOpen,
    openDetails,
    closeDetails,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
