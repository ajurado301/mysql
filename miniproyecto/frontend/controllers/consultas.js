//*****************************************************
// GET media
//*****************************************************
function getMedia() {
    let id = $('#alumno-consulta').val().trim();
    if (id.length == 0) {
        let cuerpo = 'Es necesario el id del alumno';
        mostrarToast('alert', cuerpo);
    }else {
        let urlMedia = urlBase + `/media?id=${id}`;
        let parametros = { headers: headers, method: 'GET' };
        fetch(urlMedia, parametros)
        .then((resultado) => {
            return resultado.json()
        })
        .then((respuesta) => {
            if (!respuesta.ok) {
                mostrarToast('alert', respuesta.message)
            }else {
                mostrarMediaAlumno(respuesta.resultado)
            }
        })
        .catch((error) => {
            mostrarToast('error', error.message)
        })
    }
}
//*****************************************************
// Fin GET media
//*****************************************************

//*****************************************************
// GET apuntadas
//*****************************************************
function getApuntadas() {
    let urlApuntadas = urlBase + '/apuntadas'
    let id = $('#alumno-consulta').val().trim();
    if (id.length > 0) {
        urlApuntadas += `?id=${id}`
    };
    let parametros = { headers: headers, method: 'GET' };
    fetch(urlApuntadas, parametros)
    .then((resultado) => {
        return resultado.json();
    })
    .then((respuesta) => {
        if (respuesta.ok) {
            mostrarToast('ok', respuesta.message);
            if (respuesta.resultado[0].student_id) {
                mostrarApuntadasAlumno(respuesta.resultado)
            }else {
                mostrarApuntadasTodos(respuesta.resultado)
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
// Fin GET apuntadas
//*****************************************************

//*****************************************************
// GET impartidas
//*****************************************************
function getImpartidas() {
    let urlImpartidas = urlBase + '/impartidas'
    let id = $('#profesor-consulta').val().trim();
    if (id.length > 0) {
        urlImpartidas += `?id=${id}`
    };
    let parametros = { headers: headers, method: 'GET' };
    fetch(urlImpartidas, parametros)
    .then((resultado) => {
        return resultado.json();
    })
    .then((respuesta) => {
        if (respuesta.ok) {
            mostrarToast('ok', respuesta.message);
            if (respuesta.resultado[0].teacher_id) {
                mostrarImpartidasProfesor(respuesta.resultado)
            }else {
                mostrarImpartidasTodos(respuesta.resultado)
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
// Fin GET impartidas
//*****************************************************

//***************************************************************************
// Mostrar media de notas de un alumnos
//***************************************************************************
function mostrarMediaAlumno(resultado) {
    $('#consultas-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">#Alumno</th><th scope="col">Nota media</th></tr></thead><tbody>';
    resultadoHTML += `<tr><th scope="row">${resultado.student_id}</th><td>${resultado.nota_media}</td></tr>`;
    resultadoHTML += '</tbody>'
    tablaResultado.append(resultadoHTML);
}
//***************************************************************************
// Fin Mostrar media de notas de un alumnos
//***************************************************************************

//***************************************************************************
// Mostrar asignaturas apuntadas de un alumno
//***************************************************************************
function mostrarApuntadasAlumno(resultado) {
    $('#consultas-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">#Alumno</th><th scope="col">Asignatura</th></tr></thead><tbody>';
    resultado.forEach((apuntada) => {
        resultadoHTML += `<tr><th scope="row">${apuntada.student_id}</th><td>${apuntada.title}</td></tr>`;
    });
    resultadoHTML += '</tbody>'
    tablaResultado.append(resultadoHTML);
}
//***************************************************************************
// Fin Mostrar asignaturas apuntadas de un alumno
//***************************************************************************

//***************************************************************************
// Mostrar asignaturas apuntadas de todos los alumnos
//***************************************************************************
function mostrarApuntadasTodos(resultado) {
    $('#consultas-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">Nombre alumno</th><th scope="col">Apellidos alumno</th><th scope="col">Asignatura</th></tr></thead><tbody>';
    resultado.forEach((apuntada) => {
        resultadoHTML += `<tr><td>${apuntada.first_name}</td><td>${apuntada.last_name}</td><td>${apuntada.title}</td></tr>`;
    });
    resultadoHTML += '</tbody>'
    tablaResultado.append(resultadoHTML);
}
//***************************************************************************
// Fin Mostrar asignaturas apuntadas de todos los alumnos
//***************************************************************************

//***************************************************************************
// Mostrar asignaturas impartidas por un profesor
//***************************************************************************
function mostrarImpartidasProfesor(resultado) {
    $('#consultas-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">#Profesor</th><th scope="col">Asignatura</th></tr></thead><tbody>';
    resultado.forEach((impartida) => {
        resultadoHTML += `<tr><th scope="row">${impartida.teacher_id}</th><td>${impartida.title}</td></tr>`;
    });
    resultadoHTML += '</tbody>'
    tablaResultado.append(resultadoHTML);
}
//***************************************************************************
// Fin Mostrar asignaturas impartidas por un profesor
//***************************************************************************

//***************************************************************************
// Mostrar asignaturas impartidas por todos los profesores
//***************************************************************************
function mostrarImpartidasTodos(resultado) {
    $('#consultas-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">Nombre profesor</th><th scope="col">Apellidos profesor</th><th scope="col">Asignatura</th></tr></thead><tbody>';
    resultado.forEach((impartida) => {
        resultadoHTML += `<tr><td>${impartida.first_name}</td><td>${impartida.last_name}</td><td>${impartida.title}</td></tr>`;
    });
    resultadoHTML += '</tbody>'
    tablaResultado.append(resultadoHTML);
}
//***************************************************************************
// Fin Mostrar asignaturas impartidas por todos los profesores
//***************************************************************************
