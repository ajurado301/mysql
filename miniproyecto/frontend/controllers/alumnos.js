//*****************************************************
// GET alumno
//*****************************************************
function getAlumno() {
    let urlAlumnos = urlBase + '/alumnos';
    let id = $('#id-alumno').val();    
    if (id.length > 0) {
        urlAlumnos += `?id=${id}`
    };
    let parametros = { headers: headers, method: 'GET' };
    fetch(urlAlumnos, parametros)
    .then((resultado) => {
        return resultado.json()
    })
    .then((respuesta) => {
        if (respuesta.ok) {
            mostrarToast('ok', respuesta.message);
            if (respuesta.resultado.length > 0) {
                mostrarListadoAlumnos(respuesta.resultado)
            }else {
                llenarFormAlumnos(respuesta.resultado)
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
function postAlumno() {
    let alumno = leerAlumnosForm();
    let cuerpo = validarAlumnosForm(alumno);
    if (cuerpo == '') {
        let urlgrupos = urlBase + `/grupos?id=${alumno.group_id}`;
        let parametros = { headers: headers, method: 'GET' };
        fetch(urlgrupos, parametros)
        .then((resultado) => {
            return resultado.json();
        })
        .then((respuesta) => {
            if (!respuesta.ok) {
                mostrarToast('alert', respuesta.message)
            }else {
                let urlAlumnos = urlBase + `/alumnos`;
                let parametros = { headers: headers, body: JSON.stringify(alumno), method: 'POST' };
                fetch(urlAlumnos, parametros)
                .then((resultado) => {
                    return resultado.json();
                })
                .then((respuesta) => {
                    let tipo = (respuesta.ok) ? 'ok' : 'alert';                    
                    mostrarToast(tipo, respuesta.message);
                    $('#alumnos-form').trigger('reset');
                })
            }
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
function putAlumno() {
    let id = $('#id-alumno').val().trim();
    if (id.length == 0){
        let cuerpo = 'Es necesario el id del alumno';
        mostrarToast('alert', cuerpo);
    }else{
        let alumno = leerAlumnosForm();            
        let cuerpo = validarAlumnosForm(alumno);
        if (cuerpo == '') {
            alumno.id = id;
            let urlgrupos = urlBase + `/grupos?id=${alumno.group_id}`;
            let parametros = { headers: headers, method: 'GET' };
            fetch(urlgrupos, parametros)
            .then((resultado) => {
                return resultado.json();
            })
            .then((respuesta) => {
                if (!respuesta.ok) {
                    mostrarToast('alert', respuesta.message)
                }else {
                    let urlAlumnos = urlBase + `/alumnos`;
                    let parametros = { headers: headers, body: JSON.stringify(alumno), method: 'PUT' };
                    fetch(urlAlumnos, parametros)
                    .then((resultado) => {
                        return resultado.json();
                    })
                    .then((respuesta) => {
                        let tipo = 'alert';
                        if (respuesta.ok) { 
                            tipo = 'ok';
                            $('#alumnos-form').trigger('reset');
                            $('#tabla-resultados').html('');
                        };
                        mostrarToast(tipo, respuesta.message);
                    })
                }
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
function deleteAlumno() {
    let id = $('#id-alumno').val().trim();
    if (id.length == 0) {
        let cuerpo = 'Es necesario el id del alumno';
        mostrarToast('alert', cuerpo);
    }else {
        let urlAlumnos = urlBase + `/alumnos`;
        let parametros = {
            headers: headers,
            body: JSON.stringify({ id: id }),
            method: "DELETE"
        };
        fetch(urlAlumnos, parametros)
        .then((resultado) => {
            return resultado.json()
        })
        .then((respuesta) => {
            let tipo = 'alert';
            if (respuesta.ok) { 
                tipo = 'ok';
                $('#alumnos-form').trigger('reset');
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
// Leer alumno del formulario y devolver json
//*****************************************************
function leerAlumnosForm() {
    let result = {
        first_name: $('#nombre-alumno').val().trim(),
        last_name: $('#apellidos-alumno').val().trim(),
        group_id: $('#grupo-alumno').val().trim()
    };
    return result;
}
//*****************************************************
// Fin Leer alumno del formulario y devolver json
//*****************************************************

//*****************************************************
// Validar formulario y devolver cadena de validacióm
//*****************************************************
function validarAlumnosForm(alumno) {
    let result = '';
    let { first_name, last_name, group_id } = alumno;
    result += (first_name == '') ? 'Nombre' : '';
    result += (last_name == '' && result != '') ? ' / Apellidos' : (last_name == '') ? 'Apellidos' : '';
    result += (group_id == '' && result != '') ? ' / Id grupo' : (group_id == '') ? 'Id grupo' : '';
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
function mostrarListadoAlumnos(resultado) {
    $('#alumnos-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">#</th><th scope="col">Nombre</th><th scope="col">Apellidos</th>' +
                        '<th scope="col">#Grupo</th></tr></thead><tbody>';
    resultado.forEach((alumno) => {
        resultadoHTML += `<tr onclick="seleccionaResultado('#id-alumno', ${alumno.student_id})" class="fila-resultados">`;
        resultadoHTML += `<th scope="row">${alumno.student_id}</th><td>${alumno.first_name}</td>`;
        resultadoHTML += `<td>${alumno.last_name}</td><td>${alumno.group_id}</td></tr>`
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
function llenarFormAlumnos(resultado) {
    $('#tabla-resultados').html('');
    $('#nombre-alumno').val(resultado.first_name);
    $('#apellidos-alumno').val(resultado.last_name);
    $('#grupo-alumno').val(resultado.group_id);
    $('#id-alumno').val(resultado.student_id);
}
//***************************************************************************
// Fin Llenar formulario alumno
//***************************************************************************