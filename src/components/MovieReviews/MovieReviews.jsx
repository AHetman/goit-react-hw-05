import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/api";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    const loadMovieById = async () => {
      try {
        const movies = await fetchMovieReviews(movieId);
        const review = movies.data.results;
        setMovieReviews(review);
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
      {loading && <Loader />}
      {isError && <ErrorMessage />}

      {!loading && movieReviews.length === 0 && (
        <p>Sorry, there is no reviews for this movie</p>
      )}

      <div>
        {movieReviews.map((movieReview) => (
          <div key={movieReview.id}>
            <h2>{movieReview.author}</h2>
            <p>{movieReview.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default MovieReviews;
