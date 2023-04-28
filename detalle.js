function TraerDetalle(){
    let id = sessionStorage.getItem('id');
    let tipoTabla = sessionStorage.getItem('tipoTabla');
    $.ajax({
        url: "https://gfc8f6952f1e582-car.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/"+tipoTabla+'/'+tipoTabla+'/'+id,
        type: "GET",
        dataType: "json",
        success: function (response) {
            pintarDetalle(response.items);
            
        },
        error: function(response, xrh){
            alert("Error en ejecución");

        }
    });
}
function pintarDetalle(datos) {
    let htmlParaInsertar = "";
    htmlParaInsertar += "<thead><tr>";

    Object.keys(datos[0]).forEach(elemento => htmlParaInsertar+='<th>'+elemento+'</th>');
    htmlParaInsertar += "</thead></tr>";
    htmlParaInsertar += "<tbody>";

    for(let i = 0; i<datos.length; i++){
        htmlParaInsertar += "<tr>";

        Object.values(datos[i]).forEach((elemento, indice) => {
            if(indice< 1 ){
                htmlParaInsertar+="<td>"+elemento+"</td>";
            }else{
                htmlParaInsertar+="<td><input value=\""+elemento+"\"></td>";
            }
        });
        htmlParaInsertar += "</tr>";
    }

    htmlParaInsertar += "</tbody>";

    $("#tabla").empty();
    $("#tabla").append(htmlParaInsertar);
}

function EliminarDato(){
    let id = sessionStorage.getItem('id');
    let tipoTabla = sessionStorage.getItem('tipoTabla');

    let DatosPorEnviar = {
        'id': id
        };

        $.ajax({
            url: "https://gfc8f6952f1e582-car.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/"+tipoTabla+'/'+tipoTabla,
            type: "DELETE",
            contentType:'application/json',
            data: JSON.stringify(DatosPorEnviar),
            success: function (response) {
                alert('Datos Eliminados');
                location.href='index.html';
                
            },
            error: function(response, xrh){
                alert("Error en ejecución")
    
            }
        }); 
}

function ActualizarDato(){
    let tipoTabla = sessionStorage.getItem('tipoTabla');
    let datos = "";
    if (tipoTabla== 'car'){
       datos = DatosCarro();
    }else if(tipoTabla=='client'){
        datos = DatosClientes();
    }else if(tipoTabla== 'message'){
        datos = DatosMensajes();
    }
    $.ajax({
        url: "https://gfc8f6952f1e582-car.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/"+tipoTabla+'/'+tipoTabla,
        type: "PUT",
        contentType:'application/json',
        data: JSON.stringify(datos),
        success: function (response) {
            alert('Datos Actualizados');
            location.href='index.html';
            
        },
        error: function(response, xrh){
            alert("Error en ejecución")

        }
    }); 
}

function DatosCarro(){
    let fila = document.getElementById('tabla').rows.item(1).cells;
    let datos = {
        'id': fila.item(0).innerText,
        'brand': fila.item(1).children[0].value,
        'model': fila.item(2).children[0].value,
        'category_id': fila.item(3).children[0].value

    };
    return datos;
}

function DatosClientes(){
    let fila = document.getElementById('tabla').rows.item(1).cells;
    let datos = {
        'id': fila.item(0).innerText,
        'name': fila.item(1).children[0].value,
        'email': fila.item(2).children[0].value,
        'age': fila.item(3).children[0].value

    };
    return datos;
}

function DatosMensajes(){
    let fila = document.getElementById('tabla').rows.item(1).cells;
    let datos = {
        'id': fila.item(0).innerText,
        'messagetext': fila.item(1).children[0].value

    };
    return datos;
}