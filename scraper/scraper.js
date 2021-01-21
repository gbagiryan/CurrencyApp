import axios from "axios";
import cheerio from 'cheerio';
import Bank from "../models/Bank.js";
import mongoose from "mongoose";

const banksToScrape = [
    {
        bankName: 'Converse',
        bankUrl: 'https://www.conversebank.am/hy/exchange-rate/',
        eurBuyQuery: '#main_static_content > table:nth-child(5) > tbody > tr:nth-child(4) > td:nth-child(4)',
        eurSellQuery: '#main_static_content > table:nth-child(5) > tbody > tr:nth-child(4) > td:nth-child(5)'
    },
    {
        bankName: 'HSBC',
        bankUrl: 'https://www.hsbc.am/en-am/help/rates/',
        eurBuyQuery: '#content_main_basicTable_1 > table > tbody > tr:nth-child(6) > td:nth-child(4)',
        eurSellQuery: '#content_main_basicTable_1 > table > tbody > tr:nth-child(6) > td:nth-child(5)'
    },

];

let scrapedData = [];

const scrapeBanks = async (banksToScrape) => {
    for (let bank of banksToScrape) {
        try {
            const {data} = await axios.get(bank.bankUrl);
            const $ = cheerio.load(data);
            const buy = $(bank.eurBuyQuery).text();
            const sell = $(bank.eurSellQuery).text();

            scrapedData.push({
                bankName: bank.bankName,
                EUR: {
                    currency: 'EUR',
                    buy,
                    sell,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}

const updateCurrencyRatesInDB = async () => {
    try {
        await scrapeBanks(banksToScrape);
        for (let bankData of scrapedData) {
            await Bank.updateOne({bankName: bankData.bankName}, bankData, {new: true, upsert: true});
        }
        console.log('Currencies were updated');
    } catch (err) {
        console.log(err);
    }
};

await mongoose.connect('mongodb+srv://gbagiryan:b55a1g7i7r2y1a1n@cluster0.fou20.mongodb.net/banks?retryWrites=true&w=majority', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

await updateCurrencyRatesInDB();
await mongoose.disconnect();