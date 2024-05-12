import MovieList from "../components/MoviesList/MoviesList";
import { fetchTrendingMovies } from "../api/api";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [trendMovies, setTrendMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadTrendMovies = async () => {
      try {
        setLoading(true);
        const movies = await fetchTrendingMovies();
        const trendList = movies.data.results;
        setTrendMovies(trendList);
      } catch {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    loadTrendMovies();
  }, []);
  return (
    <>
      <MovieList trendList={trendMovies} />
      {loading && <Loader />}
      {isError && <ErrorMessage />}
    </>
  );
};
export default HomePage;
