'use client'

import { useState } from 'react'
import { PublicReport } from '@/lib/types'
import ReportCard from '@/components/ReportCard'
import Link from 'next/link'
import { Search, Plus, Filter, ShieldCheck, MapPin } from 'lucide-react'

const KATEGORI_LIST = ['Semua', 'Dompet', 'HP/Elektronik', 'Kunci', 'Dokumen', 'Lainnya']

export default function HomeFeedClient({
  initialReports,
}: {
  initialReports: PublicReport[]
}) {
  const [reports] = useState<PublicReport[]>(initialReports)
  const [search, setSearch] = useState('')
  const [selectedKategori, setSelectedKategori] = useState('Semua')
  const [selectedJenis, setSelectedJenis] = useState<'Semua' | 'Kehilangan' | 'Temuan'>('Semua')

  const filteredReports = reports.filter((report) => {
    const matchSearch =
      report.nama_barang.toLowerCase().includes(search.toLowerCase()) ||
      report.lokasi.toLowerCase().includes(search.toLowerCase()) ||
      (report.deskripsi && report.deskripsi.toLowerCase().includes(search.toLowerCase()))

    const matchKategori =
      selectedKategori === 'Semua' ? true : report.kategori === selectedKategori

    const matchJenis =
      selectedJenis === 'Semua' ? true : report.jenis_laporan === selectedJenis

    return matchSearch && matchKategori && matchJenis
  })

  return (
    <div className="space-y-8">
      {/* Hero Banner Enterprise Light */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Terhubung Langsung dengan Posko Keamanan
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Pusat Informasi & Penanganan Barang Hilang
          </h1>
          <p className="text-sm text-[#475569] leading-relaxed">
            Laporkan barang Anda yang tertinggal atau laporkan barang temuan untuk segera diverifikasi oleh petugas posko resmi.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/lapor"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Buat Laporan Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          {/* Real-time search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama barang, ciri-ciri, atau lokasi kejadian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-[#0F172A] shadow-xs"
            />
          </div>

          {/* Jenis Laporan Switch */}
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg shadow-xs">
            {(['Semua', 'Kehilangan', 'Temuan'] as const).map((jenis) => (
              <button
                key={jenis}
                onClick={() => setSelectedJenis(jenis)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  selectedJenis === jenis
                    ? 'bg-blue-700 text-white'
                    : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                }`}
              >
                {jenis}
              </button>
            ))}
          </div>
        </div>

        {/* Kategori Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {KATEGORI_LIST.map((kat) => (
            <button
              key={kat}
              onClick={() => setSelectedKategori(kat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap border ${
                selectedKategori === kat
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'bg-white text-[#475569] border-slate-200 hover:border-slate-300'
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Counter */}
      <div className="flex items-center justify-between text-xs text-[#475569] pt-1">
        <span>
          Menampilkan <strong className="text-[#0F172A] tabular-nums">{filteredReports.length}</strong> laporan
        </span>
      </div>

      {/* Grid of Report Cards */}
      {filteredReports.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-xs">
          <div className="max-w-sm mx-auto space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-[#0F172A]">Tidak Ada Laporan yang Ditemukan</h3>
            <p className="text-xs text-[#475569]">
              Coba sesuaikan kata kunci pencarian atau filter kategori Anda.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  )
}
