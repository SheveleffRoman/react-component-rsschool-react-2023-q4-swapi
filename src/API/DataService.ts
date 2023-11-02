import axios from 'axios';

const baseURL = 'https://swapi.dev/api/planets/';

export default class DataService {
  static async getAll(search: string) {
    const response = await axios.get(baseURL, {
      params: {
        search,
      },
    });
    return response;
  }

  static async getById(id: string) {
    const response = await axios.get(baseURL + id);
    return response;
  }
}
