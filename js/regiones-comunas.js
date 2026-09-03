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

    // 1. Validar que ambos elementos existan en el DOM
    if (!selectRegion || !selectComuna) return;

    // 2. Obtener el índice de la región seleccionada
    const regionIndex = selectRegion.value;

    // 3. Limpiar las comunas anteriores
    selectComuna.innerHTML = '<option value="">-- Seleccione una Comuna --</option>';

    // 4. Cargar las nuevas comunas si se eligió una región válida
    if (regionIndex !== "" && datosUbicacion[regionIndex]) {
        const comunas = datosUbicacion[regionIndex].comunas; // Nombre en plural
        
        comunas.forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            selectComuna.appendChild(option);
        });
    }
}