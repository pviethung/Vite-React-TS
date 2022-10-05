import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
interface MovieProps {
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  title: string;
}

const MovieList = ({ genreId }: { genreId: number }) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  let filteredMovies = movies;
  useEffect(() => {
    (async () => {
      try {
        const rs = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const movies = await rs.json();
        setMovies(movies.results);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  if (genreId !== 0)
    filteredMovies = movies.filter((m) => m.genre_ids.includes(genreId));
  return (
    <AnimatePresence>
      <div className="grid">
        {filteredMovies.map((movie) => (
          <motion.div
            key={movie.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt=""
            />
            <h3>{movie.title}</h3>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};
export default MovieList;
