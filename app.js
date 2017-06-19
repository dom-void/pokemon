var table = $('table');
var url = 'http://pokeapi.co/api/v2/pokemon/';

var allPokemonsNo = 0;
var allPokemons = [];

var offset = 0;
var tableArray = [];

var loading = $('#loading');


function load() {
    loading.attr('style', 'display: block');
    $.when(getNoOfPokemons()).done(function () {
        getAllPokemons();
        $.when(getAllPokemons().done(function () {
            fillTable(0);
            $(document).ajaxStop(function () {
                loading.attr('style', 'display: none');
                insertContent(tableArray);
            });
            // TODO: make pagination buttons show after filling the table
        }))
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

function getAllPokemons() {
    return $.ajax({
        url: url,
        method: 'GET',
        data: {
            // offset: offset,
            limit: allPokemonsNo
        }
    }).done(function (response) {
        allPokemons = response.results;
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    })
}

function insertPokemon(url, i) {
    return $.ajax({
        url: url,
        dataType: 'json',
        method: 'GET'
    }).done(function (response) {
        console.log(response);
        tableArray[i] = response;
    }).fail(function (error) {
        console.log(error);
    })
}

function insertContent(array) {
    for (var i = 0; i < array.length; i++) {
        var response = array[i];
        var tr = $('<tr>')
        var tdImage = $('<img>').attr('src', response.sprites.front_default);
        var tdName = $('<td>').text(response.name);
        var tdHP = $('<td>').text(response.stats[5].base_stat);
        tr.append(tdImage);
        tr.append(tdName);
        tr.append(tdHP);
        table.append(tr);
    }
}

function fillTable(offset) {
    // TODO: condition for last page and next button starting from begining
    tableArray = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    for (var i = 0; i < 10; i++) {
        console.log(allPokemons[i + offset].url);
        insertPokemon(allPokemons[i + offset].url, i)
    }
}

load();

// getNoOfPokemons();
// getAllPokemons();

// $(document).ajaxStop(function () {
//     insertContent(0);
// })
