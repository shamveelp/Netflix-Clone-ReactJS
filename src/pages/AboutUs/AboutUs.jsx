import React from 'react';
import './AboutUs.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const AboutUs = () => {
  return (
    <div className="about-page">
      <Navbar />
      <div className="about-hero">
        <h1>About <span>Netflix - Clone</span></h1>
        <p>Your gateway to the world of entertainment.</p>
      </div>

      <div className="about-content">
        <section>
          <h2>Our Mission 🎯</h2>
          <p>
            At StreamFlix, our mission is to redefine entertainment by making world-class movies and series accessible anytime, anywhere. We're committed to delivering a seamless streaming experience powered by cutting-edge technology and curated content.
          </p>
        </section>

        <section>
          <h2>What We Offer 📺</h2>
          <ul>
            <li>⚡ Unlimited streaming of top-rated movies and TV shows</li>
            <li>🌍 Multilingual content for global audiences</li>
            <li>📱 Watch anytime, on any device</li>
            <li>🧠 Smart recommendations just for you</li>
          </ul>
        </section>

        <section>
          <h2>Meet the Team 👨‍💻👩‍💻</h2>
          <p>
            Built by passionate developers and designers who love movies as much as you do. Our team constantly works to improve your viewing experience and bring you closer to the stories you love.
          </p>
          <section className="team-section">
  <h2>Meet the Team 👨‍💻👩‍💻</h2>
  <p>
    Built by passionate developers and designers who love movies as much as you do. Our team constantly works to improve your viewing experience and bring you closer to the stories you love.
  </p>

  <div className="team-card">
    <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="Founder" className="founder-img" />
    <div className="team-info">
      <h3>Shamveel P</h3>
      <p className="role">Founder & CEO</p>
      <p className="desc">
        A visionary full-stack developer and storyteller who started StreamFlix to blend passion for tech and film. Shamveel leads the platform’s growth with creativity and innovation.
      </p>
    </div>
  </div>
</section>

        </section>

        <section>
          <h2>Why Choose Us? ❤️</h2>
          <p>
            Because we don’t just stream content — we deliver experiences. Whether it's binge-watching thrillers or relaxing with comedies, StreamFlix is your companion.
          </p>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
