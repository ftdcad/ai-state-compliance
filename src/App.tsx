import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import Index from './pages/Index';
import States from './pages/States';
import Admin from './pages/Admin';
import StateDetail from './pages/StateDetail';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="coastal-claims-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/states" element={<States />} />
          <Route path="/states/:stateCode" element={<StateDetail />} />
          <Route path="/admin/details" element={<Admin />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;