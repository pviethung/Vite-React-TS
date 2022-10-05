import { useState } from 'react';
import Genres from './Genres';
import MovieList from './MovieList';

function App() {
  const [genre, setGenre] = useState(0);
  const handleGenreSelect = (genreId: number) => {
    setGenre(genreId);
  };

  return (
    <div className="app">
      <Genres onGenreSelect={handleGenreSelect} />
      <MovieList genreId={genre} />
    </div>
  );
}

export default App;
