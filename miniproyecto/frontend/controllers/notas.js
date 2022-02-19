//*****************************************************
// GET nota
//*****************************************************
function getNota() {
    let student_id = $('#alumno-nota').val().trim();
    if (student_id.length == 0){
        let cuerpo = 'Es necesario el id del alumno';
        mostrarToast('alert', cuerpo);
    }else{        
        let urlNotas = urlBase + `/notas?id=${student_id}`;
        let parametros = { headers: headers, method: 'GET' };
        fetch(urlNotas, parametros)
        .then((resultado) => {
            return resultado.json()
        })
        .then((respuesta) => {
            if (respuesta.ok) {
                mostrarToast('ok', respuesta.message);
                mostrarListadoNotas(respuesta.resultado)                        
            } else {
                mostrarToast('alert', respuesta.message)
            }
        })
        .catch((error) => {
            mostrarToast('error', error.message)
        })
    }
}
//*****************************************************
// Fin GET nota
//*****************************************************

//*****************************************************
// POST nota
//*****************************************************
function postNota() {
    let nota = leerNotasForm();
    let cuerpo = validarNotasForm(nota);
    if (cuerpo == '') {
        let urlAsignaturas = urlBase + `/asignaturas?id=${nota.subject_id}`;
        let parametros = { headers: headers, method: 'GET' };
        fetch(urlAsignaturas, parametros)
        .then((resultado) => {
            return resultado.json()
        })
        .then((respuesta) => {
            if (!respuesta.ok) {
                mostrarToast('alert', respuesta.message)
            }else {
                let urlAlumnos = urlBase + `/alumnos?id=${nota.student_id}`;
                fetch(urlAlumnos, parametros)
                .then((resultado) => {
                    return resultado.json()
                })
                .then((respuesta) => {
                    if (!respuesta.ok) {
                        mostrarToast('alert', respuesta.message)
                    }else {
                        let urlNotas = urlBase + '/notas';
                        let parametros = { headers: headers, body: JSON.stringify(nota), method: 'POST' };
                        fetch(urlNotas, parametros)
                        .then((resultado) => {
                            return resultado.json()
                        })
                        .then((respuesta) => {
                            let tipo = (respuesta.ok) ? 'ok' : 'alert';                    
                            mostrarToast(tipo, respuesta.message);
                            $('#notas-form').trigger('reset');
                        })
                    }
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
//*****************************************************
// Fin POST nota
//*****************************************************

//*****************************************************
// PUT nota
//*****************************************************
function putNota() {
    let id = $('#id-nota').val().trim();
    if (id.length == 0){
        let cuerpo = 'Es necesario el id de la nota';
        mostrarToast('alert', cuerpo);
    }else {
        let nota = leerNotasForm();
        let cuerpo = validarNotasForm(nota);
        if (cuerpo == '') {
            nota.id = id;
            let urlAsignaturas = urlBase + `/asignaturas?id=${nota.subject_id}`;
            let parametros = { headers: headers, method: 'GET' };
            fetch(urlAsignaturas, parametros)
            .then((resultado) => {
                return resultado.json()
            })
            .then((respuesta) => {
                if (!respuesta.ok) {
                    mostrarToast('alert', respuesta.message)
                }else {
                    let urlAlumnos = urlBase + `/alumnos?id=${nota.student_id}`;
                    fetch(urlAlumnos, parametros)
                    .then((resultado) => {
                        return resultado.json()
                    })
                    .then((respuesta) => {
                        if (!respuesta.ok) {
                            mostrarToast('alert', respuesta.message)
                        }else {
                            let urlNotas = urlBase + '/notas';
                            let parametros = { headers: headers, body: JSON.stringify(nota), method: 'PUT' };
                            fetch(urlNotas, parametros)
                            .then((resultado) => {
                                return resultado.json()
                            })
                            .then((respuesta) => {
                                let tipo = (respuesta.ok) ? 'ok' : 'alert';                    
                                mostrarToast(tipo, respuesta.message);
                                $('#notas-form').trigger('reset');
                            })
                        }
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
// Fin PUT nota
//*****************************************************

//*****************************************************
// DELETE nota
//*****************************************************
function deleteNota() {
    let id = $('#id-nota').val().trim();
    if (id.length == 0) {
        let cuerpo = 'Es necesario el id de la nota';
        mostrarToast('alert', cuerpo);
    }else {
        let urlNotas = urlBase + `/notas`;
        let parametros = {
            headers: headers,
            body: JSON.stringify({ id: id }),
            method: "DELETE"
        };
        fetch(urlNotas, parametros)
        .then((resultado) => {
            return resultado.json()
        })
        .then((respuesta) => {
            let tipo = 'alert';
            if (respuesta.ok) { 
                tipo = 'ok';
                $('#notas-form').trigger('reset');
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
// Fin DELETE nota
//*****************************************************

//*****************************************************
// Leer nota del formulario y devolver json
//*****************************************************
function leerNotasForm() {
    let result = {
        student_id: $('#alumno-nota').val().trim(),
        subject_id: $('#asignatura-nota').val().trim(),
        date: $('#fecha-nota').val().trim(),
        mark: $('#calificacion-nota').val().trim()
    };
    return result;
}
//*****************************************************
// Fin Leer nota del formulario y devolver json
//*****************************************************

//*****************************************************
// Validar nota y devolver cadena de validacióm
//*****************************************************
function validarNotasForm(nota) {
    let result = '';
    let { student_id, subject_id, date, mark } = nota;
    result += (date == '') ? 'Fecha' : '';
    result += (mark == '' && result != '') ? ' / Calificación' : (mark == '') ? 'Calificación' : '';
    result += (subject_id == '' && result != '') ? ' / Id asignatura' : (subject_id == '') ? 'Id asignatura' : '';
    result += (student_id == '' && result != '') ? ' / Id alumno' : (student_id == '') ? 'Id alumno' : '';
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
function mostrarListadoNotas(resultado) {
    $('#notas-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">#</th><th scope="col">#Alumno</th><th scope="col">Fecha</th>' +
                        '<th scope="col">Calificación</th><th scope="col">#Asignatura</th></tr></thead><tbody>';
    resultado.forEach((nota) => {
        resultadoHTML += `<tr onclick="seleccionaResultado('#id-nota', ${nota.mark_id})" class="fila-resultados">`;
        resultadoHTML += `<th scope="row">${nota.mark_id}</th><td>${nota.student_id}</td><td>${nota.date.substring(0, 10)}</td>`;
        resultadoHTML += `<td>${nota.mark}</td><td>${nota.subject_id}</td></tr>`
    });
    resultadoHTML += '</tbody>'
    tablaResultado.append(resultadoHTML);
}
//***************************************************************************
// Fin Mostrar listado de resultados
//***************************************************************************

//***************************************************************************
// Llenar formulario nota
//***************************************************************************
function llenarFormNotas(resultado) {
    $('#tabla-resultados').html('');
    $('#nombre-alumno').val(resultado.first_name);
    $('#apellidos-alumno').val(resultado.last_name);
    $('#grupo-alumno').val(resultado.group_id);
    $('#id-alumno').val(resultado.student_id);
}
//***************************************************************************
// Fin Llenar formulario nota
//***************************************************************************