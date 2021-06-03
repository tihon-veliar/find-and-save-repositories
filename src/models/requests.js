import axios from 'axios';

export const getRepositoryByName = (searchString, page = 1) =>
  axios.get(
    `https://api.github.com/search/repositories?q=${searchString}&per_page={30}&page=${page}`,
  );
