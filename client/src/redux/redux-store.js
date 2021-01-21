import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {CurrencyReducer} from "./reducers/CurrencyReducer";

let reducers = combineReducers({
    currency: CurrencyReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;