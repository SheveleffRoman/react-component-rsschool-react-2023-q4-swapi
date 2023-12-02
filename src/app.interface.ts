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
  from?: string;
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
  from?: string;
}

export interface CountriesStore {
  countries: string[];
}

export interface CollectSubmit {
  collection: IStore[];
}
