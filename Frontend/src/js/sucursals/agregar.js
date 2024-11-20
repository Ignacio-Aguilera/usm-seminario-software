
$(function(){

    $('#agregar-sucursal').click(function(){
    
        $.ajax({
    
            url: 'http://localhost:3000/api/sucursal',
            
            type: 'POST',
            
            data: {
            
                sucursalId: $('#sucursalId').val(),
                
                sucursalNombre: $('#sucursalNombre').val(),
                
                sucursalDireccion: $('#sucursalDireccion').val()
            
            },
            
            error: function (xhr, ajaxOptions, thrownError) {
            
                alert(xhr.status);
                
                alert(thrownError);
                
            },
            
            success: function(result) {
            
                alert(result);
                
            }
            
        });
    
    });

});