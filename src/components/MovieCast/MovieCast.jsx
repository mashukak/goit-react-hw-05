import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "0561a8b7afd658e19e151d098f2194ba";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => setCast(response.data.cast))
      .catch((error) => console.error("Error fetching cast:", error));
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
