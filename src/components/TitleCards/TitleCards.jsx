import React, {useRef, useEffect, useState} from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'



const TitleCards = ({title, category}) => {

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
  37: "Western"
};


  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmFlMWVkZjBkMGJjZTU2MWVmMzQxZThmZTIwYjk4YiIsIm5iZiI6MTc0NzA1NzUwMi45ODEsInN1YiI6IjY4MjFmYjVlMmVhNGMxNDk3YjczOTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Sj_679UbvibPxTslFJzPYaTMMc77-ZwqQ0OWa5lrAI'
    }
  };

  

  // Function to handle the scroll event
  const handleWheel = (event) => {
    event.preventDefault(); // Prevent the default scroll behavior - Vertically scrolling avoid
    cardsRef.current.scrollLeft += event.deltaY; // Scroll horizontally
  }

  useEffect(() => {

    // Fetch data from the API
    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  },[])

  return (
  <div className="title-cards">
    <h2>{title}</h2>
    <div className="card-list" ref={cardsRef}>
      {apiData.map((card, index) => (
        <div className="card" key={index}>
          <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt={card.title} />
          {/* Always-visible movie title, hidden on hover */}
          <div className="card-title">
            <h3>{card.original_title}</h3>
          </div>
          {/* Hover overlay with title, year, genre, and buttons */}
          <div className="card-overlay">
            <h3>{card.original_title}</h3>
            <p>{card.release_date.split("-")[0]} • {genreMap[card.genre_ids[0]]}</p>
            <div className="card-buttons">
              <button className="play-btn">▶ Play</button>
              <button className="details-btn">ℹ Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default TitleCards
