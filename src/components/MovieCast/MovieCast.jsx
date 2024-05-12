import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/api";
import css from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const loadMovieById = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovieCast(movieId);
        const cast = movies.data.cast;
        setMovieCast(cast);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    loadMovieById();
  }, [movieId]);

  return (
    <>
      <ul className={css.castList}>
        {movieCast.map((cast) => {
          return (
            <li key={cast.id}>
              <div className={css.castItemContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${cast.profile_path}`}
                  alt="poster"
                />
                <p>Name: {cast.name}</p>
                <p>Character: {cast.character}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {loading && <Loader />}
      {isError && <ErrorMessage />}
    </>
  );
};
export default MovieCast;
