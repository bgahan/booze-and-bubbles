export const searchGoogleBooks = (query) => {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
  };