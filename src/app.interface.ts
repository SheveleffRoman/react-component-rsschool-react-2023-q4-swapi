export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  image: FileList;
  country: string;
}

export interface IStore {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  image: string;
  country: string;
}

export interface CountriesStore {
  countries: string[];
}
