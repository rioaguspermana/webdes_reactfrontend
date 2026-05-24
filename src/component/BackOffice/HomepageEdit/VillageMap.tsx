import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Popup, CircleMarker, useMap } from 'react-leaflet';
// Perubahan Impor: Versi 3.0.0 menggunakan default export untuk MarkerClusterGroup
import MarkerClusterGroup from 'react-leaflet-cluster';
import L, { PathOptions, LatLngExpression, divIcon, point } from 'leaflet';
import { Feature, Geometry } from 'geojson';
import { GeoSearchControl } from 'leaflet-geosearch';


// Ambil data spasial
import { dataBatasDesa, dataPetakLahan, dataJalanDesa } from '../../../data/VilllageMapData';
import { useHomepageStore } from '@/store/useHomepageSettingStore';
import { useProfileStore } from '@/store/useProfilDesa';
import { useAlertStore } from '@/store/useAlertStore';

interface JudulPetaProps {
    teks: string;
}

// Definisi tipe data untuk Titik Penanda (Interest Point)
interface InterestPoint {
    id: number;
    koordinat: LatLngExpression;
    info: string;
}

// Definisi tipe data baru hasil transformasi
interface LahanTransform {
    id: number;
    info: string;
    luas: string;
    koordinat: [number, number]; // [lat, lng] sesuai format Leaflet
}

// Data (Interest Points)
const interestPoints: InterestPoint[] = [
    { id: 1, koordinat: [-7.402, 106.545], info: "Rumah Warga A" },
    { id: 2, koordinat: [-7.404, 106.580], info: "Rumah Warga B" },
    { id: 3, koordinat: [-7.405, 106.560], info: "Rumah Warga C" },
];

function LeafletAttribution() {
    const map = useMap();

    useEffect(() => {
        if (map.attributionControl) {
            // Menimpa prefix default dengan tautan Leaflet murni tanpa menyertakan gambar bendera
            map.attributionControl.setPrefix('<a href="https://leafletjs.com/" target="_blank" rel="noopener">Leaflet</a>');
        }
    }, [map]);

    return null;
}

function JudulPeta({ teks }: JudulPetaProps): null {
    const map = useMap();

    useEffect(() => {
        // 1. Tentukan posisi kontrol di pojok kanan atas (topright)
        const controlJudul = new L.Control({ position: 'topright' });

        controlJudul.onAdd = () => {
            // 2. Buat elemen div HTML baru untuk wadah judul
            const div = L.DomUtil.create('div');

            // 3. Masukkan teks judul ke dalam elemen div tersebut
            div.innerHTML = `<h1 class="text-sm lg:text-xl font-semibold bg-white/80 px-2 rounded text-slate-600">${teks}</h1>`;

            // 4. Cegah event klik atau scroll peta tembus saat pengguna mengklik kotak judul
            L.DomEvent.disableClickPropagation(div);
            L.DomEvent.disableScrollPropagation(div);

            return div;
        };

        // 5. Pasang kontrol ke dalam sistem peta Leaflet
        controlJudul.addTo(map);

        // 6. Fungsi pembersihan (cleanup) saat komponen dibongkar
        return () => {
            controlJudul.remove();
        };
    }, [map, teks]);

    return null;
}

