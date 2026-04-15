import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../styles/Header.css';
import myContext from "../context/AppContext";
import FILES, { iconForFile } from "../data/files";

function Header() {
  const { openTabs, closeTab, userFiles } = useContext(myContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Map path → portfolio file metadata
  const fileMap = Object.fromEntries(FILES.map(f => [f.path, f]));

  // Resolve any tab path to { name, icon }
  const resolveMeta = (path) => {
    const pf = fileMap[path];
    if (pf) return pf;
    if (path.startsWith('/editor/')) {
      const name = decodeURIComponent(path.replace('/editor/', ''));
      if (userFiles && userFiles[name] !== undefined) {
        return { name, icon: iconForFile(name) };
      }
    }
    return null;
  };

  const handleClose = (e, path) => {
    e.preventDefault();
    e.stopPropagation();

    const remaining = openTabs.filter(p => p !== path);
    closeTab(path);

    if (pathname === path) {
      if (remaining.length > 0) {
        const idx = openTabs.indexOf(path);
        navigate(remaining[Math.min(idx, remaining.length - 1)]);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <header className="header-container">
      <nav className="nav-container">
        {openTabs.map(path => {
          const meta = resolveMeta(path);
          if (!meta) return null;
          const isActive = pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={`nav-bar ${isActive ? 'active' : ''}`}
            >
              <img src={meta.icon} alt="" className="icon-nav" />
              <span className="tab-name">{meta.name}</span>
              <button
                className="tab-close"
                onClick={(e) => handleClose(e, path)}
                title="Close"
              >
                ×
              </button>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;
