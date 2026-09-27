import { Link } from "react-router";

function NotFound() {
  return (
    <div className="container">
      <div className="not-found">
        <span>404</span>

        <h1>
          Səhifə tapılmadı
        </h1>

        <p>
          Axtardığınız səhifə mövcud
          deyil.
        </p>

        <Link
          to="/"
          className="primary-button"
        >
          Ana səhifəyə qayıt
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
