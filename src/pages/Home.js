import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import TitleBar from "../components/TitleBar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import MenuMobile from "../components/MenuMobile";
import '../styles/Home.css';
import image from '../images/img-perfil.jpg';
import { TypeAnimation } from 'react-type-animation';
import { BsTwitter, BsDiscord, BsGithub } from 'react-icons/bs';

function Home() {
  return (
    <body>
      <TitleBar />
      <section className="flex-container">
        <SideBar />
        <section className="main-container">
          <Header />
          <MenuMobile />
          <main className="main-wrapper home">

            {/* ── Left: content ── */}
            <div className="home-content">

              {/* Status badge */}
              <div className="status-badge">
                <span className="status-dot" />
                Available for work
              </div>

              {/* Greeting */}
              <p className="home-greeting">
                <span className="code-tag">{'<'}</span>
                Hello 👋 I am
                <span className="code-tag">{' />'}</span>
              </p>

              {/* Name */}
              <h1 className="home-name">TomBz</h1>

              {/* Typing animation */}
              <div className="home-typing">
                <span className="typing-prefix">$&nbsp;</span>
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',  1200,
                    'Web3 Engineer',         1200,
                    'Discord Engineer',      1200,
                    'Flyff Server Dev',      1200,
                    'Ran Online Dev',        1200,
                    'MMORPG Web Dev',        1200,
                    'Problem Solver',        1200,
                  ]}
                  speed={55}
                  repeat={Infinity}
                  wrapper="span"
                  className="typing-text"
                />
              </div>

              {/* Tech pill row */}
              <div className="home-pills">
                <span className="pill">Web2</span>
                <span className="pill">Web3</span>
                <span className="pill">Game Server Dev</span>
                <span className="pill">BS IT Graduate</span>
              </div>

              {/* CTA buttons */}
              <div className="home-ctas">
                <Link to="/projects" className="btn-cta btn-primary-cta">
                  View Projects <span className="btn-arrow">→</span>
                </Link>
                <Link to="/contact" className="btn-cta btn-outline-cta">
                  Contact Me
                </Link>
              </div>

              {/* Social links */}
              <div className="home-socials">
                <a
                  href="https://twitter.com/tomnaxie"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                  title="Twitter / X"
                >
                  <BsTwitter />
                </a>
                <a
                  href="https://discord.gg/9R92cGWVka"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                  title="Discord"
                >
                  <BsDiscord />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="GitHub"
                >
                  <BsGithub />
                </a>
              </div>

            </div>

            {/* ── Right: profile image ── */}
            <div className="image-wrapper">
              <img src={image} alt="TomBz" className="image-perfil" />
            </div>

          </main>
        </section>
      </section>
      <Footer />
    </body>
  );
}

export default Home;
