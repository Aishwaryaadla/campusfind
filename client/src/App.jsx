import React from 'react';
import { Route,Routes } from 'react-router';
import AboutPage from './pages/AboutPage';
import FoundPage from './pages/FoundPage';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import toast from "react-hot-toast";


const App = () => {
  return (
    <div>
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
