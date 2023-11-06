import { createContext, useContext } from 'react';
import { Planet } from '../App';

export interface AppContextData {
  searchResults: Planet[];
  setSearchResults: React.Dispatch<React.SetStateAction<Planet[]>>;
  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  nextPage: string;
  setNextPage: React.Dispatch<React.SetStateAction<string>>;
  prevPage: string;
  setPrevPage: React.Dispatch<React.SetStateAction<string>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  isDetailsOpen: boolean;
  openDetails: () => void;
  closeDetails: () => void;
}

export const AppContext = createContext<AppContextData | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
