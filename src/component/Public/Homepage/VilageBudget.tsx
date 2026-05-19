import { ArrowRightIcon } from "flowbite-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const resident: HomeSection = {
    title: "APB Desa",
    subtitle: "Akses cepat dan transparan terhadap APB Desa serta proyek pembangunan."
}

// Data Contoh pendapatan vs belanja Belanja Desa
const dataAPBDesa = [
    { tahun: "2023", pendapatan: 520, belanja: 440 },
    { tahun: "2024", pendapatan: 680, belanja: 450 },
    { tahun: "2025", pendapatan: 750, belanja: 690 },
];


function VillageBudgetComponent() {
    // Fungsi pemformat angka rupiah singkat (Juta)
    const formatRupiahSingkat = (value: number) => `${value} Jt`;

    return (
        <div className="w-full">
            <div className="bg-white py-16 sm:py-48 dark:bg-green-700">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="w-full">
                        <div className="w-full lg:flex-auto text-center lg:text-left">
                            <h2 className="text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-green-900 sm:text-5xl dark:text-white">
                                {resident.title}
                            </h2>
                            <div className="my-2 text-gray-600 dark:text-gray-300">
                                <div className="text-base lg:text-xl">{resident.subtitle}</div>
                            </div>
                        </div>
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                            <div className="w-full h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={dataAPBDesa}
                                        margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="tahun"
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            tickFormatter={formatRupiahSingkat}
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#f8fafc', opacity: 0.5 }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-slate-950 text-white p-3 text-xs rounded-md shadow-md border border-slate-800 font-sans min-w-57.5">
                                                            <p className="font-bold border-b border-slate-800 pb-1 mb-1.5 text-slate-300">
                                                                {payload[0].payload.tahun}
                                                            </p>
                                                            <p className="flex justify-between gap-4">
                                                                Pendapatan: <span className="font-bold text-blue-400">Rp {payload[0].value} Jt</span>
                                                            </p>
                                                            <p className="flex justify-between gap-4 mt-1">
                                                                Belanja: <span className="font-bold text-emerald-400">Rp {payload[1].value} Jt</span>
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Legend
                                            verticalAlign="top"
                                            height={36}
                                            iconType="circle"
                                            iconSize={8}
                                            wrapperStyle={{ fontSize: '14px', fontWeight: 500, textTransform: 'capitalize' }}
                                        />

                                        {/* Batang 1: pendapatan (Biru Minimalis) */}
                                        <Bar
                                            dataKey="pendapatan"
                                            fill="#3b82f6"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={32}
                                        />

                                        {/* Batang 2: belanja (Hijau Menawan) */}
                                        <Bar
                                            dataKey="belanja"
                                            fill="#10b981"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={32}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="mt-10 lg:mt-14 flex items-center justify-center gap-x-6 lg:justify-end">
                            <Link to="/infografis/apb" className="font-semibold text-blue-700 dark:text-blue-200 hover:underline">
                                <div className="flex items-center space-x-2">
                                    <div>Lihat Data APB Desa Lebih lengkap{' '}</div>
                                    <ArrowRightIcon className="size-5" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VillageBudgetComponent;