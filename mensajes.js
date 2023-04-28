function TraerDatosMensaje() {
    $.ajax({
        type: "GET",
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/mensaje/message",
        dataType: "json",
        success: function (response) {
            pintarDatos(response.items, 'messagetext', 'message');

        },
        error: function (response, xrh) {
            alert("Error en ejecución");

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
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/mensaje/message",
        contentType: "application/json",
        data: JSON.stringify(DatosPorEnviar),

        success: function (response) {
            alert("El Mensaje Ha sido agregado con Exito");
            TraerDatosMensaje();
            pintarDatos("Error de petición");

        },
        error: function (response, xrh) {
            alert("Error en ejecución");

        }
    });
}