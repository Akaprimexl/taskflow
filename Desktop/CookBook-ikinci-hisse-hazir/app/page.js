import Link from 'next/link'
import { kateqoriyalar, reseptler } from './data'
import ReseptKart from '../components/ReseptKart'

export default function AnaSehife() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Mətbəxinizə xoş gəldiniz</p>
          <h1>Bu gün nə bişirək?</h1>
          <p>Sadə ərzaqlarla hazırlanan ləzzətli yeməkləri kəşf edin. Sevdiyiniz resepti seçin və bişirməyə başlayın.</p>
          <Link href="/reseptler" className="button">Reseptləri kəşf et <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="section" aria-labelledby="kateqoriyalar-basliq">
        <div className="section-heading"><div><p className="eyebrow">Nəyə həvəsiniz var?</p><h2 id="kateqoriyalar-basliq">Kateqoriyalar</h2></div><p>4 bölmə</p></div>
        <div className="category-grid">
          {kateqoriyalar.map((kateqoriya) => {
            const say = reseptler.filter((resept) => resept.kateqoriya === kateqoriya.ad).length
            return <Link href={`/reseptler?kateqoriya=${encodeURIComponent(kateqoriya.ad)}`} className="category-card" key={kateqoriya.ad}>
              <span className="category-icon" aria-hidden="true">{kateqoriya.ikon}</span>
              <div><h3>{kateqoriya.ad}</h3><p>{say} resept</p></div>
            </Link>
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="secimler-basliq">
        <div className="section-heading"><div><p className="eyebrow">Sizin üçün seçdik</p><h2 id="secimler-basliq">Seçilmiş reseptlər</h2></div><Link className="text-link" href="/reseptler">Hamısına bax →</Link></div>
        <div className="recipe-grid">{reseptler.slice(0, 3).map((resept) => <ReseptKart key={resept.id} resept={resept} />)}</div>
      </section>
    </>
  )
}
