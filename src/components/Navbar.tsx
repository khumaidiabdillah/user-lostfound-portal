'use client'

import Link from 'next/link'
import { Shield, Plus, Search } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-700 text-white rounded-lg flex items-center justify-center shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-bold text-[#0F172A] tracking-tight block leading-tight">
              Lost & Found
            </span>
            <span className="text-[11px] font-medium text-[#475569] block">
              Portal Laporan Barang Hilang
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-semibold text-[#475569] hover:text-[#0F172A] px-3 py-1.5 rounded-md transition-colors"
          >
            Feed Publik
          </Link>
          <Link
            href="/lapor"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-md transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Buat Laporan
          </Link>
        </div>
      </div>
    </header>
  )
}
