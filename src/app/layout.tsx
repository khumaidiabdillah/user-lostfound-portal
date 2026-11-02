import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Portal Barang Hilang & Temuan | Lost & Found Terintegrasi',
  description: 'Sistem pelaporan barang hilang dan temuan masyarakat terhubung langsung ke posko keamanan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-[#475569]">
            © {new Date().getFullYear()} Posko Keamanan Terintegrasi - Layanan Publik Barang Hilang & Temuan.
          </div>
        </footer>
      </body>
    </html>
  )
}
