function pintarDatos(datos, ColumnaParaMostrar, tipoTabla){
    let htmlParaInsertar = "";
    htmlParaInsertar += "<thead><tr><th>Titulo</th></tr></thead>";
    htmlParaInsertar += "<tbody>";

    for(let i = 0; i<datos.length; i++){
        htmlParaInsertar += "<tr>";
        //htmlParaInsertar += "<td><a href= '#' onclick='RedireccionarDetalle("+datos[i].id+", \""+tipoTabla+"\");'>"`${datos[i].ColumnaParaMostrar}</a></td>`;
       htmlParaInsertar += `<td><a href= "#" onclick="RedireccionarDetalle(${datos[i].id},'${tipoTabla}')">${datos[i][ColumnaParaMostrar]}</a></td>`;
        htmlParaInsertar += "<tr>";
    }
    htmlParaInsertar += "</tbody>";
    $("#tabla").empty();
    $("#tabla").append(htmlParaInsertar);
}

function RedireccionarDetalle(id, tipoTabla){
    sessionStorage.setItem('id',id);
    sessionStorage.setItem('tipoTabla',tipoTabla);
    location.href='detalle.html';

}