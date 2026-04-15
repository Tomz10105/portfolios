import React, { useState, useContext, useRef, useEffect } from "react";
import '../styles/SideBar.css';
import {
  VscNewFile, VscNewFolder, VscRefresh,
  VscCollapseAll, VscEllipsis, VscClose,
} from 'react-icons/vsc';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation, useNavigate } from "react-router-dom";
import myContext from "../context/AppContext";
import FILES, { iconForFile } from "../data/files";

/* Generate a unique untitled name */
function nextUntitled(existingNames) {
  let i = 1;
  while (existingNames.includes(`untitled-${i}.js`)) i++;
  return `untitled-${i}.js`;
}



function SideBar() {
  const { activeSideBar, addTab, userFiles, createUserFile, deleteUserFile, closeTab } =
    useContext(myContext);
  const [open, setOpen]               = useState(true);
  const [sectionHovered, setSectionHovered] = useState(false);
  const [creating, setCreating]       = useState(false);
  const [newName, setNewName]         = useState('');
  const newNameRef                    = useRef(null);
  const { pathname }                  = useLocation();
  const navigate                      = useNavigate();

  /* Focus inline input when it appears */
  useEffect(() => {
    if (creating) {
      setTimeout(() => newNameRef.current?.focus(), 30);
    }
  }, [creating]);

  const startCreate = () => {
    const name = nextUntitled(Object.keys(userFiles));
    setNewName(name);
    setCreating(true);
    if (!open) setOpen(true);
  };

  const confirmCreate = () => {
    const name = newName.trim();
    if (!name) { setCreating(false); return; }
    createUserFile(name, '');
    const path = '/editor/' + encodeURIComponent(name);
    addTab(path);
    navigate(path);
    setCreating(false);
    setNewName('');
  };

  const cancelCreate = () => {
    setCreating(false);
    setNewName('');
  };

  const handleDeleteFile = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    const path = '/editor/' + encodeURIComponent(name);
    closeTab(path);
    deleteUserFile(name);
    if (pathname === path) navigate('/');
  };

  const userFileNames = Object.keys(userFiles);

  return (
    <aside className={`side-bar-container ${activeSideBar ? 'active' : ''}`}>

      {/* ── EXPLORER header ── */}
      <div className="explorer-header">
        <span className="explorer-header-title">EXPLORER</span>
        <button className="explorer-header-action" title="Explorer Actions">
          <VscEllipsis />
        </button>
      </div>

      {/* ── Folder section row ── */}
      <div
        className="explore-section-row"
        onMouseEnter={() => setSectionHovered(true)}
        onMouseLeave={() => setSectionHovered(false)}
      >
        <button
          type="button"
          className="explore-portfolio"
          onClick={() => setOpen(!open)}
        >
          <span className="chevron-icon">
            {open ? <IoIosArrowDown size={14} /> : <IoIosArrowForward size={14} />}
          </span>
          <span className="folder-label">TOMBZ</span>
        </button>

        <div className={`section-actions ${sectionHovered ? 'visible' : ''}`}>
          <button title="New File" onClick={startCreate}><VscNewFile /></button>
          <button title="New Folder"><VscNewFolder /></button>
          <button title="Refresh Explorer"><VscRefresh /></button>
          <button title="Collapse Folders in Explorer"><VscCollapseAll /></button>
        </div>
      </div>

      {/* ── Portfolio file tree ── */}
      {open && FILES.map(({ icon, name, path }) => {
        const isActive = pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`explorer-file ${isActive ? 'active' : ''}`}
            title={name}
            onClick={() => addTab(path)}
          >
            <img src={icon} alt="" className="icon-side-bar" />
            <span className="file-label">{name}</span>
          </Link>
        );
      })}

      {/* ── User-created files ── */}
      {open && userFileNames.length > 0 && (
        <div className="sb-divider" />
      )}

      {open && userFileNames.map((name) => {
        const path     = '/editor/' + encodeURIComponent(name);
        const isActive = pathname === path;
        return (
          <Link
            key={name}
            to={path}
            className={`explorer-file explorer-user-file ${isActive ? 'active' : ''}`}
            title={name}
            onClick={() => addTab(path)}
          >
            <img src={iconForFile(name)} alt="" className="icon-side-bar" />
            <span className="file-label">{name}</span>
            <button
              className="sb-file-del"
              title="Delete file"
              onClick={(e) => handleDeleteFile(e, name)}
            >
              <VscClose />
            </button>
          </Link>
        );
      })}

      {/* ── Inline new-file input ── */}
      {creating && (
        <div className="sb-new-file-row">
          <img src={iconForFile(newName || 'untitled.js')} alt="" className="icon-side-bar" />
          <input
            ref={newNameRef}
            className="sb-new-file-input"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') confirmCreate();
              if (e.key === 'Escape') cancelCreate();
            }}
            onBlur={confirmCreate}
            spellCheck={false}
          />
        </div>
      )}

    </aside>
  );
}

export default SideBar;
