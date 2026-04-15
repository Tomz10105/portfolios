import PropTypes from "prop-types";
import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [activeSideBar, setActiveSideBar] = useState(false);
  const [openTabs, setOpenTabs]           = useState(['/']);
  const [commandOpen, setCommandOpen]     = useState(false);

  // User-created files: { [filename]: contentString }
  const [userFiles, setUserFiles] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_files');
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  // Persist user files to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio_user_files', JSON.stringify(userFiles));
  }, [userFiles]);

  const addTab = (path) => {
    setOpenTabs(prev => prev.includes(path) ? prev : [...prev, path]);
  };

  const closeTab = (path) => {
    setOpenTabs(prev => prev.filter(p => p !== path));
  };

  const createUserFile = (name, initialContent = '') => {
    setUserFiles(prev =>
      prev[name] !== undefined ? prev : { ...prev, [name]: initialContent }
    );
  };

  const updateUserFile = (name, content) => {
    setUserFiles(prev => ({ ...prev, [name]: content }));
  };

  const deleteUserFile = (name) => {
    setUserFiles(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const state = {
    activeSideBar, setActiveSideBar,
    openTabs, addTab, closeTab,
    commandOpen, setCommandOpen,
    userFiles, createUserFile, updateUserFile, deleteUserFile,
  };

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };
export default Provider;
