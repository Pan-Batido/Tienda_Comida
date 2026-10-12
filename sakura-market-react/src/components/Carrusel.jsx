import React from 'react';
import { Link } from 'react-router-dom';
import bannerRamen from '../assets/img/ramen-banner.jpg';
import bannerPocky from '../assets/img/Pocky1.webp';
import bannerBebida from '../assets/img/bebida1.jpg';

export function Carrusel() {
  return (
    <div id="carruselSakura" className="carousel slide shadow-sm mb-4" data-bs-ride="carousel">
      {/* Indicadores */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carruselSakura"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carruselSakura"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carruselSakura"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      {/* Diapositivas */}
      <div className="carousel-inner rounded-3 overflow-hidden">
        {/* Slide 1 - Ramen */}
        <div className="carousel-item active" data-bs-interval="4000">
          <img
            src={bannerRamen}
            className="d-block w-100 object-fit-cover"
            alt="Promoción Ramen Tradicional"
            style={{ height: '380px', filter: 'brightness(0.75)' }}
          />
          <div className="carousel-caption d-md-block text-start bg-dark bg-opacity-50 p-4 rounded-3">
            <h2 className="fw-bold text-white mb-2">
              🍜 Sabor Auténtico Japonés
            </h2>
            <p className="lead text-light mb-3">
              Prueba nuestras variedades de Ramen artesanal y fideos instantáneos importados.
            </p>
            <Link to="/productos" className="btn btn-danger fw-bold">
              Ver Ramen <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>

        {/* Slide 2 - Snacks / Pocky */}
        <div className="carousel-item" data-bs-interval="4000">
          <img
            src={bannerPocky}
            className="d-block w-100 object-fit-cover"
            alt="Promoción Snacks y Pocky"
            style={{ height: '380px', filter: 'brightness(0.75)' }}
          />
          <div className="carousel-caption d-md-block text-start bg-dark bg-opacity-50 p-4 rounded-3">
            <h2 className="fw-bold text-white mb-2">
              🍡 Snacks y Dulces Exclusivos
            </h2>
            <p className="lead text-light mb-3">
              Pocky de Matcha, Mochis y los aperitivos más virales de Asia directos a tu mesa.
            </p>
            <Link to="/categorias" className="btn btn-warning text-dark fw-bold">
              Explorar Snacks <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>

        {/* Slide 3 - Bebidas / Ramune */}
        <div className="carousel-item" data-bs-interval="4000">
          <img
            src={bannerBebida}
            className="d-block w-100 object-fit-cover"
            alt="Promoción Bebidas Asiáticas"
            style={{ height: '380px', filter: 'brightness(0.75)' }}
          />
          <div className="carousel-caption d-md-block text-start bg-dark bg-opacity-50 p-4 rounded-3">
            <h2 className="fw-bold text-white mb-2">
              🥤 Ramune y Bebidas Refrescantes
            </h2>
            <p className="lead text-light mb-3">
              Descubre los sabores clásicos y de edición limitada de Ramune y tés asiáticos.
            </p>
            <Link to="/ofertas" className="btn btn-success fw-bold">
              Ver Ofertas <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Controles de Navegación */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carruselSakura"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carruselSakura"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Carrusel;