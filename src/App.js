import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Recommendation from './pages/Recommendation';
import NotFound from './pages/NotFound';
import Editor from './pages/Editor';
import AppProvider from './context/AppProvider';
import LineNumbers from './components/LineNumbers';
import CommandPalette from './components/CommandPalette';
import Minimap from './components/Minimap';

function App() {
  return (
    <AppProvider>
      <LineNumbers />
      <Minimap />
      <CommandPalette />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/editor/:filename" element={<Editor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
