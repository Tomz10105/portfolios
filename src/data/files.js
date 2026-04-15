import react_icon from '../images/react_icon.svg';
import js_icon    from '../images/js_icon.svg';
import html_icon  from '../images/html_icon.svg';
import css_icon   from '../images/css_icon.svg';
import json_icon  from '../images/json_icon.svg';

const FILES = [
  { icon: react_icon, name: 'Home.jsx',      path: '/'               },
  { icon: html_icon,  name: 'About.html',    path: '/about'          },
  { icon: js_icon,    name: 'Projects.js',   path: '/projects'       },
  { icon: json_icon,  name: 'Services.json', path: '/recommendation' },
  { icon: css_icon,   name: 'Contact.css',   path: '/contact'        },
];

export const EXT_ICON = {
  jsx: react_icon, tsx: react_icon,
  js: js_icon,    ts: js_icon,
  html: html_icon, htm: html_icon,
  css: css_icon,  scss: css_icon,
  json: json_icon,
};

export const iconForFile = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return EXT_ICON[ext] ?? js_icon;
};

export default FILES;
