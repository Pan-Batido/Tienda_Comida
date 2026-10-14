import React from 'react';
import ramenBanner from '../assets/img/ramen-banner.jpg';
import snacksBanner from '../assets/img/snacks-banner.png';
import bebidasBanner from '../assets/img/bebidas-banner.jpg';

export function Carrusel({ alSeleccionarCategoria }) {
  return (
    <header id="heroCarousel" className="carousel slide mb-5 shadow rounded overflow-hidden" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
      </div>
      
      <div className="carousel-inner">
        {/* Slide 1: Comida / Ramen */}
        <div 
          className="carousel-item active position-relative text-white p-5 text-center align-content-center" 
          style={{
            minHeight: '400px',
            background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${ramenBanner}) center/cover no-repeat`
          }}
        >
          <div className="container py-4 position-relative">
            <h1 className="display-4 fw-bold text-shadow">Ramen</h1>
            <p className="lead fw-normal text-light fs-5">Deliciosos fideos instantáneos.</p>
          </div>
        </div>

        {/* Slide 2: Snacks */}
        <div 
          className="carousel-item position-relative text-white p-5 text-center align-content-center" 
          style={{
            minHeight: '400px',
            background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${snacksBanner}) center/cover no-repeat`
          }}
        >
          <div className="container py-4 position-relative">
            <h1 className="display-4 fw-bold text-shadow">Snacks & Dulces Japoneses</h1>
            <p className="lead fw-normal text-light fs-5">Pockys, mochis, dorayakis y los mejores bocadillos crujientes de Asia.</p>
          </div>
        </div>

        {/* Slide 3: Bebidas */}
        <div 
          className="carousel-item position-relative text-white p-5 text-center align-content-center" 
          style={{
            minHeight: '400px',
            background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${bebidasBanner}) center/cover no-repeat`
          }}
        >
          <div className="container py-4 position-relative">
            <h1 className="display-4 fw-bold text-shadow">Bebidas, Milk & Tea</h1>
            <p className="lead fw-normal text-light fs-5">Refréscate con las mejores bebidas de Asia</p>
          </div>
        </div>
      </div>
      
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </header>
  );
}

export default Carrusel;