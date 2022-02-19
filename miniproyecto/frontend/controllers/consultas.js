//*****************************************************
// GET media
//*****************************************************
function getMedia() {
    console.log('getMedia works!')

    // let urlAsignaturas = urlBase + '/asignaturas';
    // let id = $('#id-asignatura').val();    
    // if (id.length > 0) {
    //     urlAsignaturas += `?id=${id}`
    // };
    // let parametros = { headers: headers, method: 'GET' };
    // fetch(urlAsignaturas, parametros)
    // .then((resultado) => {
    //     return resultado.json()
    // })
    // .then((respuesta) => {
    //     if (respuesta.ok) {
    //         mostrarToast('ok', respuesta.message);
    //         if (respuesta.resultado.length > 0) {
    //             mostrarListadoAsignaturas(respuesta.resultado)
    //         }else {
    //             llenarFormAsignaturas(respuesta.resultado)
    //         }
    //     }else {
    //         mostrarToast('alert', respuesta.message)    
    //     }
    // })
    // .catch((error) => {
    //     mostrarToast('error', error.message)
    // })
}
//*****************************************************
// Fin GET media
//*****************************************************

//*****************************************************
// GET apuntadas
//*****************************************************
function getApuntadas() {
    console.log('getApuntadas works!')

    // let urlAsignaturas = urlBase + '/asignaturas';
    // let id = $('#id-asignatura').val();    
    // if (id.length > 0) {
    //     urlAsignaturas += `?id=${id}`
    // };
    // let parametros = { headers: headers, method: 'GET' };
    // fetch(urlAsignaturas, parametros)
    // .then((resultado) => {
    //     return resultado.json()
    // })
    // .then((respuesta) => {
    //     if (respuesta.ok) {
    //         mostrarToast('ok', respuesta.message);
    //         if (respuesta.resultado.length > 0) {
    //             mostrarListadoAsignaturas(respuesta.resultado)
    //         }else {
    //             llenarFormAsignaturas(respuesta.resultado)
    //         }
    //     }else {
    //         mostrarToast('alert', respuesta.message)    
    //     }
    // })
    // .catch((error) => {
    //     mostrarToast('error', error.message)
    // })
}
//*****************************************************
// Fin GET apuntadas
//*****************************************************

//*****************************************************
// GET media
//*****************************************************
function getImpartidas() {
    console.log('getImpartidas works!')

    // let urlAsignaturas = urlBase + '/asignaturas';
    // let id = $('#id-asignatura').val();    
    // if (id.length > 0) {
    //     urlAsignaturas += `?id=${id}`
    // };
    // let parametros = { headers: headers, method: 'GET' };
    // fetch(urlAsignaturas, parametros)
    // .then((resultado) => {
    //     return resultado.json()
    // })
    // .then((respuesta) => {
    //     if (respuesta.ok) {
    //         mostrarToast('ok', respuesta.message);
    //         if (respuesta.resultado.length > 0) {
    //             mostrarListadoAsignaturas(respuesta.resultado)
    //         }else {
    //             llenarFormAsignaturas(respuesta.resultado)
    //         }
    //     }else {
    //         mostrarToast('alert', respuesta.message)    
    //     }
    // })
    // .catch((error) => {
    //     mostrarToast('error', error.message)
    // })
}
//*****************************************************
// Fin GET impartidas
//*****************************************************

//***************************************************************************
// Mostrar listado de resultados
//***************************************************************************
function mostrarListadoAsignaturas(resultado) {
    $('#asignaturas-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">#</th><th scope="col">Asignatura</th></tr></thead><tbody>';
    resultado.forEach((asignatura) => {
        resultadoHTML += `<tr onclick="seleccionaResultado('#id-asignatura', ${asignatura.subject_id})" class="fila-resultados">`;
        resultadoHTML += `<th scope="row">${asignatura.subject_id}</th><td>${asignatura.title}</td></tr>`;
    });
    resultadoHTML += '</tbody>'
    tablaResultado.append(resultadoHTML);
}
//***************************************************************************
// Fin Mostrar listado de resultados
//***************************************************************************
