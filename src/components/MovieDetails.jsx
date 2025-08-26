import React from 'react';
import SimilarMovies from './SimilarMovies';
import Spinner from './Spinner';

const MovieDetails = ({
  movie,
  onClose,
  similarMovies,
  isSimilarLoading,
  onMovieSelect,
}) => {
  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : '/hero.png';
  
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-movie.png';

  return (
    <div id="modal-overlay" className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <img src={backdropUrl} alt={movie.title} className="backdrop-img" />
          <div className="header-overlay"></div>
        </div>
        <div className="modal-body">
          <img src={posterUrl} alt={movie.title} className="modal-poster" />
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <p className="tagline">{movie.tagline}</p>
            <div className="stats">
              <div className="stat-item">
                <img src="/star.svg" alt="Rating" />
                <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
              </div>
              <div className="stat-item">
                <span>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
              </div>
              <div className="stat-item">
                <span>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
              </div>
            </div>
            <div className="genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
            <h3>Overview</h3>
            <p className="overview">{movie.overview || 'No overview available.'}</p>
          </div>
        </div>

        <div className="modal-footer">
          {isSimilarLoading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : (
            <SimilarMovies movies={similarMovies} onMovieSelect={onMovieSelect} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
