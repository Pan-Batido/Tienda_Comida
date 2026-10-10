import React from 'react';

export function FiltroCategorias({ categoriaActiva, alSeleccionarCategoria }) {
  const categorias = ['Todos', 'Comida', 'Snacks', 'Bebidas'];

  return (
    <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
      {categorias.map((cat) => (
        <button
          key={cat}
          className={`btn ${
            categoriaActiva === cat
              ? 'btn-sakura fw-bold'
              : 'btn-outline-sakura'
          }`}
          onClick={() => alSeleccionarCategoria(cat)}
        >
          {cat === 'Todos' ? '🌸 Todos' : cat}
        </button>
      ))}
    </div>
  );
}