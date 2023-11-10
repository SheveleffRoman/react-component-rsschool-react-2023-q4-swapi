import { describe, it, expect } from 'vitest';
import DataService from '../src/API/DataService';

describe('DataService', () => {
  it('gets all planets', async () => {
    const search = 'tatooine';
    const result = await DataService.getAll(search);
    expect(result.status).toBe(200);
  }, 20000);

  it('gets a planet by id', async () => {
    const id = '1';
    const result = await DataService.getById(id);
    expect(result.status).toBe(200);
  }, 20000);

  it('gets a planet by page url', async () => {
    const url = 'https://swapi.dev/api/planets/?page=2';
    const result = await DataService.getByPage(url);
    expect(result.status).toBe(200);
  }, 20000);

  it('gets residents by url', async () => {
    const url = 'https://swapi.dev/api/people/1/';
    const result = await DataService.getResidentsByUrl(url);
    expect(result.status).toBe(200);
  }, 20000);
});
