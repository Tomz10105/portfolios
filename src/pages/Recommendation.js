import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import TitleBar from "../components/TitleBar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import MenuMobile from "../components/MenuMobile";
import services from "../data/recommendation";
import "../styles/Recommendation.css";
import { VscCheck, VscShield } from 'react-icons/vsc';

const FILTERS = [
  { label: 'All',       value: 'all'     },
  { label: 'Discord',   value: 'discord' },
  { label: 'Web2',      value: 'web2'    },
  { label: 'Web3',      value: 'web3'    },
  { label: 'Game Dev',  value: 'gamedev' },
  { label: 'Social',    value: 'social'  },
];

function Recommendation() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? services
    : services.filter(s => s.tag === activeFilter);

  return (
    <body>
      <TitleBar />
      <section className="flex-container">
        <section className="main-container">
          <Header />
          <MenuMobile />
          <main className="main-wrapper recommendation">

            {/* ── Page header ── */}
            <div className="services-header">
              <span className="services-comment">// services.json</span>
              <h1 className="title-recommendation">
                Services I Provide
              </h1>
              <p className="services-subtitle">
                From Discord bots to blockchain DApps and MMORPG servers —
                here's what I build.
              </p>
            </div>

            {/* ── Filter bar ── */}
            <div className="services-filter-bar">
              {FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  className={`svc-btn-filter ${activeFilter === value ? 'active' : ''}`}
                  onClick={() => setActiveFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Cards grid ── */}
            <div className="recommendation-container">
              {filtered.map(({ icon, name, description, features, note, color }) => (
                <div
                  key={name}
                  className="recommendation-card"
                  style={{ '--svc-color': color }}
                >
                  {/* Card top */}
                  <div className="svc-card-top">
                    <span className="svc-icon">{icon}</span>
                    <h2 className="svc-name">{name}</h2>
                  </div>

                  {/* Description */}
                  <p className="svc-description">{description}</p>

                  {/* Features */}
                  <ul className="svc-features">
                    {features.map(f => (
                      <li key={f} className="svc-feature-item">
                        <VscCheck className="svc-check" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* TOS note */}
                  {note && (
                    <div className="svc-tos">
                      <VscShield className="svc-shield" />
                      <span>{note}</span>
                    </div>
                  )}

                  {/* CTA */}
                  <Link to="/contact" className="svc-cta">
                    Inquire <span className="svc-arrow">→</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* ── Bottom CTA banner ── */}
            <div className="services-cta-banner">
              <p className="cta-banner-text">
                Have a project in mind? Let's build it together.
              </p>
              <Link to="/contact" className="cta-banner-btn">
                Get in Touch →
              </Link>
            </div>

          </main>
        </section>
        <SideBar />
      </section>
      <Footer />
    </body>
  );
}

export default Recommendation;
