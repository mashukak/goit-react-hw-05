import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <Link to="/" className={styles.link}>Go to Home Page</Link>
    </div>
  );
}