function CustomMapControl() {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        let drawControlInstance: any = null;
        let searchControlInstance: any = null;
        let isMounted = true;

        // Fungsi internal asinkronus untuk menjamin urutan pembuatan tombol
        const sortControlButton = async () => {
            try {
                // 1. 📐 BUAT TOMBOL RULER (Di tengah)
                // @ts-ignore
                await import('leaflet-draw');
                if (!isMounted || !map) return;

                // Buat layer penampung hasil gambar garis ukur di peta
                const drawnItems = new L.FeatureGroup();
                map.addLayer(drawnItems);

                // @ts-ignore
                if (typeof L.Control.Draw === 'function' && !drawControlInstance) {
                    // @ts-ignore
                    drawControlInstance = new L.Control.Draw({
                        position: 'topleft',
                        edit: {
                            featureGroup: drawnItems, // Mengizinkan hasil ukur dihapus/diedit [2]
                            remove: true
                        },
                        draw: {
                            // 1. Aktifkan Garis (Ukur Jarak) dengan metrik meter/km [2]
                            polyline: {
                                metric: true,
                                showLength: true, // 👈 Memunculkan teks info jarak di kursor [2]
                                shapeOptions: { color: '#2e7d32', weight: 4 }
                            },
                            // 2. Aktifkan Poligon (Ukur Luas Lahan) [1, 2]
                            polygon: {
                                metric: true,
                                showArea: true, // 👈 Memunculkan teks info luas di kursor [2]
                                showLength: true,
                                shapeOptions: { color: '#1b5e20', fillColor: '#a5d6a7' }
                            },
                            // 3. Matikan fitur menggambar lainnya yang tidak dibutuhkan [1]
                            circle: false,
                            circlemarker: false,
                            rectangle: false,
                            marker: false
                        }
                    });
                    map.addControl(drawControlInstance);
                }

                // 📡 DETEKSI EVENT: KETIKA WARGA SELESAI MENGGAMBAR / MENGUKUR [1]
                // @ts-ignore
                map.on(L.Draw.Event.CREATED, (e: any) => {
                    const layer = e.layer;
                    const type = e.layerType;

                    let teksPopup = "";

                    if (type === 'polyline') {
                        // Hitung total jarak garis dalam meter [2]
                        const koordinat = layer.getLatLngs();
                        let totalJarak = 0;
                        for (let i = 0; i < koordinat.length - 1; i++) {
                            totalJarak += koordinat[i].distanceTo(koordinat[i + 1]);
                        }
                        teksPopup = `<b>Hasil Ukur Jarak:</b><br/>${totalJarak.toFixed(2)} Meter`;
                    } else if (type === 'polygon') {
                        // Hitung total luas wilayah poligon dalam meter persegi [2]
                        const koordinat = layer.getLatLngs()[0];
                        // @ts-ignore
                        const luas = L.GeometryUtil.geodesicArea(koordinat);
                        teksPopup = `<b>Hasil Ukur Luas:</b><br/>${luas.toFixed(2)} m² <br/>(${(luas / 10000).toFixed(2)} Ha)`;
                    }

                    // Tampilkan balon informasi (Popup) tepat di titik akhir gambar [2]
                    layer.bindPopup(teksPopup).openPopup();
                    drawnItems.addLayer(layer);
                });

                // 2. BUAT TOMBOL CUSTOM Pencarian (Paling bawah)
                if (!isMounted || !map) return;
                const providerLokal = {
                    async search({ query }: { query: string }) {
                        // Proses Ekstraksi dan Transformasi Data GeoJSON ke Array Sederhana
                        const petakLahanTransform: LahanTransform[] = dataPetakLahan.features.map((feature: any, index: number) => {
                            // Ambil sepasang titik pertama dari koordinat ring Polygon [lng, lat]
                            const koordinatAwalGeoJSON = feature.geometry.coordinates[0][0];

                            return {
                                id: index + 1,
                                info: feature.properties?.nama || "Tanpa Nama",
                                luas: feature.properties?.luas || "0 Ha",
                                // Balik urutan dari GeoJSON [lng, lat] menjadi standar Leaflet [lat, lng]
                                koordinat: [koordinatAwalGeoJSON[1], koordinatAwalGeoJSON[0]]
                            };
                        });

                        // Gabung data
                        const searchData = interestPoints
                            .map(t => ({ id: t.id, info: t.info, luas: "-", koordinat: t.koordinat as [number, number] }))
                            .concat(petakLahanTransform);

                        // Filter data interestPoints berdasarkan teks input yang diketik pengguna
                        let hasilFilter = searchData.filter(titik =>
                            titik.info.toLowerCase().includes(query.toLowerCase())
                        );


                        // Format data agar sesuai dengan struktur wajib leaflet-geosearch
                        return hasilFilter.map(titik => {
                            // Jika koordinat Anda [lat, lng], pastikan struktur x dan y tepat
                            // Leaflet-geosearch membaca: x = longitude, y = latitude
                            const lat = (titik.koordinat as number[])[0];
                            const lng = (titik.koordinat as number[])[1];

                            return {
                                x: lng, // Longitude
                                y: lat, // Latitude
                                label: titik.info, // Teks yang muncul di dropdown rekomendasi
                                raw: titik
                            };
                        });
                    }
                };

                // @ts-ignore
                searchControlInstance = new GeoSearchControl({
                    provider: providerLokal, // 👈 Pakai provider lokal buatan kita di atas
                    style: 'button',
                    position: 'topleft',
                    showMarker: false, // Matikan marker default bawaan geosearch jika ingin bersih
                    autoClose: true,
                    keepResult: true,
                    searchLabel: 'Cari tempat penting...',
                });
                map.addControl(searchControlInstance);

            } catch (err) {
                console.error("Gagal memuat rangkaian kontrol peta:", err);
            }
        };

        // Jalankan fungsi inisialisasi urutan tombol
        sortControlButton();

        // Fungsi Pembersihan (Cleanup)
        return () => {
            isMounted = false;

            if (drawControlInstance && typeof drawControlInstance.remove === 'function') {
                try { map.removeControl(drawControlInstance); } catch (e) { }
            }
            if (searchControlInstance && typeof searchControlInstance.remove === 'function') {
                try { map.removeControl(searchControlInstance); } catch (e) { }
            }
        };
    }, [map]);

    return null;
}

