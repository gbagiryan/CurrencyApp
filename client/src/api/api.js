import Axios from "axios";

export const currencyApi = {
    async getCurrencies() {
        return Axios.get('/api/currencies');
    }
};