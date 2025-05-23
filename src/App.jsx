// src/App.js
import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Player from './pages/Player/Player';
import Favorites from './pages/Favorites/Favorites';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import AboutUs from './pages/AboutUs/AboutUs';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        console.log('App - User is signed in:', currentUser);
        navigate('/');
      } else {
        console.log('App - No user is signed in');
        navigate('/login');
      }
    }
  }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </div>
  );
};

export default App;