import React from 'react';

export function FiltroCategorias({
  categoriaSeleccionada,
  alSeleccionarCategoria,
  busqueda,
  alCambiarBusqueda,
  categorias = ['Todas', 'Comida', 'Snacks', 'Bebidas']
}) {
  return (
    <div className="card border-0 shadow-sm mb-4 p-3 bg-light rounded-3">
      <div className="row g-3 align-items-center">
        {/* Campo de Búsqueda por Texto */}
        <div className="col-12 col-md-5">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Buscar producto por nombre..."
              value={busqueda}
              onChange={(e) => alCambiarBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                className="btn btn-outline-secondary border-start-0"
                type="button"
                onClick={() => alCambiarBusqueda('')}
                title="Limpiar búsqueda"
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>
        </div>

        {/* Botones de Filtro por Categoría */}
        <div className="col-12 col-md-7">
          <div className="d-flex flex-wrap gap-2 justify-content-md-end">
            {categorias.map((cat) => {
              const esActivo = categoriaSeleccionada === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm fw-bold px-3 transition-all ${
                    esActivo
                      ? 'btn-danger shadow-sm'
                      : 'btn-outline-danger bg-white text-danger'
                  }`}
                  onClick={() => alSeleccionarCategoria(cat)}
                >
                  {cat === 'Todas' && <i className="bi bi-grid-fill me-1"></i>}
                  {cat === 'Comida' && <i className="bi bi-egg-fried me-1"></i>}
                  {cat === 'Snacks' && <i className="bi bi-cookie me-1"></i>}
                  {cat === 'Bebidas' && <i className="bi bi-cup-straw me-1"></i>}
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltroCategorias;