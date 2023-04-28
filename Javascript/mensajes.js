function TraerDatosMensaje() {
    $.ajax({
        type: "GET",
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        dataType: "json",
        success: function (response) {
            pintarDatos(response.items, 'messagetext', 'message');
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

function GuardarMensaje() {
    let DatosPorEnviar = {
        'id': $("#id").val(),
        'messagetext': $("#messagetext").val(),
    };

    $.ajax({
        type: "POST",
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        contentType: "application/json",
        data: JSON.stringify(DatosPorEnviar),

        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: '¡Transacción exitosa!',
                text: 'El Mensaje ha sido agregado con Exito',
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
            });
        }
    });
}