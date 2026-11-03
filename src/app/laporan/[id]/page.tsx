import { supabaseUserDB } from '@/lib/supabase'
import StatusBadge from '@/components/StatusBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

import {
  ArrowLeft,
  MapPin,
  Calendar,
  MessageCircle,
  Package,
  ShieldCheck,
  Phone,
} from 'lucide-react'
import { PublicReport } from '@/lib/types'

export const dynamic = 'force-dynamic'

async function getReportDetail(id: string): Promise<PublicReport | null> {
  try {
    const { data, error } = await supabaseUserDB
      .from('public_reports')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return data as PublicReport
  } catch (err) {
    return null
  }
}

export default async function DetailLaporanPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const report = await getReportDetail(id)

  if (!report) {
    notFound()
  }

  // Format WhatsApp number
  const waFormatted = report.no_wa_pelapor
    ? report.no_wa_pelapor.replace(/^0/, '62').replace(/\D/g, '')
    : null

  const waMessage = encodeURIComponent(
    `Halo, saya melihat laporan di Portal Barang Hilang terkait: ${report.nama_barang} (${report.kategori}). Bisakah kita berkoordinasi lebih lanjut?`
  )

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#0F172A]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Daftar Laporan
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        {/* Foto Barang Section */}
        {report.foto_barang_url ? (
          <div className="w-full max-h-96 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-200">
            <img
              src={report.foto_barang_url}
              alt={report.nama_barang}
              className="w-full h-full max-h-96 object-contain bg-slate-50"
            />
          </div>
        ) : (
          <div className="p-10 bg-slate-50 border-b border-slate-200 text-center">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400">Foto barang tidak dilampirkan oleh pelapor.</p>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    report.jenis_laporan === 'Kehilangan'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {report.jenis_laporan}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  {report.kategori}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                {report.nama_barang}
              </h1>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#475569] block mb-1">Status Penanganan</span>
              <StatusBadge status={report.status_publik} />
            </div>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[#475569] block font-medium">Titik Lokasi:</span>
                <span className="font-semibold text-[#0F172A]">{report.lokasi}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <span className="text-[#475569] block font-medium">Tanggal Kejadian:</span>
                <span className="font-semibold text-[#0F172A] tabular-nums">
                  {report.tanggal_kejadian}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
              Deskripsi & Ciri-Ciri
            </h2>
            <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-line bg-white p-4 border border-slate-100 rounded-lg">
              {report.deskripsi || 'Tidak ada deskripsi rinci.'}
            </p>
          </div>

          {/* WhatsApp Direct Integration Button */}
          {waFormatted && (
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="text-xs text-[#475569]">
                Ingin berkoordinasi langsung dengan pihak pelapor / penemu barang ini?
              </div>
              <a
                href={`https://wa.me/${waFormatted}?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                Hubungi via WhatsApp ({report.no_wa_pelapor})
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
