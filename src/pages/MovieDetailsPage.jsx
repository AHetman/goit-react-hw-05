import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "../api/api";
import css from "../css/MovieDetailsPage.module.css";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? "/");

  useEffect(() => {
    const loadMovieById = async () => {
      try {
        setLoading(true);
        const movies = await fetchMovieDetails(movieId);
        const details = movies.data;
        setMovieDetails(details);
      } catch (error) {
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    loadMovieById();
  }, [movieId]);

  const url = `https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`;

  return (
    <div className={css.detailsContainer}>
      <Link to={backLinkHref.current}>Go back</Link>
      <div className={css.imgContainer}>
        <img src={url} alt="poster" />
      </div>
      <div className={css.sideContainer}>
        <h1 className={css.title}>{movieDetails.title}</h1>
        <p className={css.movieDetParagr}>
          genres:{" "}
          {movieDetails.genres &&
            movieDetails.genres.map((genre) => {
              return genre.name;
            })}
        </p>
        <p className={css.movieDetParagr}>overview:</p>

        <p className={css.movieDetParagrSmall}>{movieDetails.overview}</p>
        <p className={css.movieDetParagr}>
          user score: {movieDetails.vote_average}
        </p>
        <div className={css.castContainer}>
          <p className={css.movieDetParagr}>Additional information</p>

          <p>
            <Link to="cast">Cast</Link>
          </p>
          <p>
            <Link to="reviews">Reviews</Link>
          </p>
          {loading && <Loader />}
          {isError && <ErrorMessage />}
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
