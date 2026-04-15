import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { VscError, VscWarning, VscHome } from 'react-icons/vsc';
import TitleBar from '../components/TitleBar';
import Footer from '../components/Footer';
import '../styles/NotFound.css';

const LINES = [
  { ln: 1,  tokens: [{ t: 'cm', v: '// 404.ts — file not found' }] },
  { ln: 2,  tokens: [] },
  { ln: 3,  tokens: [{ t: 'kw', v: 'throw' }, { t: 'sp', v: ' ' }, { t: 'kw', v: 'new' }, { t: 'sp', v: ' ' }, { t: 'fn', v: 'RouteError' }, { t: 'pu', v: '(' }] },
  { ln: 4,  tokens: [{ t: 'sp', v: '  ' }, { t: 'pu', v: '{' }] },
  { ln: 5,  tokens: [{ t: 'sp', v: '    ' }, { t: 'prop', v: 'code' }, { t: 'pu', v: ':' }, { t: 'sp', v: ' ' }, { t: 'num', v: '404' }, { t: 'pu', v: ',' }] },
  { ln: 6,  tokens: [{ t: 'sp', v: '    ' }, { t: 'prop', v: 'message' }, { t: 'pu', v: ':' }, { t: 'sp', v: ' ' }, { t: 'str', v: '"Page not found"' }, { t: 'pu', v: ',' }] },
  { ln: 7,  tokens: [] },
  { ln: 8,  tokens: [{ t: 'sp', v: '    ' }, { t: 'prop', v: '// checked paths:' }] },
  { ln: 9,  tokens: [{ t: 'sp', v: '    ' }, { t: 'prop', v: 'routes' }, { t: 'pu', v: ':' }, { t: 'sp', v: ' ' }, { t: 'pu', v: '[' }] },
  { ln: 10, tokens: [{ t: 'sp', v: '      ' }, { t: 'str', v: '"/"' }, { t: 'pu', v: ',' }, { t: 'sp', v: ' ' }, { t: 'str', v: '"about"' }, { t: 'pu', v: ',' }, { t: 'sp', v: ' ' }, { t: 'str', v: '"projects"' }, { t: 'pu', v: ',' }] },
  { ln: 11, tokens: [{ t: 'sp', v: '      ' }, { t: 'str', v: '"recommendation"' }, { t: 'pu', v: ',' }, { t: 'sp', v: ' ' }, { t: 'str', v: '"contact"' }] },
  { ln: 12, tokens: [{ t: 'sp', v: '    ' }, { t: 'pu', v: '],' }] },
  { ln: 13, tokens: [{ t: 'sp', v: '  ' }, { t: 'pu', v: '}' }] },
  { ln: 14, tokens: [{ t: 'pu', v: ');' }] },
];

const COLOR = { cm: '#6a9955', kw: '#c586c0', fn: '#dcdcaa', str: '#ce9178', num: '#b5cea8', prop: '#9cdcfe', pu: '#d4d4d4', sp: 'transparent' };

export default function NotFound() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [tick, setTick] = useState(true);

  /* blinking cursor */
  useEffect(() => {
    const id = setInterval(() => setTick(t => !t), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <body>
      <TitleBar />
      <main className="nf-root">

        {/* ── Error tab bar ── */}
        <div className="nf-tabbar">
          <div className="nf-tab">
            <VscError className="nf-tab-icon" />
            <span>404.ts</span>
          </div>
        </div>

        {/* ── Problems panel row ── */}
        <div className="nf-problems-row">
          <VscError   className="nf-prob-icon error"   />
          <span className="nf-prob-count">1</span>
          <VscWarning className="nf-prob-icon warning" />
          <span className="nf-prob-count">0</span>
          <span className="nf-prob-path">{location.pathname}</span>
        </div>

        {/* ── Code editor area ── */}
        <div className="nf-editor">
          {LINES.map(({ ln, tokens }) => (
            <div className="nf-line" key={ln}>
              <span className="nf-ln">{ln}</span>
              <span className="nf-code">
                {tokens.map((tok, i) => (
                  <span key={i} style={{ color: COLOR[tok.t] ?? '#d4d4d4' }}>{tok.v}</span>
                ))}
                {ln === 14 && (
                  <span className={`nf-cursor ${tick ? 'visible' : ''}`} />
                )}
              </span>
            </div>
          ))}
        </div>

        {/* ── Big 404 number + CTA ── */}
        <div className="nf-hero">
          <div className="nf-code-num">404</div>
          <p className="nf-msg">This file doesn't exist in the workspace.</p>
          <button className="nf-home-btn" onClick={() => navigate('/')}>
            <VscHome />
            Go to Home
          </button>
        </div>

      </main>
      <Footer />
    </body>
  );
}
