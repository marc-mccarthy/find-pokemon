const express = require('express');
const axios = require('axios');
const router = express.Router();

let baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
let foundPokemon = []

router.post('/', (req, res) => {
    console.log(`Valid POST Received From Client: ${req.body.number}`);
    let fetchPokemon = axios.get(`${baseUrl}${req.body.number}`)
    fetchPokemon.then(response => {
            console.log(`Valid POST Received on Server: ${response.data.name}`)
            foundPokemon.push(response.data);
            res.sendStatus(200);
        }).catch(response => {
            console.log(`Invalid POST Received on Server: ${response}`);
        })
})

router.get('/', (req, res) => {
    console.log(`Valid GET Received From Client`);
    res.send(foundPokemon);
})

module.exports = router;