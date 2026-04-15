import React, {
  useContext, useRef, useState, useEffect, useCallback,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  VscPlay, VscTrash, VscTerminal, VscChevronDown, VscChevronRight,
  VscCircleSlash,
} from 'react-icons/vsc';
import Header from '../components/Header';
import TitleBar from '../components/TitleBar';
import SideBar from '../components/SideBar';
import MenuMobile from '../components/MenuMobile';
import myContext from '../context/AppContext';
import { iconForFile } from '../data/files';
import '../styles/Editor.css';

/* ── Language label from extension ── */
const LANG_MAP = {
  js: 'JavaScript', jsx: 'JavaScript React',
  ts: 'TypeScript', tsx: 'TypeScript React',
  html: 'HTML', htm: 'HTML',
  css: 'CSS', scss: 'SCSS',
  json: 'JSON', py: 'Python',
  md: 'Markdown', txt: 'Plain Text',
};
const getLang = (name) => {
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  return LANG_MAP[ext] ?? 'Plain Text';
};

/* ── Runnable extensions ── */
const RUNNABLE = new Set(['js', 'jsx', 'ts', 'tsx']);
const isRunnable = (name) => RUNNABLE.has(name.split('.').pop()?.toLowerCase() ?? '');

/* ── Auto-pair map ── */
const PAIRS = { '(': ')', '{': '}', '[': ']', '"': '"', '`': '`' };

/* ── Starter templates ── */
const TEMPLATE = {
  js:   '// Write some JavaScript!\n\nconsole.log("Hello from the playground! 👋");\n',
  jsx:  '// Write some JSX!\n\nconst App = () => <h1>Hello World!</h1>;\n',
  ts:   '// Write some TypeScript!\n\nconst greet = (name: string): string => `Hello, ${name}!`;\n\nconsole.log(greet("World"));\n',
  tsx:  '// Write some TSX!\n\nconst App = (): JSX.Element => <h1>Hello World!</h1>;\n',
  html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n</body>\n</html>\n',
  css:  '/* My styles */\n\nbody {\n  margin: 0;\n  font-family: sans-serif;\n  background: #1e1e1e;\n  color: #d4d4d4;\n}\n',
  json: '{\n  "name": "my-project",\n  "version": "1.0.0",\n  "description": ""\n}\n',
  py:   '# Python script\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))\n',
};

/* ── Run JS safely ── */
function runJS(code) {
  const logs = [];
  const push = (type, args) =>
    logs.push({ type, text: args.map(a => {
      try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
      catch { return String(a); }
    }).join(' ') });

  const fakeConsole = {
    log:   (...a) => push('log',   a),
    info:  (...a) => push('log',   a),
    warn:  (...a) => push('warn',  a),
    error: (...a) => push('error', a),
  };

  let error = null;
  try {
    // eslint-disable-next-line no-new-func
    new Function('console', code)(fakeConsole);
  } catch (e) {
    error = e.message;
  }
  return { logs, error };
}

