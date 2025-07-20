import React from 'react';
import { Route,Routes } from 'react-router';
import AboutPage from './pages/AboutPage';
import FoundPage from './pages/FoundPage';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import toast from "react-hot-toast";


const App = () => {
  return (
    <div data-theme="cupcake">
      <button className="btn">Button</button>
      <button className="btn btn-neutral">Neutral</button>
      <button className="btn btn-primary">Primary</button>
      <button className="btn btn-secondary">Secondary</button>
      <button className="btn btn-accent">Accent</button>
      <button className="btn btn-ghost">Ghost</button>
      <button className="btn btn-link">Link</button>
      <Routes>
        <Route path = '/' element={<HomePage/>}/>
        <Route path = '/lost' element={<LostPage/>}/>
        <Route path = '/found' element={<FoundPage/>}/>
        <Route path = '/about' element={<AboutPage/>}/>
      </Routes>
    </div>
  )
}

export default App;
