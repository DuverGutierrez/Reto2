function TraerDatosClientes(){
    $.ajax({
        type: "GET",
        url: "https://ga0fbdf19beb753-reto11.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        dataType: "json",
        success: function (response) {
            pintarDatos(response.items,'name','client');
            
        },
        error: function(response, xrh){
            alert("Error en ejecución");

        }
    });
}

function GuardarCliente(){
    let DatosPorEnviar={
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
            alert("El Cliente"+DatosPorEnviar.name+ "Ha sido agregado con Exito");
            TraerDatosClientes();
            pintarDatos("Error de petición");
            
        },
        error: function(response, xrh){
            alert("Error en ejecución");

        }
    });
}