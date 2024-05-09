// src/articles-api.js
import axios from "axios";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

const fetchArticlesWithTopic = async (topic) => {
  const response = axios.get(`/search?query=${topic}`);
  return response;
};

export default fetchArticlesWithTopic;
