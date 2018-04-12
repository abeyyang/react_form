const sampleInitState = { 
    formSample : {
        inputValue : 'X',
        amountValue : 3000,
        amountCurrency : 'EUR',
        checkboxValue : 'URGENT',
        radioValue : 'N',
        singleDropdownValue : 'AOC',
        multipleDropdownValue : ['AOC', 'FR'],
        textAreaText: 'This is a text area.',
        dateValue: new Date().toString()
    },

    recordList: [],

    layoutSample : {
        whoKnow : 'I dont'
    },

    pageControl : {
        expandAll : false
    }
};

const reducer = (state = sampleInitState, action) => {

    let newState = {...state};

    switch (action.type) {
        case "sample_updateField":
            newState.formSample = Object.assign({}, newState.formSample, action.field);
            return newState;
        case "sample_addRecord":
            newState.recordList.push(state.formSample);
            newState.formSample = Object.assign({}, {
                inputValue : 'NA',
                amountValue : 5000,
                amountCurrency : 'HKD',
                checkboxValue : 'URGENT',
                radioValue : 'Y',
                singleDropdownValue : 'AMH',
                multipleDropdownValue : ['CA', 'FR'],
                textAreaText: 'This is a text area. in a new record.',
                dateValue: new Date().toString()
            });
            return newState;
        default:
            return state;
    }
};

export default reducer;