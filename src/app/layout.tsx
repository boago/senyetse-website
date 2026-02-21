import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import MembersDropdown from '@/components/MembersDropdown';

export const metadata: Metadata = {
  title: 'Senyetse Choir | Setswana Heritage Through Song & Dance',
  description: 'Senyetse is a cultural organization preserving and promoting Setswana heritage through traditional singing and dance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-pattern min-h-screen flex flex-col">
        <header className="bg-senyetse-dark text-senyetse-cream shadow-lg sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition group">
              <div className="logo-container h-16 w-16 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/logo.png" 
                  alt="Senyetse Choir Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-display font-bold text-senyetse-gold hover:text-senyetse-terracotta transition">
                Senyetse Choir
              </span>
            </Link>
            <ul className="flex gap-6 text-sm font-medium">
              <li><Link href="/" className="hover:text-senyetse-gold transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-senyetse-gold transition">About</Link></li>
              <li><Link href="/news" className="hover:text-senyetse-gold transition">News</Link></li>
              <li><Link href="/events" className="hover:text-senyetse-gold transition">Events</Link></li>
              <MembersDropdown />
              <li><Link href="/gallery" className="hover:text-senyetse-gold transition">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-senyetse-gold transition">Contact</Link></li>
              <li><Link href="/admin" className="text-senyetse-gold hover:text-senyetse-terracotta transition">Admin</Link></li>
            </ul>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-senyetse-dark text-senyetse-cream py-8 mt-auto">
          <div className="container mx-auto px-4 text-center text-sm opacity-90">
            <p>© {new Date().getFullYear()} Senyetse Choir. Preserving Setswana heritage through song and dance.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
