import React, { useState } from "react";
import Header from "../components/Header";
import TitleBar from "../components/TitleBar";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import MenuMobile from "../components/MenuMobile";
import projects from "../data/projects";
import "../styles/Projects.css";
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { VscFolder } from 'react-icons/vsc';

const FILTERS = [
  { label: 'All',      value: 'all'     },
  { label: 'Web2',     value: 'web2'    },
  { label: 'Web3',     value: 'web3'    },
  { label: 'Discord',  value: 'discord' },
  { label: 'Game Dev', value: 'gamedev' },
];

const STATUS_COLOURS = {
  'Live':   { bg: 'rgba(78, 201, 176, 0.12)', border: 'rgba(78, 201, 176, 0.35)', text: '#4ec9b0' },
  'In Dev': { bg: 'rgba(220, 220, 170, 0.1)',  border: 'rgba(220, 220, 170, 0.3)',  text: '#dcdcaa' },
};

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.type.includes(activeFilter));

  return (
    <body>
      <TitleBar />
      <section className="flex-container">
        <section className="main-container">
          <Header />
          <MenuMobile />
          <main className="main-wrapper projects">

            {/* ── Page header ── */}
            <div className="projects-header">
              <div className="projects-title-row">
                <span className="projects-comment">// my-projects.js</span>
                <h1 className="title-page-projects">
                  <VscFolder className="projects-folder-icon" />
                  My Projects
                </h1>
              </div>

              {/* Stats row */}
              <div className="projects-stats">
                <span className="stat-item">
                  <span className="stat-num">{projects.length}</span> projects
                </span>
                <span className="stat-sep">·</span>
                <span className="stat-item">
                  <span className="stat-num">
                    {[...new Set(projects.flatMap(p => p.technologies))].length}
                  </span> technologies
                </span>
                <span className="stat-sep">·</span>
                <span className="stat-item">
                  <span className="stat-num">
                    {projects.filter(p => p.status === 'Live').length}
                  </span> live
                </span>
              </div>
            </div>

            {/* ── Filter tabs ── */}
            <div className="filter-bar">
              {FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  className={`btn-filter ${activeFilter === value ? 'active' : ''}`}
                  onClick={() => setActiveFilter(value)}
                >
                  {label}
                  <span className="filter-count">
                    {value === 'all'
                      ? projects.length
                      : projects.filter(p => p.type.includes(value)).length}
                  </span>
                </button>
              ))}
            </div>

            {/* ── Cards grid ── */}
            <div className="projects-container">
              {filtered.map(({ name, description, src, gradient, repository, site, technologies, status }, index) => {
                const statusStyle = STATUS_COLOURS[status] || STATUS_COLOURS['In Dev'];
                return (
                  <div key={index} className="card-project">

                    {/* Image / gradient cover */}
                    <div className="img-container" style={!src ? { background: gradient } : {}}>
                      {src
                        ? <img src={src} alt={name} className="img-project" />
                        : <div className="img-placeholder">
                            <VscFolder className="placeholder-icon" />
                          </div>
                      }
                      {/* Status badge overlaid on image */}
                      <span
                        className="status-badge"
                        style={{
                          background: statusStyle.bg,
                          border: `1px solid ${statusStyle.border}`,
                          color: statusStyle.text,
                        }}
                      >
                        <span className="status-dot" style={{ background: statusStyle.text }} />
                        {status}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="card-body">
                      <h2 className="title-project">{name}</h2>
                      <p className="card-description">{description}</p>
                    </div>

                    {/* Footer: tech tags + links */}
                    <div className="card-footer">
                      <div className="technologies-container">
                        {technologies.map(tech => (
                          <span key={tech} className="span-technologies">{tech}</span>
                        ))}
                      </div>
                      <div className="links-container">
                        {repository && repository !== '#' && (
                          <a href={repository} title="GitHub" target="_blank" rel="noreferrer">
                            <FiGithub />
                          </a>
                        )}
                        {site && site !== '#' && (
                          <a href={site} title="Live site" target="_blank" rel="noreferrer">
                            <FiExternalLink />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </main>
        </section>
        <SideBar />
      </section>
      <Footer />
    </body>
  );
}

export default Projects;
