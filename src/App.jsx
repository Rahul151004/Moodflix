import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import Pagination from './components/Pagination';
import BackToTopButton from './components/BackToTopButton';
import MovieDetails from './components/MovieDetails';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './api/movies';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [similarMovies, setSimilarMovies] = useState([]);
  const [isSimilarLoading, setIsSimilarLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingError, setTrendingError] = useState('');
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${currentPage}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${currentPage}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      setMovieList(data.results || []);
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setIsTrendingLoading(true);
    setTrendingError('');
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      setTrendingError('Could not load trending movies.');
    } finally {
      setIsTrendingLoading(false);
    }
  };

  const handleMovieSelect = async (movieId) => {
    setIsModalLoading(true);
    setIsSimilarLoading(true);
    setSelectedMovie(null);
    setSimilarMovies([]);

    try {
      const detailsPromise = fetch(`${API_BASE_URL}/movie/${movieId}`, API_OPTIONS);
      const similarPromise = fetch(`${API_BASE_URL}/movie/${movieId}/recommendations`, API_OPTIONS);

      const [detailsResponse, similarResponse] = await Promise.all([detailsPromise, similarPromise]);

      if (!detailsResponse.ok || !similarResponse.ok) {
        throw new Error('Failed to fetch movie data.');
      }

      const movieDetails = await detailsResponse.json();
      const similarData = await similarResponse.json();

      setSelectedMovie(movieDetails);
      setSimilarMovies(similarData.results || []);

    } catch (error) {
      console.error(error);
      setErrorMessage('Could not load movie details.');
    } finally {
      setIsModalLoading(false);
      setIsSimilarLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      <div className='pattern' /> 
      <BackToTopButton />

      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie._id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}
      
        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500 text-center mt-8'>{errorMessage}</p>
          ) : (
            <>
              <ul>
                {movieList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onMovieSelect={handleMovieSelect} />
                ))}
              </ul>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
      </div>

      {selectedMovie && !isModalLoading && (
        <MovieDetails
          movie={selectedMovie}
          onClose={handleCloseModal}
          similarMovies={similarMovies}
          isSimilarLoading={isSimilarLoading}
          onMovieSelect={handleMovieSelect}
        />
      )}
    </main>
  );
};

export default App;
