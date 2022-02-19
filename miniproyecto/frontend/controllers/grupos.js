//*****************************************************
// GET grupo
//*****************************************************
function getGrupo() {
    let urlGrupos = urlBase + '/grupos';
    let id = $('#id-grupo').val();    
    if (id.length > 0) {
        urlGrupos += `?id=${id}`
    };
    let parametros = { headers: headers, method: 'GET' };
    fetch(urlGrupos, parametros)
    .then((resultado) => {
        return resultado.json()
    })
    .then((respuesta) => {
        if (respuesta.ok) {
            mostrarToast('ok', respuesta.message);
            if (respuesta.resultado.length > 0) {
                mostrarListadoGrupos(respuesta.resultado)
            }else {
                llenarFormGrupos(respuesta.resultado)
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
// Fin GET grupo
//*****************************************************

//*****************************************************
// POST grupo
//*****************************************************
function postGrupo() {
    let grupo = leerGruposForm();
    let cuerpo = validarGruposForm(grupo);
    if (cuerpo == '') {
        let urlGrupos = urlBase + `/grupos`;
        let parametros = { headers: headers, body: JSON.stringify(grupo), method: 'POST' };
        fetch(urlGrupos, parametros)
        .then((resultado) => {
            return resultado.json();
        })
        .then((respuesta) => {
            let tipo = (respuesta.ok) ? 'ok' : 'alert';
            mostrarToast(tipo, respuesta.message);
            $('#grupos-form').trigger('reset');
        })        
        .catch((error) => {
            mostrarToast('error', error.message)
        })
    } else {
        mostrarToast('alert', cuerpo);
    }
}
//*****************************************************
// Fin POST grupo
//*****************************************************

//*****************************************************
// PUT grupo
//*****************************************************
function putGrupo() {
    let id = $('#id-grupo').val().trim();
    if (id.length == 0){
        let cuerpo = 'Es necesario el id del grupo';
        mostrarToast('alert', cuerpo);
    }else{
        let grupo = leerGruposForm();            
        let cuerpo = validarGruposForm(grupo);
        if (cuerpo == '') {
            grupo.id = id;
            let urlGrupos = urlBase + `/grupos`;
            let parametros = { headers: headers, body: JSON.stringify(grupo), method: 'PUT' };
            fetch(urlGrupos, parametros)
            .then((resultado) => {
                return resultado.json();
            })
            .then((respuesta) => {
                let tipo = 'alert';
                if (respuesta.ok) { 
                    tipo = 'ok';
                    $('#grupos-form').trigger('reset');
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
// Fin PUT grupo
//*****************************************************

//*****************************************************
// DELETE grupo
//*****************************************************
function deleteGrupo() {
    let id = $('#id-grupo').val().trim();
    if (id.length == 0) {
        let cuerpo = 'Es necesario el id del grupo';
        mostrarToast('alert', cuerpo);
    }else {
        let urlGrupos = urlBase + `/grupos`;
        let parametros = {
            headers: headers,
            body: JSON.stringify({ id: id }),
            method: "DELETE"
        };
        fetch(urlGrupos, parametros)
        .then((resultado) => {
            return resultado.json()
        })
        .then((respuesta) => {
            let tipo = 'alert';
            if (respuesta.ok) { 
                tipo = 'ok';
                $('#grupos-form').trigger('reset');
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
// Fin DELETE grupos
//*****************************************************

//*****************************************************
// Leer grupo del formulario y devolver json
//*****************************************************
function leerGruposForm() {
    let result = {
        name: $('#nombre-grupo').val().trim(),
    };
    return result;
}
//*****************************************************
// Fin Leer grupo del formulario y devolver json
//*****************************************************

//*****************************************************
// Validar formulario y devolver cadena de validacióm
//*****************************************************
function validarGruposForm(grupo) {
    let result = '';
    let { name } = grupo;
    result += (name == '') ? 'Nombre' : '';
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
function mostrarListadoGrupos(resultado) {
    $('#grupos-form').trigger('reset');
    let tablaResultado = $('#tabla-resultados');
    tablaResultado.html('');
    let resultadoHTML = '<thead><tr><th scope="col">#</th><th scope="col">Nombre</th></tr></thead><tbody>';
    resultado.forEach((grupo) => {
        resultadoHTML += `<tr onclick="seleccionaResultado('#id-grupo', ${grupo.group_id})" class="fila-resultados">`;
        resultadoHTML += `<th scope="row">${grupo.group_id}</th><td>${grupo.name}</td></tr>`;
    });
    resultadoHTML += '</tbody>'
    tablaResultado.append(resultadoHTML);
}
//***************************************************************************
// Fin Mostrar listado de resultados
//***************************************************************************

//***************************************************************************
// Llenar formulario grupo
//***************************************************************************
function llenarFormGrupos(resultado) {
    $('#tabla-resultados').html('');
    $('#nombre-grupo').val(resultado.name);
    $('#id-grupo').val(resultado.group_id);
}
//***************************************************************************
// Fin Llenar formulario grupo
//***************************************************************************