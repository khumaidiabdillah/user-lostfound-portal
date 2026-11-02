'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitPublicReportAction } from './actions'
import { JenisLaporan, Kategori } from '@/lib/types'
import { ArrowLeft, UploadCloud, CheckCircle2, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default function LaporPage() {
  const router = useRouter()
  const [jenisLaporan, setJenisLaporan] = useState<JenisLaporan>('Kehilangan')
  const [namaBarang, setNamaBarang] = useState('')
  const [kategori, setKategori] = useState<Kategori>('Dompet')
  const [fotoBarangUrl, setFotoBarangUrl] = useState('')
  const [lokasi, setLokasi] = useState('')
  const [tanggalKejadian, setTanggalKejadian] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [noWaPelapor, setNoWaPelapor] = useState('')
  const [deskripsi, setDeskripsi] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFotoBarangUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const res = await submitPublicReportAction({
      jenisLaporan,
      namaBarang,
      kategori,
      fotoBarangUrl,
      lokasi,
      tanggalKejadian,
      noWaPelapor,
      deskripsi,
    })

    setIsSubmitting(false)

    if (res.success) {
      setMessage({
        type: 'success',
        text: 'Laporan Anda berhasil dikirim ke sistem! Petugas posko akan segera memverifikasinya.',
      })
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      setMessage({
        type: 'error',
        text: res.error || 'Terjadi kendala saat mengirim laporan.',
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#475569] hover:text-[#0F172A]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Feed Publik
        </Link>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Formulir Laporan Barang
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-1">
            Isi rincian barang sejelas mungkin agar mempermudah verifikasi dan pencocokan oleh petugas posko.
          </p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-lg text-xs font-semibold ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Jenis Laporan Switcher */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-2">
              Jenis Laporan *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center p-3 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                  jenisLaporan === 'Kehilangan'
                    ? 'bg-rose-50 border-rose-500 text-rose-700'
                    : 'bg-white border-slate-200 text-[#475569] hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="jenisLaporan"
                  value="Kehilangan"
                  checked={jenisLaporan === 'Kehilangan'}
                  onChange={() => setJenisLaporan('Kehilangan')}
                  className="sr-only"
                />
                Saya Kehilangan Barang
              </label>

              <label
                className={`flex items-center justify-center p-3 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${
                  jenisLaporan === 'Temuan'
                    ? 'bg-blue-50 border-blue-600 text-blue-700'
                    : 'bg-white border-slate-200 text-[#475569] hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="jenisLaporan"
                  value="Temuan"
                  checked={jenisLaporan === 'Temuan'}
                  onChange={() => setJenisLaporan('Temuan')}
                  className="sr-only"
                />
                Saya Menemukan Barang
              </label>
            </div>
          </div>

          {/* Nama Barang */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
              Nama Barang *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Dompet Kulit Panjang Warna Cokelat"
              value={namaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-[#0F172A]"
            />
          </div>

          {/* Kategori & Tanggal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                Kategori Barang *
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as Kategori)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-[#0F172A]"
              >
                <option value="Dompet">Dompet</option>
                <option value="HP/Elektronik">HP / Elektronik</option>
                <option value="Kunci">Kunci Kendaraan / Rumah</option>
                <option value="Dokumen">Dokumen (KTP, SIM, STNK)</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                Tanggal Kejadian *
              </label>
              <input
                type="date"
                required
                value={tanggalKejadian}
                onChange={(e) => setTanggalKejadian(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-[#0F172A] tabular-nums"
              />
            </div>
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
              Lokasi Perkiraan / Titik Kejadian *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Musholla Lantai 2 / Area Kantin Utama"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-[#0F172A]"
            />
          </div>

          {/* Nomor WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
              Nomor WhatsApp Pelapor *
            </label>
            <input
              type="tel"
              required
              placeholder="Contoh: 081234567890"
              value={noWaPelapor}
              onChange={(e) => setNoWaPelapor(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-[#0F172A]"
            />
            <p className="text-[11px] text-[#475569] mt-1">
              Nomor ini digunakan untuk tombol kontak WhatsApp langsung jika barang Anda teridentifikasi.
            </p>
          </div>

          {/* Upload Foto Barang */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
              Foto Barang (Opsional namun sangat disarankan)
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-slate-300 transition-colors bg-[#F8FAFC]">
              {fotoBarangUrl ? (
                <div className="space-y-3">
                  <img
                    src={fotoBarangUrl}
                    alt="Preview"
                    className="max-h-48 mx-auto rounded-md object-contain border border-slate-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setFotoBarangUrl('')}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Hapus / Ganti Foto
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-2">
                  <UploadCloud className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-semibold text-blue-700">
                    Klik untuk unggah foto dari perangkat
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Format JPG, PNG (Maks 2MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="sr-only"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
              Ciri-Ciri Khusus / Deskripsi Lengkap *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Sebutkan ciri khas unik, merk, gantungan kunci, isi di dalamnya, atau tanda goresan agar memudahkan petugas..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-[#0F172A]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors shadow-xs disabled:opacity-60"
            >
              {isSubmitting ? 'Mengirim Laporan...' : 'Kirim Laporan ke Posko'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