function VillageMapComponent(): React.JSX.Element {
    const { showAlert } = useAlertStore()
    const { profilDesa } = useProfileStore();
    const { homepageSetting, updateFieldDinamic } = useHomepageStore();
    const [editTitle, setEditTitle] = useState<boolean>(false);
    const [editSubtitle, setEditSubtitle] = useState<boolean>(false);
    const [localTitle, setLocalTitle] = useState<string>(homepageSetting?.map_title ?? '');
    const [localSubtitle, setLocalSubtitle] = useState<string>(homepageSetting?.map_subtitle ?? '');
    const titleFormRef = useRef<HTMLDivElement>(null);
    const subtitleFormRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (homepageSetting) {
            setLocalTitle(homepageSetting.map_title ?? '');
            setLocalSubtitle(homepageSetting.map_subtitle ?? '');
        }
    }, [homepageSetting]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent | PointerEvent) => {
            if (editTitle && titleFormRef.current && !titleFormRef.current.contains(event.target as Node)) {
                cancelField("map_title"); // Otomatis batal edit judul
            }
            if (editSubtitle && subtitleFormRef.current && !subtitleFormRef.current.contains(event.target as Node)) {
                cancelField("map_subtitle"); // Otomatis batal edit judul
            }
        };

        // Daftarkan event listener klik global ke dokumen peramban
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        // Bersihkan event listener saat komponen dilepas (unmount) agar tidak bocor memori
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [editTitle]);

    const saveField = async (field: 'map_title' | 'map_subtitle') => {
        try {
            if (field === 'map_title') {
                await updateFieldDinamic(field, localTitle);
                setEditTitle(false)
            } else if (field === 'map_subtitle') {
                await updateFieldDinamic(field, localSubtitle);
                setEditSubtitle(false)
            }
        } catch (err) {
            showAlert("Gagal menyimpan perubahan!", 'error', 3000);
        }
    };

    const cancelField = (field: 'map_title' | 'map_subtitle') => {
        if (homepageSetting) {
            if (field === 'map_title') {
                setLocalTitle(homepageSetting.map_title);
                setEditTitle(false)
            } else if (field === 'map_subtitle') {
                setLocalSubtitle(homepageSetting.map_subtitle);
                setEditSubtitle(false)
            }
        }
    };

    const posisiPusat: LatLngExpression = [-7.400, 106.562];

    // Fungsi untuk membuat elemen HTML lingkaran berangka
    const customIconCluster = (cluster: any) => {
        const jumlahTitik = cluster.getChildCount();

        // Tentukan kategori warna berdasarkan jumlah kepadatan titik (opsional)
        let kelasWarna = 'cluster-kecil'; // Hijau untuk jumlah sedikit
        if (jumlahTitik > 20) {
            kelasWarna = 'cluster-sedang'; // Oranye untuk jumlah sedang
        } else if (jumlahTitik > 80) {
            kelasWarna = 'cluster-besar'; // Merah untuk jumlah besar
        }

        return divIcon({
            html: `<div><span>${jumlahTitik}</span></div>`,
            className: `marker-cluster-kustom ${kelasWarna}`,
            iconSize: point(40, 40, true),
        });
    };

    // Fungsi Gaya/Styling Spasial
    const styleBatasDesa = (): PathOptions => ({
        color: '#ef4444',
        weight: 4,
        fillColor: 'transparent',
        opacity: 1,
    });

    const stylePetakLahan = (): PathOptions => ({
        color: '#ffffff',
        weight: 1,
        fillColor: '#ffffff',
        fillOpacity: 0.0,
    });

    const styleJalanDesa = (): PathOptions => ({
        color: '#f8fafc',
        weight: 2,
        opacity: 0.9,
    });

    // Fungsi Interaksi Klik Pop-up pada Fitur GeoJSON
    const onEachPetak = (feature: Feature<Geometry, any>, layer: any): void => {
        if (feature.properties && feature.properties.nama) {
            layer.bindPopup(`
        <div style="font-family: sans-serif;">
          <h4 style="margin: 0 0 5px 0; color: #16a34a;">${feature.properties.nama}</h4>
          <p style="margin: 0;">Luas: <b>${feature.properties.luas}</b></p>
        </div>
      `);
        }
    };

    return (
        <div className="w-full" >
            <div className="bg-white py-16 sm:py-40 dark:bg-green-700">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="w-full lg:flex-auto text-center lg:text-left">
                        <div className="relative group/title">
                            {editTitle ? (
                                /* MODE EDIT: INPUT JUDUL */
                                <div ref={titleFormRef} className="flex items-center gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 px-2 py-1 rounded-t">
                                    <input
                                        type="text"
                                        value={localTitle}
                                        placeholder={localTitle}
                                        onChange={(e) => setLocalTitle(e.target.value)}
                                        className="w-full text-xl lg:text-4xl font-semibold text-teal-950 dark:text-white bg-transparent focus:outline-none tracking-tight"
                                        autoFocus
                                    />
                                    {/* TOMBOL AKSI INLINE */}
                                    <div className="flex gap-1 shrink-0">
                                        <button
                                            onClick={() => saveField('map_title')}
                                            disabled={false}//isloading
                                            title="Simpan"
                                            className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => cancelField('map_title')}
                                            title="Batal"
                                            className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* MODE LIHAT: TAMPILAN TEXT + EFEK HOVER TRANSPARAN */
                                <div
                                    onClick={() => setEditTitle(true)}
                                    className={`inline-flex items-baseline gap-3 group rounded transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                >
                                    <h2 className="text-xl lg:text-4xl font-semibold text-teal-950 dark:text-white tracking-tight leading-tight flex-1">
                                        {localTitle}
                                    </h2>
                                    {/* IKON PENSIL DI UJUNG TEXT */}
                                    {true && (
                                        <span className="absolute lg:relative right-0 text-gray-300 dark:text-zinc-600 group-hover/title:text-indigo-500 p-1 transition-colors shrink-0 pt-2">
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="relative group/sub">
                            {editSubtitle ? (
                                /* MODE EDIT: TEXTAREA SUBJUDUL */
                                <div ref={subtitleFormRef} className="flex items-start gap-3 w-full border-b border-indigo-500 bg-indigo-50/30 dark:bg-zinc-800/50 px-2 py-1 rounded-t">
                                    <textarea
                                        value={localSubtitle}
                                        onChange={(e) => setLocalSubtitle(e.target.value)}
                                        rows={2}
                                        className="w-full my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none"
                                        autoFocus
                                    />
                                    {/* TOMBOL AKSI INLINE */}
                                    <div className="flex gap-1 shrink-0 pt-1">
                                        <button
                                            onClick={() => saveField('map_subtitle')}
                                            disabled={false}//isloading
                                            title="Simpan"
                                            className="p-1 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => cancelField('map_subtitle')}
                                            title="Batal"
                                            className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* MODE LIHAT: TAMPILAN TEXT SUBJUDUL + EFEK HOVER */
                                <div
                                    onClick={() => setEditSubtitle(true)}
                                    className={`flex items-start gap-3 w-full group rounded transition-all duration-200 ${true ? 'hover:opacity-65 hover:bg-gray-50 dark:hover:bg-zinc-800/30 cursor-text select-none' : ''}`}
                                >
                                    <p className="my-2 text-base lg:text-xl text-gray-600 dark:text-gray-300">
                                        {localSubtitle}
                                    </p>
                                    {/* IKON PENSIL DI UJUNG TEXT SUBJUDUL */}
                                    {true && (
                                        <span className="absolute right-0 lg:relative text-gray-300 dark:text-zinc-700 group-hover/sub:text-indigo-500 p-1 transition-colors shrink-0">
                                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='mx-auto max-w-7xl w-full h-140 lg:h-160 rounded-xl overflow-hidden isolate relative'>
                        <MapContainer
                            center={posisiPusat}
                            zoom={14}
                            className="z-0 w-full h-full bg-white"
                            scrollWheelZoom={false}
                        >
                            <JudulPeta teks={`Geospasial ${profilDesa?.nama_desa ?? ''}`} />
                            {profilDesa?.nama_desa &&
                                <LayersControl position="topright">
                                    {/* Pilihan Basemap: Google Satellite Hybrid */}
                                    <LayersControl.BaseLayer checked name="Google Satellite Hybrid">
                                        {/* Layer Utama Satelit */}
                                        <TileLayer
                                            attribution='<a href="https://google.com" target="_blank" rel="noopener">Google Maps</a>'
                                            url="http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" zIndex={1}
                                        />
                                    </LayersControl.BaseLayer>

                                    {/* Opsi peta standar sebagai pembanding */}
                                    <LayersControl.BaseLayer name="Google Maps Terrain">
                                        <TileLayer
                                            attribution='<a href="https://google.com" target="_blank" rel="noopener">Google Maps</a>'
                                            url="http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                        />
                                    </LayersControl.BaseLayer>

                                    <LayersControl.Overlay checked name="1. Batas Luar Desa">
                                        <GeoJSON data={dataBatasDesa} style={styleBatasDesa} interactive={false} />
                                    </LayersControl.Overlay>

                                    <LayersControl.Overlay checked name="2. Area Petak Lahan">
                                        <GeoJSON
                                            data={dataPetakLahan}
                                            style={stylePetakLahan}
                                            onEachFeature={onEachPetak}
                                        />
                                    </LayersControl.Overlay>

                                    <LayersControl.Overlay checked name="3. Jaringan Jalan">
                                        <GeoJSON data={dataJalanDesa} style={styleJalanDesa} interactive={false} />
                                    </LayersControl.Overlay>

                                    {/* Menambahkan Cluster Titik Penanda di Layer Terpisah */}
                                    <LayersControl.Overlay checked name="4. Titik Penting">
                                        <MarkerClusterGroup iconCreateFunction={customIconCluster}>
                                            {interestPoints.map((titik) => (
                                                <CircleMarker
                                                    key={titik.id}
                                                    center={titik.koordinat as LatLngExpression}
                                                    radius={6}
                                                    fillColor="#3b82f6"
                                                    fillOpacity={1}
                                                    color="#ffffff"
                                                    weight={2}
                                                >
                                                    <Popup>{titik.info}</Popup>
                                                </CircleMarker>
                                            ))}
                                        </MarkerClusterGroup>
                                    </LayersControl.Overlay>
                                </LayersControl>
                            }
                            <CustomMapControl />
                            <LeafletAttribution />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VillageMapComponent;
