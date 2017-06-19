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
    makeTable(offsetStep);
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
    tbody.attr('style', 'display: none');
    loading.attr('style', 'display: block');
    prevBtn.attr('style', 'display: none');
    nextBtn.attr('style', 'display: none');
    fillTable(offset);
    $(document).ajaxStop(function () {
        loading.attr('style', 'display: none');
        prevBtn.attr('style', 'display: block');
        nextBtn.attr('style', 'display: block');
        insertContent(tableArray);
        tbody.attr('style', 'display: table-row-group');
    });
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

function makeTable(offsetStep) {
    tbody.attr('style', 'display: none');
    for (var i = 0; i < offsetStep; i++) {
        var tr = $('<tr>').attr('id', ('tr' + i));
        var tdImage = $('<img>').attr('id', ('img' + i));
        var tdID = $('<td>').attr('id', ('td-id' + i));
        var tdName = $('<td>').attr('id', ('td-name' + i));
        var tdHP = $('<td>').attr('id', ('td-hp' + i));
        tr.append(tdImage);
        tr.append(tdID);
        tr.append(tdName);
        tr.append(tdHP);
        tbody.append(tr);
    }
}

function insertContent(array) {
    for (var i = 0; i < array.length; i++) {
        $
        var response = array[i];
        var tdImage = $('#img' + i);
        var tdID = $('#td-id' + i);
        var tdName = $('#td-name' + i);
        var tdHP = $('#td-hp' + i);
        tdImage.attr('src', response.sprites.front_default);
        tdID.text(response.id);
        tdName.text(response.name);
        tdHP.text(response.stats[5].base_stat);
    }
}

function fillTable(offset) {
    // TODO: condition for last page which is not full offsetStep long
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
