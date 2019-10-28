const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})

app.get('/api/quotes/random', (req, res) => {
    const quote = getRandomElement(quotes)

    res.status(200).send({quote})
})

app.get('/api/quotes', (req, res) => {
    res.status(200).send({quotes})
})