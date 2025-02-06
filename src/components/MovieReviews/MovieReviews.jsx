import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; 
    setLoading(true);
    setError(null);

    fetchMovieReviews(movieId)
      .then((data) => {
        if (isMounted) {
          setReviews(data.results || []);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        if (isMounted) {
          setError('Failed to load reviews.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.item}>
          <h4>{review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
