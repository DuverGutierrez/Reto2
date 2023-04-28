let arrayThCar = ["Id", "Marca", "Modelo", "Id Categoría"];
let arrayThClient = ["id", "Nombre", "Correo", "Edad"];
let arrayThMessage = ["id", "Mensaje"];
let vistaRetorno = "";

function TraerDetalle() {
    let id = sessionStorage.getItem('id');
    let tipoTabla = sessionStorage.getItem('tipoTabla');
    $.ajax({
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/" + tipoTabla + '/' + tipoTabla + '/' + id,
        type: "GET",
        dataType: "json",
        success: function (response) {
            pintarDetalle(response.items, tipoTabla);
        },
        error: function (response, xrh) {
            Swal.fire({
                icon: 'error',
                title: '¡Ocurrió un error!',
                text: 'No se logró cargar la información',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3ea528',
            });
        }
    });
}

function pintarDetalle(datos, tipoTabla) {
    $("#tabla thead tr th").remove(); //Remueve los tr dentro del tbody antes de llenar con datos
    $("#tabla tbody tr").remove(); //Remueve los tr dentro del tbody antes de llenar con datos

    if (tipoTabla == "car") {

        vistaRetorno = "carros.html";

        arrayThCar.forEach(itemArray => $("#tabla thead tr").append(`<th style="text-align: center">${itemArray}</th>`));

        datos.forEach((itemArray) => {
            $("#tabla tbody").append(
                `<tr>
                    <td style="text-align: center">${itemArray.id}</td>
                    <td style="text-align: left"><input value="${itemArray.brand}"></td>
                    <td style="text-align: center"><input value="${itemArray.model}"></td>
                    <td style="text-align: center"><input value="${itemArray.category_id}"></td>
                </tr>`
            );
        });
    }
    else if (tipoTabla == "client") {

        vistaRetorno = "clientes.html";
        arrayThClient.forEach(itemArray => $("#tabla thead tr").append(`<th style="text-align: center">${itemArray}</th>`));

        datos.forEach((itemArray) => {
            $("#tabla tbody").append(
                `<tr>
                    <td style="text-align: center">${itemArray.id}</td>
                    <td style="text-align: left"><input value="${itemArray.name}"></td>
                    <td style="text-align: center"><input value="${itemArray.email}"></td>
                    <td style="text-align: center"><input value="${itemArray.age}"></td>
                </tr>`
            );
        });
    }
    else if (tipoTabla == "message") {

        vistaRetorno = "mensajes.html";

        arrayThMessage.forEach(itemArray => $("#tabla thead tr").append(`<th style="text-align: center">${itemArray}</th>`));

        datos.forEach((itemArray) => {
            $("#tabla tbody").append(
                `<tr>
                    <td style="text-align: center">${itemArray.id}</td>
                    <td style="text-align: left"><textarea class="form-control" type="text" rows="4" cols="50">${itemArray.messagetext}</textarea></td>
                </tr>`
            );

        });
    }
}

function EliminarDato() {
    let id = sessionStorage.getItem('id');
    let tipoTabla = sessionStorage.getItem('tipoTabla');

    let DatosPorEnviar = {
        'id': id
    };

    Swal.fire({
        icon: 'question',
        title: '¿Confirma la transacción?',
        text: 'Elemento será eliminado de forma definitiva',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3ea528',
        cancelButtonColor: 'red'
    }).then((result) => {
        if (result.isConfirmed == true) {
            $.ajax({
                url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/" + tipoTabla + '/' + tipoTabla,
                type: "DELETE",
                contentType: 'application/json',
                data: JSON.stringify(DatosPorEnviar),
                success: function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Transacción exitosa!',
                        text: 'Elemento ha sido eliminado',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#3ea528',
                    }).then(result => location.href = vistaRetorno);
                },
                error: function (response, xrh) {
                    Swal.fire({
                        icon: 'error',
                        title: '¡Ocurrió un error!',
                        text: 'La información no se logró registrar',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#3ea528',
                    });
                }
            });
        }
    });
}

function ActualizarDato() {
    let tipoTabla = sessionStorage.getItem('tipoTabla');
    let datos = "";
    if (tipoTabla == 'car') {
        datos = DatosCarro();
    } else if (tipoTabla == 'client') {
        datos = DatosClientes();
    } else if (tipoTabla == 'message') {
        datos = DatosMensajes();
    }
    $.ajax({
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/" + tipoTabla + '/' + tipoTabla,
        type: "PUT",
        contentType: 'application/json',
        data: JSON.stringify(datos),
        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Transacción exitosa!',
                text: 'La información ha sido actualizada',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3ea528',
            }).then(result => location.href = vistaRetorno);
        },
        error: function (response, xrh) {
            Swal.fire({
                icon: 'error',
                title: '¡Ocurrió un error!',
                text: 'La información no se logró registrar',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3ea528',
            });
        }
    });
}

function DatosCarro() {
    let fila = document.getElementById('tabla').rows.item(1).cells;
    let datos = {
        'id': fila.item(0).innerText,
        'brand': fila.item(1).children[0].value,
        'model': fila.item(2).children[0].value,
        'category_id': fila.item(3).children[0].value
    };
    return datos;
}

function DatosClientes() {
    let fila = document.getElementById('tabla').rows.item(1).cells;
    let datos = {
        'id': fila.item(0).innerText,
        'name': fila.item(1).children[0].value,
        'email': fila.item(2).children[0].value,
        'age': fila.item(3).children[0].value
    };
    return datos;
}

function DatosMensajes() {
    let fila = document.getElementById('tabla').rows.item(1).cells;
    let datos = {
        'id': fila.item(0).innerText,
        'messagetext': fila.item(1).children[0].value
    };
    return datos;
}