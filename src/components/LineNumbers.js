import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/LineNumbers.css';

function LineNumbers() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/editor/')) return null;

  return (
    <div className="editor-gutter" aria-hidden="true">
      {Array.from({ length: 120 }, (_, i) => (
        <span key={i} className="line-num">{i + 1}</span>
      ))}
    </div>
  );
}

export default LineNumbers;
