function TraerDatosCarros() {
    $.ajax({
        type: "GET",
        url: 'https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/car/car',
        dataType: 'json',
        success: function (response) {
            pintarDatos(response.items, 'brand', 'car');
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

function GuardarCarro() {
    let DatosPorEnviar = {
        'id': $("#id").val(),
        'brand': $("#brand").val(),
        'model': $("#model").val(),
        'category_id': $("#category_id").val()
    };

    $.ajax({
        type: "POST",
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/car/car",
        contentType: "application/json",
        data: JSON.stringify(DatosPorEnviar),

        success: function (response) {
            Swal.fire({
                icon: 'success',
                title: '¡Transacción exitosa!',
                text: 'El vehículo ha sido agregado con Exito',
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