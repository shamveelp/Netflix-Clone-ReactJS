import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar/Navbar';
import './Favorites.css';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const favoritesRef = collection(db, 'users', currentUser.uid, 'favorites');
        const snapshot = await getDocs(favoritesRef);
        const favoritesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(favoritesData);
        console.log('Favorites fetched:', favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        toast.error('Failed to load favorites');
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [currentUser]);

  const removeFavorite = async (movieId) => {
    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'favorites', movieId));
      setFavorites(favorites.filter(movie => movie.id !== movieId));
      toast.success('Removed from favorites');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove favorite');
    }
  };

  if (loading) {
    return <div className="favorites-spinner">Loading...</div>;
  }

  return (
    <div className="favorites">
      <Navbar />
      <div className="favorites-content">
        <h1>Your Favorites</h1>
        {favorites.length === 0 ? (
          <p className="no-favorites">No favorites added yet.</p>
        ) : (
          <div className="favorites-grid">
            
            {favorites.map(movie => (
              <Link to={`/movies/${movie.id}`} key={movie.id} className="favorite-link">
            
              <div key={movie.id} className="favorite-card">
                <img src={movie.poster} alt={movie.title} className="favorite-poster" />
                <div className="favorite-info">
                  <h3>{movie.title}</h3>
                  <button onClick={() => removeFavorite(movie.id)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;