/* ══════════════════════════════════════════════════════
   Editor Component
════════════════════════════════════════════════════════ */
export default function Editor() {
  const { filename: enc } = useParams();
  const filename = decodeURIComponent(enc ?? 'untitled.js');
  const navigate = useNavigate();

  const { userFiles, updateUserFile, deleteUserFile, closeTab } = useContext(myContext);

  const textareaRef = useRef(null);
  const gutterRef   = useRef(null);

  const ext      = filename.split('.').pop()?.toLowerCase() ?? '';
  const lang     = getLang(filename);
  const runnable = isRunnable(filename);
  const icon     = iconForFile(filename);

  /* ── Content: use context (persisted) ── */
  const content = userFiles[filename] ?? TEMPLATE[ext] ?? '';

  /* ── Seed template on first mount ── */
  useEffect(() => {
    if (userFiles[filename] === '' && TEMPLATE[ext]) {
      updateUserFile(filename, TEMPLATE[ext]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Sync textarea value when navigating between user files ── */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = userFiles[filename] ?? TEMPLATE[ext] ?? '';
      setLineCount((textareaRef.current.value.split('\n').length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filename]);

  /* ── Live stats ── */
  const [lineCount, setLineCount] = useState(() => content.split('\n').length);
  const [cursor, setCursor]       = useState({ ln: 1, col: 1 });

  /* ── Terminal ── */
  const [termOpen,   setTermOpen]   = useState(false);
  const [termOutput, setTermOutput] = useState(null); // { logs, error }

  /* ── Scroll sync: textarea → gutter ── */
  const handleScroll = useCallback(() => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  /* ── onChange: update context + line count ── */
  const handleChange = (e) => {
    const val = e.target.value;
    setLineCount(val.split('\n').length);
    updateUserFile(filename, val);
  };

  /* ── Cursor position tracking ── */
  const handleSelect = (e) => {
    const ta = e.target;
    const before = ta.value.substring(0, ta.selectionStart);
    const lines  = before.split('\n');
    setCursor({ ln: lines.length, col: lines[lines.length - 1].length + 1 });
  };

  /* ── Keyboard magic ── */
  const handleKeyDown = (e) => {
    const ta = e.target;
    const ss = ta.selectionStart;
    const se = ta.selectionEnd;

    /* Tab → 2 spaces */
    if (e.key === 'Tab') {
      e.preventDefault();
      const before = ta.value.substring(0, ss);
      const after  = ta.value.substring(se);
      ta.value = before + '  ' + after;
      ta.selectionStart = ta.selectionEnd = ss + 2;
      setLineCount(ta.value.split('\n').length);
      updateUserFile(filename, ta.value);
      return;
    }

    /* Auto-pairs */
    if (PAIRS[e.key] && ss === se) {
      e.preventDefault();
      const close  = PAIRS[e.key];
      const before = ta.value.substring(0, ss);
      const after  = ta.value.substring(se);
      ta.value = before + e.key + close + after;
      ta.selectionStart = ta.selectionEnd = ss + 1;
      updateUserFile(filename, ta.value);
      return;
    }

    /* Enter → preserve indentation */
    if (e.key === 'Enter') {
      e.preventDefault();
      const before     = ta.value.substring(0, ss);
      const after      = ta.value.substring(se);
      const currentLine = before.split('\n').pop();
      const indent     = currentLine.match(/^(\s*)/)[1];
      // Extra indent if line ends with { or (
      const extra      = /[{(\[]$/.test(currentLine.trimEnd()) ? '  ' : '';
      const insertion  = '\n' + indent + extra;
      ta.value = before + insertion + after;
      ta.selectionStart = ta.selectionEnd = ss + insertion.length;
      setLineCount(ta.value.split('\n').length);
      updateUserFile(filename, ta.value);
      return;
    }
  };

  /* ── Run JS ── */
  const handleRun = () => {
    const result = runJS(textareaRef.current?.value ?? content);
    setTermOutput(result);
    setTermOpen(true);
  };

  /* ── Delete file ── */
  const handleDelete = () => {
    const path = '/editor/' + encodeURIComponent(filename);
    closeTab(path);
    deleteUserFile(filename);
    navigate('/');
  };

  return (
    <body>
      <TitleBar />
      <section className="flex-container">
        <section className="main-container ed-main">
          <Header />
          <MenuMobile />
          <main className="main-wrapper ed-wrapper">

            {/* ── Editor toolbar ── */}
            <div className="ed-toolbar">
              <img src={icon} alt="" className="ed-toolbar-icon" />
              <span className="ed-toolbar-name">{filename}</span>
              <span className="ed-toolbar-badge">{lang}</span>
              <span className="ed-toolbar-pos">Ln {cursor.ln}, Col {cursor.col}</span>

              <div className="ed-toolbar-actions">
                {runnable && (
                  <button className="ed-run-btn" onClick={handleRun} title="Run (JS only)">
                    <VscPlay /> Run
                  </button>
                )}
                <button className="ed-del-btn" onClick={handleDelete} title="Delete file">
                  <VscTrash />
                </button>
              </div>
            </div>

            {/* ── Editor body ── */}
            <div className="ed-body">
              {/* Line number gutter */}
              <div className="ed-gutter" ref={gutterRef} aria-hidden="true">
                {Array.from({ length: Math.max(lineCount, 1) }, (_, i) => (
                  <span key={i} className="ed-ln">{i + 1}</span>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                className="ed-textarea"
                defaultValue={content}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
                onSelect={handleSelect}
                onClick={handleSelect}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder={`// Start typing ${filename}…`}
              />
            </div>

            {/* ── Terminal panel ── */}
            {termOpen && (
              <div className="ed-terminal">
                <div className="ed-term-bar">
                  <VscTerminal className="ed-term-icon" />
                  <span>Terminal</span>
                  <button
                    className="ed-term-clear"
                    onClick={() => setTermOutput(null)}
                    title="Clear output"
                  >
                    <VscCircleSlash />
                  </button>
                  <button
                    className="ed-term-close"
                    onClick={() => setTermOpen(false)}
                    title="Close panel"
                  >
                    <VscChevronDown />
                  </button>
                </div>

                <div className="ed-term-output">
                  {termOutput === null && (
                    <span className="ed-term-hint">Press ▶ Run to execute your code.</span>
                  )}
                  {termOutput && termOutput.logs.length === 0 && !termOutput.error && (
                    <span className="ed-term-hint">✓ Ran with no output.</span>
                  )}
                  {termOutput && termOutput.logs.map((entry, i) => (
                    <div key={i} className={`ed-term-line ed-term-${entry.type}`}>
                      <span className="ed-term-prompt">&gt;</span>
                      <span>{entry.text}</span>
                    </div>
                  ))}
                  {termOutput?.error && (
                    <div className="ed-term-line ed-term-error">
                      <span className="ed-term-prompt">✕</span>
                      <span>{termOutput.error}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!termOpen && runnable && (
              <button className="ed-term-peek" onClick={() => setTermOpen(true)}>
                <VscChevronRight /> Terminal
              </button>
            )}

          </main>
        </section>
        <SideBar />
      </section>

      {/* Status strip — replaces Footer for editor pages */}
      <div className="ed-statusstrip">
        <span>Ln {cursor.ln}, Col {cursor.col}</span>
        <span>{lineCount} lines</span>
        <span>{lang}</span>
        <span>UTF-8</span>
      </div>
    </body>
  );
}
