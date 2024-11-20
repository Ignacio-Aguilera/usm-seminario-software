function EliminarSucursal(id){

    $.ajax({

        url: 'http://localhost:3000/api/sucursal/' + id,
        
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
    
        $('#listado-sucursals').html('');
        
        $('#listado-sucursals').append('<thead class="table-primary"><tr><th>ID</th><th>Nombre</th><th>Direcci&oacute;n</th><th>Acciones</th></tr></thead>');

        $.ajax({
            
            url: 'http://localhost:3000/api/sucursal',
            
            type: 'GET',
            
            error: function (xhr, ajaxOptions, thrownError) {
                
                alert(xhr.status);
                
                alert(thrownError);
                
            },
            
            success: function(result) {
            
                if (result.length) {
                
                    for(i = 0;i < result.length; i++) {
                    
                        $('#listado-sucursals').append('<tr><td>' + result[i].sucursalId + '</td><td>' + 
                                                                    result[i].sucursalNombre + '</td><td>' + 
                                                                    result[i].sucursalDireccion + '</td><td>' + 
                                                                    '<a href="modificarSucursal.html?_id=' + result[i]._id + '">Modificar</a> | <a class="eliminar" href="javascript:EliminarSucursal(\'' + result[i]._id + '\');">Eliminar</a></td></tr>');
                    
                    }
                
                }
                else {
                
                    $('#listado-sucursals').append('<tr><td colspan="4">No se encontraron sucursales.</td></tr>');
                
                }
                
            }
        });
    
    }


$(function(){

    Refrescar();

});

