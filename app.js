var app = $('#app');
var url = 'http://pokeapi.co/api/v2/pokemon';



function load() {
    $.ajax({
        url: url,
        method: 'GET',
        data: {
            offset: 5
        }
    }).done(function(response){
        console.log(response);
    }).fail(function(error){
        console.log(error);
    })
}

load();