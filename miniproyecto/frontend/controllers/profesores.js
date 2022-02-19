//*****************************************************
// GET profesor
//*****************************************************
function getProfesor() {
    let urlProfesores = urlBase + '/profesores';
    let id = $('#id-profesor').val();    
    if (id.length > 0) {
        urlProfesores += `?id=${id}`
    };
    let parametros = { headers: headers, method: 'GET' };
    fetch(urlProfesores, parametros)
    .then((resultado) => {
        return resultado.json()
    })
    .then((respuesta) => {
        if (respuesta.ok) {
            mostrarToast('ok', respuesta.message);
            if (respuesta.resultado.length > 0) {
                mostrarListadoProfesores(respuesta.resultado)
            }else {
                llenarFormProfesores(respuesta.resultado)
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
// Fin GET alumno
//*****************************************************

//*****************************************************
// POST alumno
//*****************************************************
function postProfesor() {
    let profesor = leerProfesoresForm();
    let cuerpo = validarProfesoresForm(profesor);
    if (cuerpo == '') {
        let urlProfesores = urlBase + `/profesores`;
        let parametros = { headers: headers, body: JSON.stringify(profesor), method: 'POST' };
        fetch(urlProfesores, parametros)
        .then((resultado) => {
            return resultado.json();
        })
        .then((respuesta) => {
            let tipo = (respuesta.ok) ? 'ok' : 'alert';
            mostrarToast(tipo, respuesta.message);
            $('#profesores-form').trigger('reset');
        })        
        .catch((error) => {
            mostrarToast('error', error.message)
        })
    } else {
        mostrarToast('alert', cuerpo);
    }
}
//*****************************************************
// Fin POST alumno
//*****************************************************

//*****************************************************
// PUT alumno
//*****************************************************
function putProfesor() {
    let id = $('#id-profesor').val().trim();
    if (id.length == 0){
        let cuerpo = 'Es necesario el id del profesor';
        mostrarToast('alert', cuerpo);
    }else{
        let profesor = leerProfesoresForm();            
        let cuerpo = validarProfesoresForm(profesor);
        if (cuerpo == '') {
            profesor.id = id;
            let urlProfesores = urlBase + `/profesores`;
            let parametros = { headers: headers, body: JSON.stringify(profesor), method: 'PUT' };
            fetch(urlProfesores, parametros)
            .then((resultado) => {
                return resultado.json();
            })
            .then((respuesta) => {
                let tipo = 'alert';
                if (respuesta.ok) { 
                    tipo = 'ok';
                    $('#profesores-form').trigger('reset');
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
// Fin PUT alumno
//*****************************************************

//*****************************************************
// DELETE alumno
//*****************************************************
function deleteProfesor() {
    let id = $('#id-profesor').val().trim();
    if (id.length == 0) {
        let cuerpo = 'Se necesita el id del profesor';
        mostrarToast('alert', cuerpo);
    }else {
        let urlProfesores = urlBase + `/profesores`;
        let parametros = {
            headers: headers,
            body: JSON.stringify({ id: id }),
            method: "DELETE"
        };
        fetch(urlProfesores, parametros)
        .then((resultado) => {
            return resultado.json()
        })
        .then((respuesta) => {
            let tipo = 'alert';
            if (respuesta.ok) { 
                tipo = 'ok';
                $('#profesores-form').trigger('reset');
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
// Fin DELETE alumno
//*****************************************************

//*****************************************************
// Leer profesor del formulario y devolver json
//*****************************************************
function leerProfesoresForm() {
    let result = {
        first_name: $('#nombre-profesor').val().trim(),
        last_name: $('#apellidos-profesor').val().trim(),
    };
    return result;
}
//*****************************************************
// Fin Leer profesor del formulario y devolver json
//*****************************************************

//*****************************************************
// Validar formulario y devolver cadena de validacióm
//*****************************************************
function validarProfesoresForm(profesor) {
    let result = '';
    let { first_name, last_name } = profesor;
    result += (first_name == '') ? 'Nombre' : '';
    result += (last_name == '' && result != '') ? ' / Apellidos' : (last_name == '') ? 'Apellidos' : '';
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
function mostrarListadoProfesores(resultado) {
    $('#profesores-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">#</th><th scope="col">Nombre</th>' +
                        '<th scope="col">Apellidos</th></tr></thead><tbody>';
    resultado.forEach((profesor) => {
        resultadoHTML += `<tr onclick="seleccionaResultado('#id-profesor', ${profesor.teacher_id})" class="fila-resultados">`;
        resultadoHTML += `<th scope="row">${profesor.teacher_id}</th><td>${profesor.first_name}</td>`;
        resultadoHTML += `<td>${profesor.last_name}</td></tr>`
    });
    resultadoHTML += '</tbody>'
    tablaResultado.append(resultadoHTML);
}
//***************************************************************************
// Fin Mostrar listado de resultados
//***************************************************************************

//***************************************************************************
// Llenar formulario alumno
//***************************************************************************
function llenarFormProfesores(resultado) {
    $('#tabla-resultados').html('');
    $('#nombre-profesor').val(resultado.first_name);
    $('#apellidos-profesor').val(resultado.last_name);
    $('#id-profesor').val(resultado.teacher_id);
}
//***************************************************************************
// Fin Llenar formulario alumno
//***************************************************************************