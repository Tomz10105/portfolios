import React, { useMemo } from 'react';
import '../styles/Minimap.css';

/* Deterministic-but-varied fake code lines */
const SEED_LINES = [
  { indent: 0,  w: 52, color: 'kw'   },
  { indent: 0,  w: 38, color: 'fn'   },
  { indent: 1,  w: 60, color: 'str'  },
  { indent: 1,  w: 44, color: 'var'  },
  { indent: 2,  w: 70, color: 'num'  },
  { indent: 2,  w: 32, color: 'cm'   },
  { indent: 2,  w: 55, color: 'kw'   },
  { indent: 1,  w: 48, color: 'fn'   },
  { indent: 0,  w: 16, color: 'var'  },
  { indent: 0,  w: 0,  color: 'empty'},
  { indent: 0,  w: 44, color: 'kw'   },
  { indent: 1,  w: 62, color: 'str'  },
  { indent: 1,  w: 50, color: 'fn'   },
  { indent: 2,  w: 38, color: 'num'  },
  { indent: 2,  w: 72, color: 'var'  },
  { indent: 1,  w: 28, color: 'cm'   },
  { indent: 0,  w: 16, color: 'var'  },
  { indent: 0,  w: 0,  color: 'empty'},
  { indent: 0,  w: 56, color: 'kw'   },
  { indent: 1,  w: 40, color: 'fn'   },
  { indent: 2,  w: 68, color: 'str'  },
  { indent: 2,  w: 50, color: 'num'  },
  { indent: 1,  w: 34, color: 'kw'   },
  { indent: 0,  w: 16, color: 'var'  },
];

function generateLines(count) {
  const lines = [];
  for (let i = 0; i < count; i++) {
    lines.push(SEED_LINES[i % SEED_LINES.length]);
  }
  return lines;
}

function Minimap() {
  const lines = useMemo(() => generateLines(120), []);

  return (
    <aside className="minimap" aria-hidden="true">
      <div className="minimap-viewport" />
      <div className="minimap-lines">
        {lines.map((line, i) => (
          line.color === 'empty'
            ? <div key={i} className="mm-line mm-empty" />
            : (
              <div key={i} className="mm-line" style={{ paddingLeft: line.indent * 6 }}>
                <span
                  className={`mm-token mm-${line.color}`}
                  style={{ width: `${line.w}%` }}
                />
              </div>
            )
        ))}
      </div>
    </aside>
  );
}

export default Minimap;
