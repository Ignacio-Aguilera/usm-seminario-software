
$(function(){

    $('#agregar-stock').click(function(){
    
        $.ajax({
    
            url: 'http://localhost:3000/api/stock',
            
            type: 'POST',
            
            data: {
            
                // productoCodigo: $('#productoCodigo').val(),
                
                // productoNombre: $('#productoNombre').val(),
                
                // productoDescripcion: $('#productoDescripcion').val()
            
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