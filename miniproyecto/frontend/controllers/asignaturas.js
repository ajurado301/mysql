//*****************************************************
// GET asignatura
//*****************************************************
function getAsignatura() {
    let urlAsignaturas = urlBase + '/asignaturas';
    let id = $('#id-asignatura').val();    
    if (id.length > 0) {
        urlAsignaturas += `?id=${id}`
    };
    let parametros = { headers: headers, method: 'GET' };
    fetch(urlAsignaturas, parametros)
    .then((resultado) => {
        return resultado.json()
    })
    .then((respuesta) => {
        if (respuesta.ok) {
            mostrarToast('ok', respuesta.message);
            if (respuesta.resultado.length > 0) {
                mostrarListadoAsignaturas(respuesta.resultado)
            }else {
                llenarFormAsignaturas(respuesta.resultado)
            }
        }else {
            mostrarToast('alert', respuesta.message)    
        }
    })
    .catch((error) => {
        mostrarToast('error', error.message)
    })
}
//*****************************************************
// Fin GET asignatura
//*****************************************************

//*****************************************************
// POST asignatura
//*****************************************************
function postAsignatura() {
    let asignatura = leerAsignaturasForm();
    let cuerpo = validarAsignaturasForm(asignatura);
    if (cuerpo == '') {
        let urlAsignaturas = urlBase + `/asignaturas`;
        let parametros = { headers: headers, body: JSON.stringify(asignatura), method: 'POST' };
        fetch(urlAsignaturas, parametros)
        .then((resultado) => {
            return resultado.json();
        })
        .then((respuesta) => {
            let tipo = (respuesta.ok) ? 'ok' : 'alert';
            mostrarToast(tipo, respuesta.message);
            $('#asignatura-form').trigger('reset');
        })        
        .catch((error) => {
            mostrarToast('error', error.message)
        })
    } else {
        mostrarToast('alert', cuerpo);
    }
}
//*****************************************************
// Fin POST asignatura
//*****************************************************

//*****************************************************
// PUT asignatura
//*****************************************************
function putAsignatura() {
    let id = $('#id-asignatura').val().trim();
    if (id.length == 0){
        let cuerpo = 'Es necesario el id de la asignatura';
        mostrarToast('alert', cuerpo);
    }else{
        let asignatura = leerAsignaturasForm();            
        let cuerpo = validarAsignaturasForm(asignatura);
        if (cuerpo == '') {
            asignatura.id = id;
            let urlAsignaturas = urlBase + `/asignaturas`;
            let parametros = { headers: headers, body: JSON.stringify(asignatura), method: 'PUT' };
            fetch(urlAsignaturas, parametros)
            .then((resultado) => {
                return resultado.json();
            })
            .then((respuesta) => {
                let tipo = 'alert';
                if (respuesta.ok) { 
                    tipo = 'ok';
                    $('#asignatura-form').trigger('reset');
                    $('#tabla-resultados').html('');
                };
                mostrarToast(tipo, respuesta.message);
            })
            .catch((error) => {
                mostrarToast('error', error.message)
            })
        }else {
            mostrarToast('alert', cuerpo);
        }
    }    
}
//*****************************************************
// Fin PUT asignatura
//*****************************************************

//*****************************************************
// DELETE asignatura
//*****************************************************
function deleteAsignatura() {
    let id = $('#id-asignatura').val().trim();
    if (id.length == 0) {
        let cuerpo = 'Es necesario el id de la asignatura';
        mostrarToast('alert', cuerpo);
    }else {
        let urlAsignaturas = urlBase + `/asignaturas`;
        let parametros = {
            headers: headers,
            body: JSON.stringify({ id: id }),
            method: "DELETE"
        };
        fetch(urlAsignaturas, parametros)
        .then((resultado) => {
            return resultado.json()
        })
        .then((respuesta) => {
            let tipo = 'alert';
            if (respuesta.ok) { 
                tipo = 'ok';
                $('#asignatura-form').trigger('reset');
                $('#tabla-resultados').html('');
            };            
            mostrarToast(tipo, respuesta.message);
        })
        .catch((error) => {
            mostrarToast('error', error.message)
        })
    }
}
//*****************************************************
// Fin DELETE asignatura
//*****************************************************

//*****************************************************
// Leer asignatura del formulario y devolver json
//*****************************************************
function leerAsignaturasForm() {
    let result = {
        title: $('#nombre-asignatura').val().trim(),
    };
    return result;
}
//*****************************************************
// Fin Leer asignatura del formulario y devolver json
//*****************************************************

//*****************************************************
// Validar formulario y devolver cadena de validacióm
//*****************************************************
function validarAsignaturasForm(asignatura) {
    let result = '';
    let { title } = asignatura;
    result += (title == '') ? 'Asignatura' : '';
    if (result != '') {
        result = 'Los siguientes campos son obligatorios: ' + result;
    }
    return result;
}
//*******************************************************
// Fin Validar formulario y devolver cadena de validacióm
//*******************************************************

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

//***************************************************************************
// Llenar formulario asignatura
//***************************************************************************
function llenarFormAsignaturas(resultado) {
    $('#tabla-resultados').html('');
    $('#nombre-asignatura').val(resultado.title);
    $('#id-asignatura').val(resultado.subject_id);
}
//***************************************************************************
// Fin Llenar formulario asignatura
//***************************************************************************