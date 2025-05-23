import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import hero_banner from '../../assets/hocks.jpg'
import hero_title from '../../assets/hoc-logo.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img'/>
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img'/>
          <p>
            Discovering his ties to a secret ancient order, a young 
            man living in modern <br />Istanbul embarksd on a quest to save
            the city from an immortal enemy.
          </p>
          <div className="hero-btns">
            <Link to={`/player/950387`} ><button className='btn'>
              <img src={play_icon} alt="" />
              Play
            </button></Link>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
          <TitleCards title="Popular on Netflix"/>
        </div>
      </div>

      <div className="more-cards">
        <TitleCards title="Blockbusters" category={"top_rated"}/>
        <TitleCards title="Only On Neflix" category={"popular"}/>
        <TitleCards title="Upcoming" category={"upcoming"}/>
        <TitleCards title="Top Picks for You" category={"now_playing"}/>
      </div>
      <Footer />
    </div>
  )
}

export default Home
