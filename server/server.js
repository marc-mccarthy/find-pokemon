const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser')
const pokedex = require('./routes/pokedex')

app.use(express.static('./server/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/postPokemon', pokedex)
app.use('/getPokemon', pokedex)

app.listen(port, (req, res) => {
    `Server is on ${port}`;
})