import Link from 'next/link'
import { notFound } from 'next/navigation'
import { reseptler } from '../../data'
import ReseptDetallari from '../../../components/ReseptDetallari'

const API = 'https://www.themealdb.com/api/json/v1/1'

export function generateStaticParams() {
  return reseptler.map((resept) => ({ id: resept.id }))
}

export default async function ReseptDetalSehifesi({ params }) {
  const { id } = await params
  let resept = reseptler.find((item) => item.id === id)

  // Yerli resept tapılmasa, TheMealDB-dən ID ilə resept yükləyirik.
  if (!resept) {
    const response = await fetch(`${API}/lookup.php?i=${encodeURIComponent(id)}`, { next: { revalidate: 3600 } })
    if (!response.ok) throw new Error('Resept məlumatını internetdən yükləmək alınmadı.')
    const data = await response.json()
    const meal = data.meals?.[0]
    if (!meal) notFound()

    const inqrediyentler = []
    for (let i = 1; i <= 20; i += 1) {
      const ad = meal[`strIngredient${i}`]?.trim()
      const olcu = meal[`strMeasure${i}`]?.trim()
      if (ad) inqrediyentler.push({ ad, miqdar: null, olcu: olcu || '' })
    }

    resept = {
      id: meal.idMeal,
      ad: meal.strMeal,
      kateqoriya: meal.strCategory || 'Onlayn resept',
      muddet: meal.strArea || 'TheMealDB',
      tesvir: 'TheMealDB-dən internet vasitəsilə yüklənmiş resept.',
      sekil: meal.strMealThumb,
      inqrediyentler,
      addimlar: (meal.strInstructions || '').split(/\r?\n/).map((step) => step.trim()).filter(Boolean),
    }
  }

  return (
    <article className="detail">
      <Link href="/reseptler" className="back-link">← Bütün reseptlərə qayıt</Link>
      <header>
        <p className="eyebrow">{resept.kateqoriya} · {resept.muddet}</p>
        <h1>{resept.ad}</h1>
        <p className="detail-description">{resept.tesvir}</p>
      </header>
      {resept.sekil ? <img className="detail-photo" src={resept.sekil} alt={resept.ad} /> : null}
      <ReseptDetallari resept={resept} />
    </article>
  )
}
