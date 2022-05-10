$(document).ready(onReady);

function onReady() {
    $('#pokeNumButton').on('click', checkData);
}

function checkData() {
    let pokeNumber = $('#pokeNumberInput').val();
    if (pokeNumber < 1 || pokeNumber > 1126) {
        alert('Choose a number between 1 and 1,126');
    } else {
        postPokemon(pokeNumber);
    }
}

function postPokemon(pokeNumber) {
    let number = {
        number: pokeNumber
    }
    $.ajax({
        method: 'POST',
        url: '/postPokemon',
        data: number
    }).then(response => {
        console.log(`Valid POST Received From Server: ${response}`)
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
        let currentPokemon = response[response.length - 1];
        let arrayPokemon = response.slice(1)
        console.log(arrayPokemon);
        let el = $('#displayPokemon');
        el.empty();
        el.append(currentPokemon.name)
    }).catch(response => {
        alert(`Invalid POST Received From Server: ${response}`);
    })
}