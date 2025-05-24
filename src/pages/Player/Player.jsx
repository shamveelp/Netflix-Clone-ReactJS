import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'


const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });



  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmFlMWVkZjBkMGJjZTU2MWVmMzQxZThmZTIwYjk4YiIsIm5iZiI6MTc0NzA1NzUwMi45ODEsInN1YiI6IjY4MjFmYjVlMmVhNGMxNDk3YjczOTJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._Sj_679UbvibPxTslFJzPYaTMMc77-ZwqQ0OWa5lrAI'
  }
};

//   useEffect(() => {
//   fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
//     .then(res => res.json())
//     .then(res => {
//       const trailer = res.results.find(video => video.type === "Trailer");
//       if (trailer) {
//         setApiData(trailer);
//       } else {
//         console.warn("Trailer not found.");
//       }
//     })
//     .catch(err => console.error(err));
// }, [id]);

useEffect(() => {
  if (!id) return;

  const fetchVideos = async () => {
    try {
      // Try fetching movie videos first
      let res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
      let data = await res.json();
      let trailer = data.results?.find(video => video.type === "Trailer");

      // If not found, try fetching series (tv) videos
      if (!trailer) {
        res = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options);
        data = await res.json();
        trailer = data.results?.find(video => video.type === "Trailer");
      }

      if (trailer) {
        setApiData(trailer);
      } else {
        setApiData({
          name: "Trailer not found",
          key: "",
          published_at: "",
          type: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchVideos();
}, [id]);


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-2)}}/>
      <iframe width='90%' height='90%' 
      src={`https://www.youtube.com/embed/${apiData.key}`} 
      title='trailer' frameborder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.split('-')[0]}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
      
    </div>
  )
}

export default Player
