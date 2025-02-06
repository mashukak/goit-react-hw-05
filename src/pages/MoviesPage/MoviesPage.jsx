import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../services/api';
import styles from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.query.value.trim();

    if (!searchValue) return;

    setSearchParams({ query: searchValue });
    const results = await searchMovies(searchValue);
    setMovies(results);
  };

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="query" defaultValue={query} className={styles.input} />
        <button type="submit" className={styles.button}>Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
