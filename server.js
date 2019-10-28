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
    const { person } = req.query

    if (person) {
        const filteredQuotes = quotes.filter(quote => quote.person.toLowerCase() === person.toLowerCase())

        res.status(200).send({quotes: filteredQuotes})
    }

    res.status(200).send({quotes})
})

app.post('/api/quotes', (req, res) => {
    const { person, quote } = req.query

    if (!person || !quote) {
        res.status(400).send()
    }

    const newQuote = {person, quote}

    quotes.push(newQuote)
    
    res.send(201).send({quote: newQuote})
})