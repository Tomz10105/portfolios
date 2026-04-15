import React, { useContext } from "react";
import { VscSearch } from 'react-icons/vsc';
import myContext from '../context/AppContext';
import '../styles/TitleBar.css';

function TitleBar() {
  const { setCommandOpen } = useContext(myContext);

  return (
    <section className="title-bar">
      <div className="title-btn">
        <span className="close"/>
        <span className="minimize"/>
        <span className="maximize"/>
      </div>

      <button
        className="title-search"
        onClick={() => setCommandOpen(true)}
        title="Go to File (Ctrl+K)"
      >
        <VscSearch className="title-search-icon" />
        <span className="title-search-text">TomBz.tsx — Portfolio</span>
        <kbd className="title-search-kbd">Ctrl</kbd>
        <kbd className="title-search-kbd">K</kbd>
      </button>

      <div className="title-wincontrols" aria-hidden="true" />
    </section>
  );
}

export default TitleBar;