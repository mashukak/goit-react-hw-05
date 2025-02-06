import { useEffect, useState, Suspense } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from || '/movies';

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.backButton}>Go Back</Link>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>

      <div className={styles.links}>
        <Link to="cast" state={{ from: backLink }}>Cast</Link>
        <Link to="reviews" state={{ from: backLink }}>Reviews</Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
