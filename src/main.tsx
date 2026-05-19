import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './index.css'

if (import.meta.env.DEV) {
  // 1. Hapus class 'dark' dari tag HTML jika ada
  document.documentElement.classList.remove('dark');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
