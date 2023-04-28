function TraerDatosClientes() {
    $.ajax({
        type: "GET",
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        dataType: "json",
        success: function (response) {
            pintarDatos(response.items, 'name', 'client');
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

function GuardarCliente() {
    let DatosPorEnviar = {
        'id': $("#id").val(),
        'name': $("#name").val(),
        'email': $("#email").val(),
        'age': $("#age").val()
    }

    $.ajax({
        type: "POST",
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        contentType: "application/json",
        data: JSON.stringify(DatosPorEnviar),

        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: '¡Transacción exitosa!',
                text: 'El cliente ha sido agregado con Exito',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3ea528',
            }).then(result => location.reload());
        },
        error: function (response, xrh) {
            Swal.fire({
                icon: 'error',
                title: '¡Ocurrió un error!',
                text: 'La información no se logró registrar',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3ea528',
            });        }
    });
}