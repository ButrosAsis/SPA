function cerrar() {
    $("#formularioEdicion").hide();
    $("#formularioBuscar").hide();

    listarPersonas("");
}

const options = {
    bottom: '32px', // default: '32px'
    //right: 'unset', // default: '32px'
    //left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: true, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
}

function addDarkmodeWidget() {
    new Darkmode(options).showWidget();
}
window.addEventListener('load', addDarkmodeWidget);


window.onload = listarPersonas("")

$("#formularioEdicion").hide();
$("#formularioBuscar").hide();

function listarPersonas(valor) {
    console.log(valor)

    $.ajax({
        method:'POST',
        url:'https://telemedicina.jakemate.net:7141/api/webservice/metodo',
        data: {
            _nombreMetodo_: "listarPersonas"
        },
        success: function(response){
            //myArray = response
            
            var obj = JSON.parse(response);
            //buildTable(myArray)
            
            var table = document.getElementById('myTable')

            //Vaciar acá
            var elmtTable = document.getElementById('myTable');
            var tableRows = elmtTable.getElementsByTagName('tr');
            var rowCount = tableRows.length;

            for (var x=rowCount-1; x>=0; x--) {
                elmtTable.removeChild(tableRows[x]);
            }

            for (var i = 0; i < obj.resultado.Table.length; i++){
                var datos = {
                    codigo : obj.resultado.Table[i].COD_PERSONA,
                    nombre : obj.resultado.Table[i].NOMBRE,
                    apellido : obj.resultado.Table[i].APELLIDO,
                    dni : obj.resultado.Table[i].NRO_DOCUMENTO
                };

                
                //console.log(obj.resultado.Table[i].NOMBRE)

                if (obj.resultado.Table[i].NOMBRE.includes(valor) || valor == "") {
                    var row = `<tr class="textoColumna">
                                <td>${obj.resultado.Table[i].NOMBRE}</td>
                                <td>${obj.resultado.Table[i].APELLIDO}</td>
                                <td>${obj.resultado.Table[i].NRO_DOCUMENTO}</td>
                                <td>
                                    <div style="text-align: center;">
                                    <button class="btn btn-outline-primary" onclick='editarPersona(`+ datos.codigo + `,&#39` + datos.nombre + `&#39,&#39` + datos.apellido + `&#39,` + datos.dni + ` )'>Editar</button>
                                    <button class="btn btn-outline-danger" onclick='eliminarPersona(${obj.resultado.Table[i].COD_PERSONA})'>Eliminar</button>
                                    </div>
                                </td>
                        </tr>`
                    table.innerHTML += row
                }

                


            }

            console.log(obj)
        }
    })
}

function agregarPersona() {
    var nombre = $("#nombre").val()
    var apellido = $("#apellido").val()
    var dni = $("#dni").val()

    if (nombre == "" || apellido == "" || dni == "") {
        return
    }

    $.ajax({
        method:'POST',
        url:'https://telemedicina.jakemate.net:7141/api/webservice/metodo',
        data: {
            _nombreMetodo_: "agregarPersona",
            NOMBRE: nombre,
            APELLIDO: apellido,
            NRO_DOCUMENTO: dni
        },
        success: function(response){
            console.log(response)


            document.getElementById('nombre').value = ""
            document.getElementById('apellido').value = ""
            document.getElementById('dni').value = ""

            listarPersonas("")
        }
    })
}

function eliminarPersona(codigo) {
    $.ajax({
        method:'POST',
        url:'https://telemedicina.jakemate.net:7141/api/webservice/metodo',
        data: {
            _nombreMetodo_: "eliminarPersona",
            COD_PERSONA: codigo
        },
        success: function(response){
            console.log(response)
            listarPersonas("")
        }
    })
}

function editarPersona(codigo, nombre, apellido, dni) {
    
    //alert(datos)
    document.getElementById('codigoEditar').value = codigo
    document.getElementById('nombreEditar').value = nombre
    document.getElementById('apellidoEditar').value = apellido
    document.getElementById('dniEditar').value = dni

    //document.getElementById('editButton').disabled = false

    //Tiene que aparecer el form de abajo.
    
    
    $("#formularioBuscar").hide();
    $("#formularioEdicion").show();
    

    


    //document.getElementById('addButton').textContent = "Editar"

    /*document.nombre.value = nombre
    document.apellido.value = apellido
    document.dni.value = dni*/

    console.log(codigo)
    console.log(nombre)
    console.log(apellido)
    console.log(dni)
    //alert(datos.nombre)
    //alert(nombre)
    //alert(apellido)
    //alert(dni)
}


function guardarPersona() {
    /*var codigo = document.getElementById('codigoEditar').value
    var nombre = document.getElementById('nombreEditar').value
    var apellido = document.getElementById('apellidoEditar').value
    var dni = document.getElementById('dniEditar').value
*/
    var codigoEditar = $("#codigoEditar").val()
    var nombreEditar = $("#nombreEditar").val()
    var apellidoEditar = $("#apellidoEditar").val()
    var dniEditar = $("#dniEditar").val()


    //alert(apellidoEditar)
    
    $.ajax({
        method:'POST',
        url:'https://telemedicina.jakemate.net:7141/api/webservice/metodo',
        data: {
            _nombreMetodo_: "editarPersona",
            COD_PERSONA: codigoEditar,
            NOMBRE: nombreEditar,
            APELLIDO: apellidoEditar,
            NRO_DOCUMENTO: dniEditar
        },
        success: function(response){
            console.log(response)
            listarPersonas("")
            $("#formularioEdicion").hide();
        }
    })
}


function buscar() {
    $("#formularioEdicion").hide();
    $("#formularioBuscar").show();

    $("#search").focus();
}

$(document).on('keyup','#search', function(){
    var valor = $(this).val();
    if (valor != "") {
        listarPersonas(valor);
    }else{
        listarPersonas("");
    }
});




/*function buildTable(data){
    var table = document.getElementById('myTable')

    for (var i = 0; i < data.resultado.Table.length; i++){
        var row = `<tr>
                        <td>${data.resultado.Table[i].NOMBRE}</td>
                        <td>${data.resultado.Table[i].APELLIDO}</td>
                        <td>${data.resultado.Table[i].NRO_DOCUMENTO}</td>
                </tr>`
        table.innerHTML += row


    }
}*/
        