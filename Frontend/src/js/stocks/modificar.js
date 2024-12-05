
function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    
    name = name.replace(/[\[\]]/g, "\\$&");
    
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    
    results = regex.exec(url);
    
    if (!results) return null;
    
    if (!results[2]) return '';
    
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    
}

$(function(){

    $('#_id').val(getParameterByName('_id'));
    
    $.ajax({
    
        url: 'http://localhost:3000/api/stock/' + $('#_id').val(),
        
        type: 'GET',
        
        error: function (xhr, ajaxOptions, thrownError) {
        
            alert(xhr.status);
            
            alert(thrownError);
            
        },
        
        success: function(result) {
        
            // $('#productoCodigo').val(result.productoCodigo);
            
            // $('#productoNombre').val(result.productoNombre);
            
            // $('#productoDescripcion').val(result.productoDescripcion);
            
        }
        
    });

    $('#modificar-stock').click(function(){
    
        $.ajax({
    
            url: 'http://localhost:3000/api/stock/' + $('#_id').val(),
            
            type: 'PUT',
            
            data: {

                // _id: $('#_id').val(),
            
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