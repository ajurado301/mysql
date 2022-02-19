// Variables
let urlBase = 'http://localhost:3000';
let headers = { 'content-type': 'application/json; charset=UTF-8' };
let toast;
let bgToast = "bg-success";
let ultimaSeccionActiva = "alumnos";

//***************************************************************************
// Carga del DOM
//***************************************************************************
jQuery(() => {

    // Eventos enlaces
    $('#enlace-alumnos').on('click', () => {
        if (!$('#enlace-alumnos').hasClass('active')) {
            activaEnlace('alumnos');
        }
    });
    $('#enlace-profesores').on('click', () => {
        if (!$('#enlace-profesores').hasClass('active')) {
            activaEnlace('profesores');
        }
    });
    $('#enlace-asignaturas').on('click', () => {
        if (!$('#enlace-asignaturas').hasClass('active')) {
            activaEnlace('asignaturas');
        }
    });
    $('#enlace-grupos').on('click', () => {
        if (!$('#enlace-grupos').hasClass('active')) {
            activaEnlace('grupos');
        }
    });    
    $('#enlace-notas').on('click', () => {
        if (!$('#enlace-notas').hasClass('active')) {
            activaEnlace('notas');
        }
    });
    $('#enlace-consultas').on('click', () => {
        if (!$('#enlace-consultas').hasClass('active')) {
            activaEnlace('consultas');
        }
    });
    
    // Eventos botones Alumno
    // GET
    $('#btn-mostrar-alumno').on('click', () => {
        getAlumno();
    });
    // POST
    $('#btn-crear-alumno').on('click', () => {
        postAlumno();
    });
    // PUT
    $('#btn-actualizar-alumno').on('click', () => {
        putAlumno();
    });
    // DELETE
    $('#btn-eliminar-alumno').on('click', () => {
        deleteAlumno();
    });
    // Reset
    $('#btn-reiniciar-alumno').on('click', () => $('#alumnos-form').trigger('reset'));
    
    // Eventos botones profesor
    // GET
    $('#btn-mostrar-profesor').on('click', () => {
        getProfesor();
    });
    // POST
    $('#btn-crear-profesor').on('click', () => {
        postProfesor();
    });
    // PUT
    $('#btn-actualizar-profesor').on('click', () => {
        putProfesor();
    });
    // DELETE
    $('#btn-eliminar-profesor').on('click', () => {
        deleteProfesor();
    });
    // Reset
    $('#btn-reiniciar-profesor').on('click', () => $('#profesores-form').trigger('reset'));
    
    // Eventos botones asignatura
    // GET
    $('#btn-mostrar-asignatura').on('click', () => {
        getAsignatura();
    });
    // POST
    $('#btn-crear-asignatura').on('click', () => {
        postAsignatura();
    });
    // PUT
    $('#btn-actualizar-asignatura').on('click', () => {
        putAsignatura();
    });
    // DELETE
    $('#btn-eliminar-asignatura').on('click', () => {
        deleteAsignatura();
    });
    // Reset
    $('#btn-reiniciar-asignatura').on('click', () => $('#asignaturas-form').trigger('reset'));
    
    // Eventos botones grupo
    // GET
    $('#btn-mostrar-grupo').on('click', () => {
        getGrupo();
    });
    // POST
    $('#btn-crear-grupo').on('click', () => {
        postGrupo();
    });
    // PUT
    $('#btn-actualizar-grupo').on('click', () => {
        putGrupo();
    });
    // DELETE
    $('#btn-eliminar-grupo').on('click', () => {
        deleteGrupo();
    });
    // Reset
    $('#btn-reiniciar-grupo').on('click', () => $('#grupos-form').trigger('reset'));
    
    // Eventos botones nota
    // GET
    $('#btn-mostrar-nota').on('click', () => {
        getNota();
    });
    // POST
    $('#btn-crear-nota').on('click', () => {
        postNota();
    });
    // PUT
    $('#btn-actualizar-nota').on('click', () => {
        putNota();
    });
    // DELETE
    $('#btn-eliminar-nota').on('click', () => {
        deleteNota();
    });
    // Reset
    $('#btn-reiniciar-nota').on('click', () => $('#notas-form').trigger('reset'));
    
    // Eventos botones consultas
    // GET media
    $('#btn-media').on('click', () => {
        getMedia();
    });
    // GET apuntadas
    $('#btn-apuntadas').on('click', () => {
        getApuntadas();
    });
    // GET impartidas
    $('#btn-impartidas').on('click', () => {
        getImpartidas();
    });
    // Reset
    $('#btn-reiniciar-consultas').on('click', () => $('#consultas-form').trigger('reset'));
})
//***************************************************************************
// Fin Carga del DOM
//***************************************************************************

//***************************************************************************
// Activar el contenedor correspondiente y cambiar active
//***************************************************************************
function activaEnlace(enlace) {
    $('#tabla-resultados').html('');
    $('#enlace-' + ultimaSeccionActiva).removeClass('active');
    $('#' + ultimaSeccionActiva).hide();
    $('#enlace-' + enlace).addClass('active');
    $('#' + enlace).show();
    ultimaSeccionActiva = enlace;
}
//***************************************************************************
// Fin Activar el contenedor correspondiente y cambiar active
//***************************************************************************

//***************************************************************************
// Poner valor al input id al selecionar fila de resultados
//***************************************************************************
function seleccionaResultado(input, id) {
    $(input).val(id);
}
//***************************************************************************
// Fin Poner valor al input id al selecionar fila de resultados
//***************************************************************************

//***************************************************************************
// Mostrar Toast
//***************************************************************************
function mostrarToast(tipo, cuerpo) {
    if (toast) {
        toast.dispose();
    }
    let alertaToast = $('#alertaToast');
    alertaToast.toggleClass(bgToast);
    bgToast = (tipo.toLowerCase() == "error") ? "bg-danger" :
    (tipo.toLowerCase() == "alert") ? "bg-warning" : "bg-success";
    alertaToast.addClass(bgToast);
    $('#alertaToastCuerpo').html(cuerpo);
    toast = new bootstrap.Toast(alertaToast);
    toast.show();
}
//***************************************************************************
// Fin Mostrar Toast
//***************************************************************************