'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const kecidler = [
  { href: '/', ad: 'Ana səhifə' },
  { href: '/reseptler', ad: 'Reseptlər' },
  { href: '/haqqinda', ad: 'Haqqında' },
]

export default function Navbar() {
  const pathname = usePathname()
  return (
    <header className="navbar">
      <Link href="/" className="brand"><span className="brand-mark" aria-hidden="true">✳</span> CookBook</Link>
      <nav className="nav-links" aria-label="Əsas naviqasiya">
        {kecidler.map((kecid) => {
          const aktiv = pathname === kecid.href || (kecid.href !== '/' && pathname.startsWith(`${kecid.href}/`))
          return <Link key={kecid.href} href={kecid.href} className={aktiv ? 'nav-link active' : 'nav-link'} aria-current={aktiv ? 'page' : undefined}>{kecid.ad}</Link>
        })}
      </nav>
      <Link href="/reseptler" className="nav-cta">Resept seç</Link>
    </header>
  )
}
