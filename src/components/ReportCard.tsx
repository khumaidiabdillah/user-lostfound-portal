import Link from 'next/link'
import { PublicReport } from '@/lib/types'
import StatusBadge from './StatusBadge'
import { MapPin, Calendar, HelpCircle, Package } from 'lucide-react'

export default function ReportCard({ report }: { report: PublicReport }) {
  return (
    <Link
      href={`/laporan/${report.id}`}
      className="group block bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100">
        {report.foto_barang_url ? (
          <img
            src={report.foto_barang_url}
            alt={report.nama_barang}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-slate-400">
            <Package className="w-8 h-8 stroke-[1.5]" />
            <span className="text-[11px] font-medium">Foto Tidak Tersedia</span>
          </div>
        )}

        {/* Jenis Laporan Badge */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-bold shadow-xs ${
              report.jenis_laporan === 'Kehilangan'
                ? 'bg-rose-600 text-white'
                : 'bg-blue-700 text-white'
            }`}
          >
            {report.jenis_laporan}
          </span>
        </div>

        {/* Kategori Badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-slate-700 border border-slate-200 shadow-xs">
            {report.kategori}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A] group-hover:text-blue-700 transition-colors line-clamp-1">
            {report.nama_barang}
          </h3>
          <p className="text-xs text-[#475569] mt-1 line-clamp-2">
            {report.deskripsi || 'Tidak ada deskripsi detail.'}
          </p>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-[#475569]">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{report.lokasi}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 tabular-nums">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>{report.tanggal_kejadian}</span>
            </div>
            <StatusBadge status={report.status_publik} />
          </div>
        </div>
      </div>
    </Link>
  )
}
