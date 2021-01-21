import {currencyApi} from "../../api/api";

const CURRENCY_SET_BANKS = 'CURRENCY_SET_BANKS';

const initialState = {
    banks: []
};

export const CurrencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENCY_SET_BANKS:
            return {
                ...state,
                banks: action.banks
            }
        default:
            return state
    }
};

const setBanks = (banks) => ({type: CURRENCY_SET_BANKS, banks});

export const getCurrencies = () => async (dispatch) => {
    try {
        const res = await currencyApi.getCurrencies();
        dispatch(setBanks(res.data.banks));
    } catch (err) {
        console.log(err);
    }
};