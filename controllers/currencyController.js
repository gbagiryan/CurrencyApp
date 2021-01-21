import Bank from "../models/Bank.js";

const getCurrencyRates = async (req, res) => {
    try {
        const banks = await Bank.find();
        res.status(200).json({banks});
    } catch (err) {
        res.status(500).json(err)
    }
}

export default {
    getCurrencyRates
}