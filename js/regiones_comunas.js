// Arreglo de datos de Regiones y Comunas de Chile
const datosUbicacion  = [
    {
        region: "Región Metropolitana de Santiago",
        comunas: ["Santiago", "Providencia", "La Florida", "Maipú", "Puente Alto", "Las Condes", "San Bernardo"]
    },
    {
        region: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana"]
    }
];
// Función para poblar las Regiones al cargar la página
function cargarRegiones(selectRegionId){
    const selectRegion = document.getElementById(selectRegionId);
    //Si selectRegion es null o undefined
    if(!selectRegion) return;

    // Limpiar opciones previas manteniendo la opción por defecto
    //.innerHTML permite leer o modificar el contenido HTML interno de un elemento de la página web.
    selectRegion.innerHTML = '<option value="">Seleccione una Región</option>';

    datosUbicacion.forEach((item, index) =>{
        const option = document.createElement('option');
        option.value = index;
        option.textContent = item.region;
        selectRegion.appendChild(option);
    });
}

// Función para actualizar las Comunas cuando cambia la Región
function actualizarComunas(selectRegionId, selectComunaId){
    const selectRegion = document.getElementById(selectRegionId);
    const selectComuna = document.getElementById(selectComunaId);
    if(!selectRegion||!selectComuna) return;

    if (regionIndex !== ""){
        const comuna = datosUbicacion[regionIndex].comunas;
        comunas.forEach(comuna => {
            const option = document.createElement('option');
            option.value= comuna;
            option.textContent = comuna;
            selectComuna.appendChild(option);
        });
    }
}