
function getParameterByName(name, url) {

    if (!url) url = window.location.href;

    name = name.replace(/[\[\]]/g, "\\$&");

    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),

        results = regex.exec(url);

    if (!results) return null;

    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, " "));

}

$(function () {

    // Cargar productos
    $.get('http://localhost:3000/api/producto/', function (data) {
        console.log('1');
        console.log(data);
        data.forEach(producto => {

            $('#productoSelect').append(`<option value="${producto._id}">${producto.productoCodigo} - ${producto.productoNombre}</option>`);
        });
    });

    // Cargar sucursales
    $.get('http://localhost:3000/api/sucursal/', function (data) {
        data.forEach(sucursal => {
            $('#sucursalSelect').append(`<option value="${sucursal._id}">${sucursal.sucursalId} - ${sucursal.sucursalNombre}</option>`);
        });
    });


    $('#_id').val(getParameterByName('_id'));

    $.ajax({

        url: 'http://localhost:3000/api/stock/' + $('#_id').val(),

        type: 'GET',

        error: function (xhr, ajaxOptions, thrownError) {

            alert(xhr.status);

            alert(thrownError);

        },

        success: function (result) {

            $('#sucursalSelect').val(result.sucursal._id);

            $('#productoSelect').val(result.producto._id);

            $('#stock').val(result.stock);

            $('#stock_critico').val(result.stock_critico);

        }

    });

    $('#modificar-stock').click(function () {

        $.ajax({

            url: 'http://localhost:3000/api/stock/' + $('#_id').val(),
            
            type: 'PUT',

            data: {

                 _id: $('#_id').val(),

                 sucursal: $('#sucursalSelect').val(),

                 producto: $('#productoSelect').val(),

                 stock: $('#stock').val(),

                 stock_critico: $('#stock_critico').val()

            },

            error: function (xhr, ajaxOptions, thrownError) {

                alert(xhr.status);

                alert(thrownError);

            },

            success: function (result) {

                alert(result);

            }

        });

    });

});