'use client'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './component/ProtectedRoute';

// Components
import ScrollToTop from './component/Public/ScrollToTop';

// Pages
import Homepage from './pages/Homepage';
import NotFound from './pages/Notfound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import VillageProfile from './pages/VillageProfile';
import Map from './pages/Map';
import News from './pages/News';

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/profil-desa' element={<VillageProfile />} />
        <Route path='/peta' element={<Map />} />
        <Route path='/berita' element={<News />} />
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/backoffice" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
