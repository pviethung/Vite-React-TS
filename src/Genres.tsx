import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
interface Genre {
  id: string;
  name: string;
}

const Genres = ({
  onGenreSelect,
}: {
  onGenreSelect: (genreId: number) => void;
}) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  const handleGenreSelect = (id: number) => {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      onGenreSelect(id);
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const rs = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        const data = await rs.json();
        setGenres(data.genres);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  return (
    <div className="btns">
      {genres.length > 0 && (
        <button onClick={handleGenreSelect(0)} key="0">
          All
        </button>
      )}
      {genres.length > 0 &&
        genres.map((genre) => (
          <button
            onClick={handleGenreSelect(parseInt(genre.id))}
            key={genre.id}
          >
            {genre.name}
          </button>
        ))}
    </div>
  );
};

export default Genres;
