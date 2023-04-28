function pintarDatos(datos, ColumnaParaMostrar, tipoTabla) {
    $("#tabla tbody tr").remove(); //Remueve los tr dentro del tbody antes de llenar con datos

    if (tipoTabla == "client") {
        for (let i = 0; i < datos.length; i++) {
            $("#tabla tbody").append(
                `<tr>
                    <td style="text-align: center">${datos[i].id}</td>
                    <td style="text-align: left">${datos[i].name}</td>
                    <td style="text-align: left">${datos[i].email}</td>
                    <td style="text-align: center">${datos[i].age}</td>
                    <td style="text-align: center"><button class="btn btn-success btnPequeno" onclick="RedireccionarDetalle(${datos[i].id},'${tipoTabla}')">Ver</button></td>
                </tr>`
            );
        }
    }
    else if (tipoTabla == "car") {
        for (let i = 0; i < datos.length; i++) {
            $("#tabla tbody").append(
                `<tr>
                    <td style="text-align: center">${datos[i].id}</td>
                    <td style="text-align: left">${datos[i].brand}</td>
                    <td style="text-align: center">${datos[i].model}</td>
                    <td style="text-align: center">${datos[i].category_id}</td>
                    <td style="text-align: center"><button class="btn btn-success btnPequeno" onclick="RedireccionarDetalle(${datos[i].id},'${tipoTabla}')">Ver</button></td>
                </tr>`
            );
        }
    }
    else if (tipoTabla == "message") {
        for (let i = 0; i < datos.length; i++) {
            $("#tabla tbody").append(
                `<tr>
                    <td style="text-align: center">${datos[i].id}</td>
                    <td style="text-align: center">${datos[i].messagetext}</td>
                    <td style="text-align: center"><button class="btn btn-success btnPequeno" onclick="RedireccionarDetalle(${datos[i].id},'${tipoTabla}')">Ver</button></td>
                </tr>`
            );
        }
    }
}

function RedireccionarDetalle(id, tipoTabla) {
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('tipoTabla', tipoTabla);
    location.href = 'detalle.html';
}