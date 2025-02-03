import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navigation from './Components/Navigation'; 

const basename = "/Social_Blog_Dashboard";
const App = () => {
  return (
    <Router basename={basename}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
