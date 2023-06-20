const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY =
  'live_4PJkLDVz5iAie0NzjjgCjwuNhZO8y1l4TaeJ2szvATn2sOZkaiExWoW5P7ZEdeME';

function fetchBreeds() {
  return fetch(BASE_URL).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${SEARCH_URL}?breed_ids=${breedId}&api_key=${API_KEY}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}

export { fetchBreeds, fetchCatByBreed };
