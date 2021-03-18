import { useContext } from "react";

import { MovieCard } from './MovieCard';

import { Context } from '../context';

import '../styles/content.scss';

export function Content() {
  const { selectedGenre, movies } = useContext(Context)
  
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie, key) => (
            <MovieCard
              key={key}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}