import React from 'react';
import { Route,Routes } from 'react-router';
import AboutPage from './pages/AboutPage';
import FoundPage from './pages/FoundPage';
import HomePage from './pages/HomePage';
import LostPage from './pages/LostPage';
import toast from "react-hot-toast";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BrowseItemsPage from './pages/BrowseItemsPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import ItemDetail from './pages/ItemDetail';
import EditLostItem from './pages/dashboard/EditLostItem';
import EditFoundItem from './pages/dashboard/EditFoundItem';
import ComingSoon from './pages/CommigSoon';

const App = () => {
  return (
    <div data-theme="cupcake">
      <Routes>
        <Route path = '/' element={<HomePage/>}/>
        <Route path = '/lost' element={<LostPage/>}/>
        <Route path = '/found' element={<FoundPage/>}/>
        <Route path = '/about' element={<AboutPage/>}/>
        <Route path = '/login' element={<LoginPage/>}/>
        <Route path = '/signup' element={<SignupPage/>}/>
        <Route path = '/browseitems' element={<BrowseItemsPage/>}/>
        <Route path=  '/admin/dashboard' element={<AdminDashboard />} />
        <Route path= '/user/dashboard' element={<UserDashboard />} />
        <Route path = '/item/:itemType/:id' element={<ItemDetail />} />
        <Route path = '/user/dashboard' element={<UserDashboard />} />
        <Route path="/lost/edit/:id" element={<EditLostItem />} />
        <Route path="/found/edit/:id" element={<EditFoundItem />} />
        <Route path="/coming-soon" element={<ComingSoon />} />

      </Routes>
    </div>
  )
}

export default App;
