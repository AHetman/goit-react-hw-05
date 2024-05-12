import { NavLink, useLocation } from "react-router-dom";
import css from "./MoviesList.module.css";
import stockImage from "../../../public/stockimage.jpg"; // Путь к дефолтной картинке

const MoviesList = ({ trendList }) => {
  const location = useLocation();

  return (
    <ul className={css.MoviesList}>
      {trendList.map((movie) => {
        return (
          <li className={css.MoviesListItem} key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} state={location}>
              <div className={css.movieItemContainer}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : stockImage
                  }
                  alt="poster"
                />
                <h2 className={css.movieTitle}> {movie.title}</h2>
              </div>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default MoviesList;
