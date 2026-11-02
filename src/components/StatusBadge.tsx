import { StatusPublik } from '@/lib/types'

export default function StatusBadge({ status }: { status: StatusPublik | string }) {
  let colorStyles = 'bg-slate-100 text-slate-700 border-slate-200'

  switch (status) {
    case 'Menunggu Verifikasi':
      colorStyles = 'bg-amber-50 text-amber-800 border-amber-200'
      break
    case 'Diproses Posko':
      colorStyles = 'bg-blue-50 text-blue-700 border-blue-200'
      break
    case 'Ditemukan':
      colorStyles = 'bg-emerald-50 text-emerald-800 border-emerald-200'
      break
    case 'Selesai / Kembali ke Pemilik':
      colorStyles = 'bg-green-50 text-green-800 border-green-200'
      break
    case 'Ditolak':
      colorStyles = 'bg-rose-50 text-rose-700 border-rose-200'
      break
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${colorStyles}`}
    >
      {status}
    </span>
  )
}
