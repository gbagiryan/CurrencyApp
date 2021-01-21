import React, {useEffect, useState} from 'react';
import Main from "./Main";
import {connect} from "react-redux";
import {getCurrencies} from "../../redux/reducers/CurrencyReducer";
import {getBanks} from "../../redux/selectors/CurrencySelectors";


const MainContainer = ({banks, getCurrencies}) => {

    useEffect(() => {
        getCurrencies();
    }, [getCurrencies])

    useEffect(() => {
        SetChosenBank(banks[0]);
    }, [banks])

    const [ChosenBank, SetChosenBank] = useState();

    const [Field1, SetField1] = useState(0);
    const [Field2, SetField2] = useState(0);

    const handleChangeField1 = (event) => {
        SetField1(event.target.value);
        SetField2(event.target.value / ChosenBank.EUR.buy);
    };
    const handleChangeField2 = (event) => {
        SetField2(event.target.value);
        SetField1(event.target.value * ChosenBank.EUR.sell);
    };

    const handleChangeBank = (event) => {
        SetChosenBank(event.target.value);
        SetField2(Field1 / event.target.value.EUR.buy);
    };

    return (
        ChosenBank
            ? <Main banks={banks}
                    ChosenBank={ChosenBank}
                    Field1={Field1}
                    Field2={Field2}
                    handleChangeBank={handleChangeBank}
                    handleChangeField1={handleChangeField1}
                    handleChangeField2={handleChangeField2}/>
            : <p>Loading...</p>
    )
};

const mapStateToProps = (state) => ({
    banks: getBanks(state)
});

const actionCreators = {
    getCurrencies
};

export default connect(mapStateToProps, actionCreators)(MainContainer);
