import React from "react";
import { useLocation } from "react-router-dom";
import { BsTwitter, BsDiscord, BsGithub } from 'react-icons/bs';
import { VscSourceControl, VscError, VscWarning, VscBell } from 'react-icons/vsc';
import '../styles/Footer.css';

const langMap = {
  '/':              'JavaScript React',
  '/about':         'HTML',
  '/projects':      'JavaScript',
  '/recommendation':'JSON',
  '/contact':       'CSS',
};

function Footer() {
  const { pathname } = useLocation();
  const language = langMap[pathname] || 'JavaScript React';

  return (
    <footer className="statusbar">

      {/* ── Left items ── */}
      <div className="statusbar-left">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="statusbar-item statusbar-item--remote"
          title="Remote / GitHub"
        >
          <VscSourceControl />
          <span>main</span>
        </a>

        <span className="statusbar-item statusbar-errors" title="Errors">
          <VscError />
          <span>0</span>
        </span>
        <span className="statusbar-item statusbar-warnings" title="Warnings">
          <VscWarning />
          <span>0</span>
        </span>
      </div>

      {/* ── Centre (name) ── */}
      <span className="statusbar-center">TomBz · Portfolio</span>

      {/* ── Right items ── */}
      <div className="statusbar-right">
        <a
          href="https://twitter.com/tomnaxie"
          target="_blank"
          rel="noreferrer"
          className="statusbar-item"
          title="Twitter / X"
        >
          <BsTwitter />
        </a>
        <a
          href="https://discord.gg/9R92cGWVka"
          target="_blank"
          rel="noreferrer"
          className="statusbar-item"
          title="Discord"
        >
          <BsDiscord />
        </a>
        <a
          href="https://github.com/Tomz10105"
          target="_blank"
          rel="noreferrer"
          className="statusbar-item"
          title="GitHub"
        >
          <BsGithub />
        </a>

        <span className="statusbar-divider" />

        <span className="statusbar-item" title="File encoding">UTF-8</span>
        <span className="statusbar-item statusbar-item--lang" title="Language mode">
          {language}
        </span>
        <span className="statusbar-item" title="Notifications">
          <VscBell />
        </span>
      </div>

    </footer>
  );
}

export default Footer;
