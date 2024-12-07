
$(function(){

    $('#agregar-stock').click(function(){
    
        $.ajax({
    
            url: 'http://localhost:3000/api/stock',
            
            type: 'POST',
            
            data: {
                
                sucursal : $('#sucursalSelect').val(),

                producto : $('#productoSelect').val(),

                stock    : $('#cantidadStock').val(),

                stock_critico: $('#stock_critico').val()

            
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