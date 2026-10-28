'use client'

// error.js Client Component olmalıdır; reset funksiyası ilə yenidən cəhd edirik.
export default function ReseptXetasi({ error, reset }) {
  return (
    <section className="empty-state error-state" role="alert">
      <p className="eyebrow">Xəta baş verdi</p>
      <h1>Reseptləri açmaq mümkün olmadı</h1>
      <p>İnternet bağlantınızı yoxlayın və yenidən cəhd edin.</p>
      {process.env.NODE_ENV === 'development' && error?.message ? <pre>{error.message}</pre> : null}
      <button className="button" type="button" onClick={() => reset()}>Yenidən cəhd et</button>
    </section>
  )
}
