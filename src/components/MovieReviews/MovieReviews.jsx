import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then((data) => setReviews(data.results));
  }, [movieId]);

  if (reviews.length === 0) return <p>No reviews available.</p>;

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
