'use server'

import { supabaseUserDB } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { JenisLaporan, Kategori } from '@/lib/types'
import { uploadLostFoundImage } from '@/lib/storage'

export async function submitPublicReportAction({
  jenisLaporan,
  namaBarang,
  kategori,
  fotoBarangUrl,
  lokasi,
  tanggalKejadian,
  noWaPelapor,
  deskripsi,
}: {
  jenisLaporan: JenisLaporan
  namaBarang: string
  kategori: Kategori
  fotoBarangUrl?: string
  lokasi: string
  tanggalKejadian: string
  noWaPelapor?: string
  deskripsi: string
}) {
  try {
    let finalImageUrl = fotoBarangUrl || null

    if (fotoBarangUrl && fotoBarangUrl.startsWith('data:image')) {
      finalImageUrl = await uploadLostFoundImage(fotoBarangUrl, jenisLaporan.toLowerCase())
    }

    const { data, error } = await supabaseUserDB
      .from('public_reports')
      .insert({
        jenis_laporan: jenisLaporan,
        nama_barang: namaBarang,
        kategori: kategori,
        foto_barang_url: finalImageUrl,
        lokasi: lokasi,
        tanggal_kejadian: tanggalKejadian,
        no_wa_pelapor: noWaPelapor || null,
        deskripsi: deskripsi,
        status_publik: 'Menunggu Verifikasi',
      })
      .select()
      .single()

    if (error) {
      console.error('Error insert to public_reports:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/')
    return { success: true, id: data.id }
  } catch (err: any) {
    console.error('Unexpected error in submitPublicReportAction:', err)
    return { success: false, error: err.message || 'Gagal mengirim laporan' }
  }
}
