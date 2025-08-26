import React from 'react';

const SimilarMovies = ({ movies, onMovieSelect }) => {
  // If there are no similar movies, show a message
  if (!movies || movies.length === 0) {
    return <p className="no-similar-movies">No similar movies found.</p>;
  }

  return (
    <div className="similar-movies-section">
      <h3>You Might Also Like</h3>
      <div className="similar-movies-grid">
        {/* We'll show a maximum of 6 similar movies to keep it clean */}
        {movies.slice(0, 6).map((movie) => (
          <button
            key={movie.id}
            className="similar-movie-card"
            onClick={() => onMovieSelect(movie.id)}
            title={movie.title}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : '/no-movie.png'
              }
              alt={movie.title}
            />
            <p>{movie.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
