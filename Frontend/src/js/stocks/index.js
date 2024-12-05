function EliminarStock(id){

    $.ajax({

        url: 'http://localhost:3000/api/stock/' + id,
        
        type: 'DELETE',
        
        error: function (xhr, ajaxOptions, thrownError) {
        
            alert(xhr.status);
            
            alert(thrownError);
            
        },
        
        success: function(result) {
        
            alert(result);
            
            Refrescar();
            
        }
        
    });

}

function Refrescar() {
    
        $('#listado-stocks').html('');
        
        $('#listado-stocks').append('<thead class="table-primary"><tr><th>Nombre Producto</th><th>Nombre Sucursal</th><th>Stock Disponible</th><th>Stock Critico</th><th>Acciones</th></tr></thead>');

        $.ajax({
            
            url: 'http://localhost:3000/api/stock/',
            
            type: 'GET',
            
            error: function (xhr, ajaxOptions, thrownError) {
                
                alert(xhr.status);
                
                alert(thrownError);
                
            },
            
            success: function(result) {
            
                if (result.length) {
                
                    for(i = 0;i < result.length; i++) {
                    
                        $('#listado-stocks').append('<tr><td>' +    result[i].producto.productoNombre + '</td><td>' + 
                                                                    result[i].sucursal.sucursalNombre + '</td><td>' + 
                                                                    result[i].stock + '</td><td>' + 
                                                                    result[i].stock_critico + '</td><td>' + 
                                                                    '<a href="modificarStock.html?_id=' + result[i]._id + '">Modificar</a> | <a class="eliminar" href="javascript:EliminarStock(\'' + result[i]._id + '\');">Eliminar</a></td></tr>');
                    
                    }
                
                }
                else {
                
                    $('#listado-stocks').append('<tr><td colspan="4">No se encontraron resultados.</td></tr>');
                
                }
                
            }
        });
    
    }


$(function(){

    Refrescar();

});

