import Link from 'next/link'
import { reseptler } from '../data'
import ReseptKart from '../../components/ReseptKart'

const API = 'https://www.themealdb.com/api/json/v1/1'

export default async function ReseptlerSehifesi({ searchParams }) {
  const params = await searchParams
  const kateqoriya = params?.kateqoriya
  const sorqu = params?.q?.trim() || ''
  const yerliSiyahi = kateqoriya ? reseptler.filter((resept) => resept.kateqoriya === kateqoriya) : reseptler
  let siyahi = yerliSiyahi
  let apiXetasi = false

  if (sorqu) {
    try {
      const response = await fetch(`${API}/search.php?s=${encodeURIComponent(sorqu)}`, { next: { revalidate: 3600 } })
      if (!response.ok) throw new Error('API cavab vermədi')
      const data = await response.json()
      siyahi = (data.meals || []).map((meal) => ({
        id: meal.idMeal,
        ad: meal.strMeal,
        kateqoriya: meal.strCategory || 'Onlayn resept',
        muddet: meal.strArea || 'TheMealDB',
        tesvir: 'TheMealDB-dən internet vasitəsilə tapılan resept.',
        sekil: meal.strMealThumb,
      }))
    } catch {
      apiXetasi = true
      siyahi = []
    }
  }

  return (
    <section>
      <div className="page-intro">
        <p className="eyebrow">CookBook reseptləri</p>
        <h1>{sorqu ? `İnternet axtarışı: ${sorqu}` : kateqoriya || 'Bütün reseptlər'}</h1>
        <p>{siyahi.length} {sorqu ? 'onlayn resept tapıldı' : 'resept'}</p>
      </div>
      <form className="recipe-search" action="/reseptler">
        <label htmlFor="recipe-query">İnternetdən resept axtar</label>
        <div className="search-row"><input id="recipe-query" name="q" defaultValue={sorqu} placeholder="Məsələn: chicken, pasta, soup" /><button className="button" type="submit">Axtar</button></div>
        <small>TheMealDB axtarışı üçün ingiliscə yemək adı daha çox nəticə verə bilər.</small>
      </form>
      {apiXetasi ? <div className="empty-state"><h2>İnternetə qoşulmaq mümkün olmadı</h2><p>Bağlantını yoxlayıb axtarışı yenidən et.</p></div> : null}
      {siyahi.length ? <div className="recipe-grid">{siyahi.map((resept) => <ReseptKart key={resept.id} resept={resept} />)}</div> : null}
      {!apiXetasi && sorqu && !siyahi.length ? <div className="empty-state"><h2>Resept tapılmadı</h2><p>Başqa yemək adını ingiliscə axtarmağı yoxla.</p><Link className="text-link" href="/reseptler">Yerli reseptlərə qayıt</Link></div> : null}
      {!sorqu && !siyahi.length ? <div className="empty-state"><h2>Bu kateqoriyada resept yoxdur</h2><p>Başqa kateqoriya seçə bilərsiniz.</p><Link className="text-link" href="/reseptler">Bütün reseptlərə qayıt</Link></div> : null}
      {sorqu ? <p className="api-credit">Məlumat mənbəyi: <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">TheMealDB</a></p> : null}
    </section>
  )
}
