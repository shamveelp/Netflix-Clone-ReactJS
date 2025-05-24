import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { addToFavorites } from '../../firebase';
import Navbar from '../../components/Navbar/Navbar';
import { toast } from 'react-toastify';
import './MovieDetails.css';

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MovieDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmFlMWVkZjBkMGJjZTU2MWVmMzQxZThmZTIwYjk4YiIsIm5iZiI6MTc0NzA1NzUwMi45ODEsInN1YiI6IjY4MjFmYjVlMmVhNGMxNDk3YjczOTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Sj_679UbvibPxTslFJzPYaTMMc77-ZwqQ0OWa5lrAI',
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        const data = await response.json();
        setMovie(data);
        console.log('Movie Details:', data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        toast.error('Failed to load movie details');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  

  const handleAddToFavorites = () => {
    if (!currentUser) {
      toast.error('Please log in to add to favorites');
      return;
    }
    addToFavorites(currentUser.uid, {
      id: movie.id.toString(),
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    });
  };

  if (loading) {
    return <div className="movie-details-spinner">Loading...</div>;
  }

  if (!movie) {
    return <div className="movie-details-error">Movie not found</div>;
  }

  return (
    <div className="movie-details">
      <Navbar />
      <div className="movie-details-container">
        <div className="movie-details-content">
          <h1>{movie.title}</h1>
          <div className="movie-details-meta">
            <span>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
            <span>•</span>
            <span>{movie.genres ? movie.genres.map(g => g.name).join(', ') : genreMap[movie.genre_ids?.[0]] || 'N/A'}</span>
            <span>•</span>
            <span>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'}</span>
          </div>
          <p className="movie-details-overview">{movie.overview}</p>
          <div className="movie-details-buttons">
            <Link to={`/player/${movie.id}`} className="play-btn">
              ▶ Play
            </Link>
            <button onClick={handleAddToFavorites} className="add-favorite-btn">
              + Add to Favorites
            </button>
          </div>
        </div>
        <div className="movie-details-poster">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;