$(document).ready(onReady);

function onReady() {
    $('#pokeNumButton').on('click', checkData);
    $('#displayOld').on('click', '.searchHistoryButton', runAgain);
}

//---------------- VALIDATE INPUT ----------------//

function checkData() {
    let pokeNumber = $('#pokeNumberInput').val();
    if (pokeNumber < 1 || pokeNumber > 899) {
        alert('Choose a number between 1 and 898');
    } else {
        postPokemon(pokeNumber);
        $('#pokeNumberInput').val('');
    }
}

//---------------- FUNCTION REQUESTS ----------------//

function postPokemon(pokeNumber) {
    let number = {
        number: pokeNumber
    };
    $.ajax({
        method: 'POST',
        url: '/postPokemon',
        data: number
    }).then(response => {
        console.log(`Valid POST Received From Server: ${response}`);
        getPokemon();
    }).catch(response => {
        alert(`Invalid POST Received From Server: ${response}`);
    })
}

function getPokemon() {
    $.ajax({
        method: 'GET',
        url: '/getPokemon'
    }).then(response => {
        console.log(`Valid GET Received From Server: ${response}`);
        newPokemon(response);
        oldPokemon(response);
    }).catch(response => {
        alert(`Invalid POST Received From Server: ${response}`);
    })
}

//---------------- BUTTON REQUESTS ----------------//

function runAgain() {
    let number = {
        number: $(this).data(`id`)
    };
    $.ajax({
        method: 'POST',
        url: '/postPokemon',
        data: number
    }).then(response => {
        console.log(`Valid POST Received From Server: ${response}`);
        getPokemon();
    }).catch(response => {
        alert(`Invalid POST Received From Server: ${response}`);
    })
}

//---------------- HELPER FUNCTIONS ----------------//

function newPokemon(response) {
    let pokemon = response[response.length - 1];
    let el = $('#displayNewPic');
    el.empty();
    el.append(`<img id="displayPicture" src="https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg"></img>`);
    let el2 = $('#displayNew');
    el2.empty();
    el2.append(`<h3 id="displayNameNumber">${capitalFirst(pokemon.name)} is #${pokemon.id}</h3>
        <p id="displayBaseExperience">Base Experience: ${pokemon.base_experience} points</p>
        <p id="displayHeight">Height: ${pokemon.height / 10} meters</p>
        <p id="displayWeight">Weight: ${(pokemon.weight / 10 * 2.204623).toFixed(2)} pounds</p>
        <ul id="displayTypes"><u>Types:</u></ul>
        <ul id="displayAbilities"><u>Abilities:</u></ul>`
    );
    getTypes(pokemon);
    getAbilities(pokemon);
}

function getTypes(pokemon) {
    let el = $('#displayTypes');
    let string = '';
    let types = pokemon.types;
    for (i = 0; i < types.length; i++) {
        string += `<li class="pokemonTypes" id="pokemonTypes${i}">${capitalFirst(types[i].type.name)}</li>`;
    }
    el.append(string);
}

function getAbilities(pokemon) {
    let el = $('#displayAbilities');
    let string = '';
    let abilities = pokemon.abilities;
    for (i = 0; i < abilities.length; i++) {
        string += `<li class="pokemonAbilities" id="pokemonAbilities${i}">${capitalFirst(abilities[i].ability.name)}</li>`;
    }
    el.append(string);
}

function capitalFirst(word) {
    if (word.includes('-')) {
        word = word.replace('-', ' ');
        word = word.split(' ');
        word = word.map(el => {
            return `${el.charAt(0).toUpperCase()}${el.slice(1)}`;
        })
        return word.join(' ');
    }
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

//---------------- HISTORY FUNCTIONS ----------------//

function oldPokemon(response) {
    let pokemons = response.reverse().slice(1);
    let el = $('#displayOld');
    el.empty();
    el.append(`<ul id="listOldPokemon">Search History</ul>`);
    let el2 = $('#listOldPokemon');
    for (i = 0; i < pokemons.length; i++) {
        el2.append(`<li class="displayOld" id="displayOldIndex${i}"><button class="searchHistoryButton" data-id="${pokemons[i].id}">${capitalFirst(pokemons[i].name)}</button></li>`);
    }
}