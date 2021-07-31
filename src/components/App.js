import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar'
import Home from './Home'
import Redeem from './Redeem'
import BoughtItems from './BoughtList';
import About from './About'
function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Redeem />
      <BoughtItems />
      <About />
    </div>
  );
}

export default App;
