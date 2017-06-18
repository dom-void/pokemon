var app = $('#app');
var url = 'http://pokeapi.co/api/v2/pokemon/';

var allPokemonsNo = 0;
var allPokemons = [];

function load() {
    $.when(getNoOfPokemons()).done(function () {
        $.ajax({
            url: url,
            method: 'GET',
            data: {
                // offset: offset,
                limit: allPokemonsNo
            }
        }).done(function (response) {
            allPokemons = response.results;
            getPokemon(allPokemons[13].url);
            console.log(response);
        }).fail(function (error) {
            console.log(error);
        })
    })
}

function getNoOfPokemons() {
    return $.ajax({
        url: url,
        method: 'GET'
    }).done(function (response) {
        allPokemonsNo = response.count;
        console.log(response.count);
    }).fail(function (error) {
        console.log(error);
    })
}

function getPokemon(url) {
    $.ajax({
        url: url,
        method: 'GET'
    }).done(function (response) {
        console.log(response);
    }).fail(function(error) {
        console.log(error);
    })
}

load();
