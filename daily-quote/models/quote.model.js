const DB = require('../data/database');

class Quote {

        static async getRandomQuote() {
            const quotes = await DB.getDB().collection('quotes').find().toArray();
            const randomQuoteIndex = Math.floor(Math.random() * quotes.length);

            return quotes[randomQuoteIndex].text;
        }
}

module.exports = Quote;