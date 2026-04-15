import React from "react";
import Header from "../components/Header";
import TitleBar from "../components/TitleBar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import MenuMobile from "../components/MenuMobile";
import '../styles/About.css';
import IconCloud from '../components/IconCloud';

const specialties = [
  {
    emoji: '🌐',
    title: 'Web2 Development',
    desc: 'Full-stack web applications using React, Next.js, Node.js, and modern JS frameworks. Building fast, scalable, and responsive interfaces.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind'],
    color: '#539BF5',
  },
  {
    emoji: '⛓️',
    title: 'Web3 / Blockchain',
    desc: 'Smart contract development with Solidity on Ethereum & Solana. NFT platforms, DeFi protocols, and on-chain interactions.',
    tags: ['Solidity', 'Ethereum', 'Solana', 'Web3.js', 'NFT'],
    color: '#bc8cff',
  },
  {
    emoji: '⚔️',
    title: 'Flyff Source Dev',
    desc: 'Private server development for Flyff Online. Custom gameplay systems, server-side scripting, item creation, and emulator configuration.',
    tags: ['C++', 'Server Emulator', 'MSSQL', 'MySQL', 'Game Logic', 'Scripting'],
    color: '#56d364',
  },
  {
    emoji: '🎮',
    title: 'Ran Online Source Dev',
    desc: 'Ran Online private server development. Custom NPC scripting, event systems, database management, and server-side modifications.',
    tags: ['C++', 'MSSQL', 'MySQL', 'Scripting', 'Networking', 'Game Dev'],
    color: '#f78166',
  },
  {
    emoji: '🏰',
    title: 'MMORPG Websites',
    desc: 'Dedicated websites for MMORPG private servers — registration portals, item shops, patch downloaders, ranking boards, and community hubs.',
    tags: ['React', 'PHP', 'MySQL', 'Bootstrap', 'jQuery'],
    color: '#EBCB8B',
  },
];

function About() {
  return (
    <body>
      <TitleBar />
      <section className="flex-container">
        <section className="main-container">
          <Header />
          <MenuMobile />
          <main className="main-wrapper about">

            <div className="about-container">

              {/* ── HTML wrapper tags ── */}
              <span className="span-tag html">{'<html>'}</span>
              <br />
              <span className="span-tag body">{'<body>'}</span>

              {/* ── Hello heading ── */}
              <br />
              <span className="span-tag content">{'<h1>'}</span>
              <h1 className="title-about">Hello, I'm TomBz</h1>
              <span className="span-tag content">{'</h1>'}</span>

              {/* ── Bio ── */}
              <br />
              <span className="span-tag content">{'<p>'}</span>
              <p className="text-about">
                I write code for the web, the blockchain, and virtual worlds.
                From <span className="span-highlight">clean React interfaces</span> to <span className="span-highlight">on-chain smart contracts</span>,
                from Discord bots to private MMORPG servers — I build things that actually work and people actually use.
              </p>
              <p className="text-about">
                I'm obsessed with <span className="span-highlight">learning by shipping</span>. Every project teaches
                something new — a better pattern, a sharper tool, a smarter approach. I don't wait until I'm ready.
                I build, break, fix, and repeat.
              </p>
              <span className="span-tag content">{'</p>'}</span>

              {/* ── Specialties ── */}
              <br />
              <span className="span-tag content">{'<section id="specialties">'}</span>

              <div className="specialties-grid">
                {specialties.map(({ emoji, title, desc, tags, color }) => (
                  <div
                    key={title}
                    className="specialty-card"
                    style={{ '--card-accent': color }}
                  >
                    <div className="specialty-header">
                      <span className="specialty-emoji">{emoji}</span>
                      <h3 className="specialty-title">{title}</h3>
                    </div>
                    <p className="specialty-desc">{desc}</p>
                    <div className="specialty-tags">
                      {tags.map(tag => (
                        <span key={tag} className="specialty-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <span className="span-tag content">{'</section>'}</span>

              <br />
              <span className="span-tag body">{'</body>'}</span>
              <br />
              <span className="span-tag html">{'</html>'}</span>

            </div>

            {/* ── Icon Cloud ── */}
            <IconCloud />

          </main>
        </section>
        <SideBar />
      </section>
      <Footer />
    </body>
  );
}

export default About;
