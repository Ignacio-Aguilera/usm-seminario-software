
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
    
        url: 'http://localhost:3000/api/sucursal/' + $('#_id').val(),
        
        type: 'GET',
        
        error: function (xhr, ajaxOptions, thrownError) {
        
            alert(xhr.status);
            
            alert(thrownError);
            
        },
        
        success: function(result) {
        
            $('#sucursalId').val(result.sucursalId);
            
            $('#sucursalNombre').val(result.sucursalNombre);
            
            $('#sucursalDireccion').val(result.sucursalDireccion);
            
        }
        
    });

    $('#modificar-sucursal').click(function(){
    
        $.ajax({
    
            url: 'http://localhost:3000/api/sucursal/' + $('#_id').val(),
            
            type: 'PUT',
            
            data: {

                _id: $('#_id').val(),
            
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