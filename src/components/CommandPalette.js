import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { VscSearch, VscClose } from 'react-icons/vsc';
import FILES from '../data/files';
import myContext from '../context/AppContext';
import '../styles/CommandPalette.css';

function CommandPalette() {
  const { commandOpen, setCommandOpen, addTab } = useContext(myContext);
  const [query, setQuery]         = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef  = useRef(null);
  const listRef   = useRef(null);
  const navigate  = useNavigate();

  const results = query.trim() === ''
    ? FILES
    : FILES.filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.path.toLowerCase().includes(query.toLowerCase())
      );

  /* ── Keyboard shortcut: Ctrl+K ── */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(prev => !prev);
      }
      if (e.key === 'Escape') setCommandOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setCommandOpen]);

  /* ── Focus input when opened ── */
  useEffect(() => {
    if (commandOpen) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [commandOpen]);

  /* ── Scroll active item into view ── */
  useEffect(() => {
    const el = listRef.current?.children[activeIdx];
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  const handleSelect = useCallback((file) => {
    addTab(file.path);
    navigate(file.path);
    setCommandOpen(false);
  }, [addTab, navigate, setCommandOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIdx]) {
      handleSelect(results[activeIdx]);
    }
  };

  if (!commandOpen) return null;

  return (
    <div className="cp-backdrop" onClick={() => setCommandOpen(false)}>
      <div className="cp-modal" role="dialog" aria-label="Command Palette" onClick={e => e.stopPropagation()}>

        {/* Search input row */}
        <div className="cp-input-row">
          <VscSearch className="cp-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="cp-input"
            placeholder="Go to file…"
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
            onKeyDown={handleKeyDown}
            spellCheck={false}
          />
          {query && (
            <button className="cp-clear" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>
              <VscClose />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="cp-results" ref={listRef}>
          {results.length === 0 ? (
            <div className="cp-empty">No results for "{query}"</div>
          ) : (
            results.map((file, i) => (
              <button
                key={file.path}
                className={`cp-item ${i === activeIdx ? 'active' : ''}`}
                onClick={() => handleSelect(file)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <img src={file.icon} alt="" className="cp-file-icon" />
                <span className="cp-file-name">{file.name}</span>
                <span className="cp-file-path">{file.path === '/' ? '/index' : file.path}</span>
              </button>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="cp-footer">
          <span className="cp-hint"><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span className="cp-hint"><kbd>↵</kbd> open</span>
          <span className="cp-hint"><kbd>Esc</kbd> close</span>
          <span className="cp-hint cp-hint--right"><kbd>Ctrl</kbd><kbd>K</kbd></span>
        </div>

      </div>
    </div>
  );
}

export default CommandPalette;
