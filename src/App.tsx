'use client'

import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './component/ProtectedRoute';

// Components
import ScrollToTop from './component/Public/ScrollToTop';

// Pages
import Homepage from './pages/Homepage';
import NotFound from './pages/Notfound';
import Login from './pages/Login';
import VillageProfile from './pages/VillageProfile';
import Infographic from './pages/Infographic';
import Map from './pages/Map';
import News from './pages/News';
import UmkmPage from './pages/Umkm';
import VillageDemographicSubPage from './component/Public/Infografi/VillageDemographic';
import ApbdesDesaSubPage from './component/Public/Infografi/Apbdes';
import StuntingSubPage from './component/Public/Infografi/Stunting';
import BansosSubPage from './component/Public/Infografi/Bansos';
import IdmSubPage from './component/Public/Infografi/Idm';
import SdgsSubPage from './component/Public/Infografi/Sdgs';
import Ppid from './pages/Ppid';
import Sotk from './pages/Sotk';
import Potential from './pages/Potential';
import TourismDestination from './pages/Tourism';
import ProfilDesaManager from './pages/BackOffice/VillageProfile';
import Dashboard from './pages/BackOffice/Dashboard';
import BackOffice from './pages/BackOffice';
import HomepageEdit from './pages/BackOffice/HomepageEdit';

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/profil-desa' element={<VillageProfile />} />
        <Route path="/infografis" element={<Infographic />}>
          {/* Mengalihkan /infografis langsung menuju /infografis/penduduk secara otomatis */}
          <Route index element={<Navigate to="penduduk" replace />} />

          {/* Rute halaman anak (Path relatif tanpa tanda '/' di depan) */}
          <Route path="penduduk" element={<VillageDemographicSubPage />} />
          <Route path="apbdes" element={<ApbdesDesaSubPage />} />
          <Route path="stunting" element={<StuntingSubPage />} />
          <Route path="bansos" element={<BansosSubPage />} />
          <Route path="idm" element={<IdmSubPage />} />
          <Route path="sdgs" element={<SdgsSubPage />} />
        </Route>
        <Route path="/sotk" element={<Sotk />} />
        <Route path='/peta' element={<Map />} />
        <Route path='/berita' element={<News />} />
        <Route path='/umkm-desa' element={<UmkmPage />} />
        <Route path='/ppid' element={<Ppid />} />
        <Route path='/potensi' element={<Potential />} />
        <Route path='/wisata' element={<TourismDestination />} />
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/backoffice" element={<BackOffice />} >
            <Route index element={<Dashboard />} />

            <Route path="profil-desa" element={<ProfilDesaManager />} />
            <Route path="homepage-edit" element={<HomepageEdit />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
