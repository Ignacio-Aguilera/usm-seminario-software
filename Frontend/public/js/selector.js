$(document).ready(function () {
    // Cargar productos
    $.get('/api/productos', function (data) {
        data.forEach(producto => {
            $('#productoSelect').append(`<option value="${producto.id}">${producto.nombre}</option>`);
        });
    });

    // Cargar sucursales
    $.get('/api/sucursales', function (data) {
        data.forEach(sucursal => {
            $('#sucursalSelect').append(`<option value="${sucursal.id}">${sucursal.nombre}</option>`);
        });
    });

    // Enviar formulario
    $('#agregar-stock').click(function () {
        const stockData = {
            productoId: $('#productoSelect').val(),
            sucursalId: $('#sucursalSelect').val(),
            cantidad: $('#cantidadStock').val(),
        };

        $.post('/api/stocks', stockData, function (response) {
            $('#mensaje-resultado').text('Stock guardado correctamente.').addClass('text-success');
        }).fail(function () {
            $('#mensaje-resultado').text('Error al guardar el stock.').addClass('text-danger');
        });
    });
});
