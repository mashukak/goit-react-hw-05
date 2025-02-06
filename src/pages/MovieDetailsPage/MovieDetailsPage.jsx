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
    fetchMovieDetails(movieId)
      .then((data) => {
        console.log('Movie data:', data); 
        setMovie(data);
      })
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;


  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';
  const posterUrl = movie.poster_path
    ? `${BASE_IMG_URL}${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'; 

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.backButton}>Go Back</Link>
      
      <div className={styles.movieDetails}>
    <img src={posterUrl} alt={movie.title} className={styles.poster} />
        
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average}</p>
        </div>
      </div>

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
