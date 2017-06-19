var tbody = $('tbody');
var url = 'https://pokeapi.co/api/v2/pokemon/';

var allPokemonsNo = 0;
var allPokemons = [];

var offset = 0;
var offsetStep = 10;
var tableArray = [];

var loading = $('#loading');
var prevBtn = $('#prev');
var nextBtn = $('#next');

function firstLoad() {
    loading.attr('style', 'display: block');
    prevBtn.attr('style', 'display: none');
    nextBtn.attr('style', 'display: none');
    $.when(getNoOfPokemons()).done(function () {
        getAllPokemons();
        $.when(getAllPokemons().done(function () {
            load();
        }))
    })
}

function load() {
    tbody.empty();
    loading.attr('style', 'display: block');
    prevBtn.attr('style', 'display: none');
    nextBtn.attr('style', 'display: none');
    fillTable(offset);
    $(document).ajaxStop(function () {
        loading.attr('style', 'display: none');
        // if (offset > 0) {
        prevBtn.attr('style', 'display: block');
        // }
        // if (Math.floor(offset / offsetStep) < Math.floor(allPokemonsNo / offsetStep)) {
        nextBtn.attr('style', 'display: block');
        // }
        insertContent(tableArray);
    });
    // TODO: make pagination buttons show after filling the table
}

function getNoOfPokemons() {
    return $.ajax({
        url: url,
        method: 'GET'
    }).done(function (response) {
        // allPokemonsNo = response.count;
        allPokemonsNo = 809;
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
        var tdID = $('<td>').text(response.id);
        var tdName = $('<td>').text(response.name);
        var tdHP = $('<td>').text(response.stats[5].base_stat);
        tr.append(tdImage);
        tr.append(tdID);
        tr.append(tdName);
        tr.append(tdHP);
        tbody.append(tr);
    }
}

function fillTable(offset) {
    // TODO: condition for last page and next button starting from begining
    tableArray = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    for (var i = 0; i < offsetStep; i++) {
        console.log(allPokemons[i + offset].url);
        insertPokemon(allPokemons[i + offset].url, i)
    }
}

firstLoad();

nextBtn.on('click', function () {
    if (Math.floor(offset / offsetStep) < Math.floor(allPokemonsNo / offsetStep)) {
        offset += offsetStep;
    } else {
        offset = 0;
    }
    load();
})

prevBtn.on('click', function () {
    if (offset > 0) {
        offset -= offsetStep;
    } else {
        offset = Math.floor(allPokemonsNo / offsetStep) * offsetStep;
    }
    load();
})

// TODO: display page status betwen buttons: 'page 1 of 81'
// TODO: make 'go to page: xxx' input & button
