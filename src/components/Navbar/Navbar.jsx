// src/components/Navbar.js
import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();
  const { currentUser, loading } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  console.log('Navbar - Loading:', loading, 'CurrentUser:', currentUser);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmFlMWVkZjBkMGJjZTU2MWVmMzQxZThmZTIwYjk4YiIsIm5iZiI6MTc0NzA1NzUwMi45ODEsInN1YiI6IjY4MjFmYjVlMmVhNGMxNDk3YjczOTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Sj_679UbvibPxTslFJzPYaTMMc77-ZwqQ0OWa5lrAI',
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setSearchResults(data.results.slice(0, 5)); // Limit to 5 results
        console.log('Search Results:', data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    const debounce = setTimeout(fetchSearchResults, 300); // Debounce for 300ms
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Netflix Logo" />
        </Link>
        <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
        <label htmlFor="navbar-toggle" className="navbar-hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <ul>
          <li>
            <Link className="links" to="/">Home</Link>
          </li>
          <li>
            <Link className="links" to="/movies">TV Shows</Link>
          </li>
          <li>New & Popular</li>
          <li>
            <Link className="links" to="/favorites">My List</Link>
          </li>
          <li><Link className="links" to={'/about-us'}>About Us</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search-container">
          <img
            src={search_icon}
            alt="Search"
            className="icons search-icon"
            onClick={toggleSearch}
          />
          {searchOpen && (
            <div className="search-input-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="search-input"
                autoFocus
              />
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movies/${movie.id}`}
                      className="search-result-item"
                      onClick={toggleSearch} // Close search after clicking
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                            : 'https://via.placeholder.com/92x138'
                        }
                        alt={movie.title}
                        className="search-result-poster"
                      />
                      <div className="search-result-info">
                        <h4>{movie.title}</h4>
                        <p>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <p>{loading ? 'Loading...' : currentUser?.name || 'Guest'}</p>
        <img src={bell_icon} alt="" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <ul>
              <li>Manage Profiles</li>
              <li>
                <Link className='links' to="/favorites">Favorites</Link>
              </li>
              <li onClick={() => logout()}>Sign Out</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;