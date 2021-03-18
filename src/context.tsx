import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from './services/api';

interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface Movie {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContextData {
  genres: Genre[];
  movies: Movie[];
  selectedGenre: Genre;
  selectedGenreId: number;
  handleGenre(id: number): void;
}

interface ProviderProps {
  children: ReactNode;
}

const Context = createContext({} as ContextData);

const Provider = ({ children }: ProviderProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const [movies, setMovies] = useState<Movie[]>([]);

  function handleGenre(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);
  
  return (
    <Context.Provider value={{
      genres,
      movies,
      selectedGenreId,
      selectedGenre,
      handleGenre
    }}>
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }