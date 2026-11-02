export type Kategori = 'Dompet' | 'HP/Elektronik' | 'Kunci' | 'Dokumen' | 'Lainnya'

export type StatusPublik =
  | 'Menunggu Verifikasi'
  | 'Diproses Posko'
  | 'Ditemukan'
  | 'Selesai / Kembali ke Pemilik'
  | 'Ditolak'

export type JenisLaporan = 'Kehilangan' | 'Temuan'

export interface PublicReport {
  id: string
  jenis_laporan: JenisLaporan
  nama_barang: string
  kategori: Kategori
  foto_barang_url: string | null
  lokasi: string
  tanggal_kejadian: string
  no_wa_pelapor: string | null
  deskripsi: string
  status_publik: StatusPublik
  created_at: string
}
