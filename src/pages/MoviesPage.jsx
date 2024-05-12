import toast from "react-hot-toast";
import css from "../css/MoviesPage.module.css";
import MoviesList from "../components/MoviesList/MoviesList";
import { fetchSearchMovie } from "../api/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [listSearchMovies, setListSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const searchValue = searchParams.get("value") ?? "";

  useEffect(() => {
    if (searchValue === "") return;
    const loadSearchMovie = async () => {
      setLoading(true);
      try {
        const movies = await fetchSearchMovie(searchValue);
        const listSearchMovies = movies.data.results;
        setListSearchMovies(listSearchMovies);
        if (!(listSearchMovies.length > 0)) {
          toast.error("No movies with this title were found");
        }
      } catch {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    loadSearchMovie();
  }, [searchValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const typingValue = form.elements.name.value;
    if (typingValue.trim() === "") {
      toast.error("Please enter search term!");
      return;
    }
    setSearchParams({ value: typingValue });
    form.reset();
  };

  return (
    <div className={css.MoviesPageContainer}>
      <form className={css.MoviesPageForm} onSubmit={handleSubmit}>
        <input
          className={css.MoviesPageInput}
          name="name"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit" className={css.searchBarButton}>
          Search
        </button>
      </form>
      <MoviesList trendList={listSearchMovies} />
      {loading && <Loader />}
      {isError && <ErrorMessage />}
    </div>
  );
};

export default MoviesPage;
