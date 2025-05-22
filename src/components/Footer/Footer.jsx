import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <a href="https://www.linkedin.com/in/shamveel-p/" target="_blank" rel="noopener noreferrer"><img src={facebook_icon} alt="" /></a>
        <a href="https://www.instagram.com/_shamveel._/" target='_blank'><img src={instagram_icon} alt="" /></a>
        <a href="https://x.com/Shamveel_P" target='_blank'><img src={twitter_icon} alt="" /></a>
        <a href="https://www.youtube.com/@CodingAashan" target='_blank'><img src={youtube_icon} alt="" /></a>
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className="copyright-text">
        © {new Date().getFullYear()} Netflix Clone - Coding Aashan, Inc. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
