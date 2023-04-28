function TraerDatosCarros() {
    $.ajax({
        type: "GET",
        url: 'https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/car/car',
        dataType: 'json',
        success: function (response) {
            pintarDatos(response.items, 'brand', 'car');

        },
        error: function (response, xrh) {
            alert("Error en ejecución");

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
            alert("El vehiculo ha sido agregado con Exito");
            TraerDatosCarros();
            pintarDatos("Error de petición");

        },
        error: function (response, xrh) {
            alert("Error en ejecución");

        }
    });

    /* let DatosPorEnviar = {
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
            alert("El carro" + DatosPorEnviar.brand + "Ha sido agregado con Exito");
            TraerDatosCarros();
            pintarDatos("Error de petición");

        },
        error: function (response, xrh) {
            alert("Error en ejecución");

        }
    }); */
}