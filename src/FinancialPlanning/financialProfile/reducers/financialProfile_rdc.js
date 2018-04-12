import {
    INIT_FNA_ACTION, GET_FNAPROFILE_ACTION, FNA_SUBMIT_TOTAL_INCOME, FNA_SUBMIT_TOTAL_EXPENSE, FNA_RECORD_FNA_DATA,
    FNA_SAVE_FINISHED_RENDER_TO_LANDING, FNA_RESET_RENDER_INDICATOR, GET_FXRATEBYCURRENCY_ACTION, RETRIEVE_FXRATEBYCURRENCY_ACTION,
    UPDATE_ASSET_REFERENCE_RECORD, UPDATE_INCOME_REFERENCE_RECORD, UPDATE_EXPENSES_REFERENCE_RECORD, UPDATE_LIABILITIES_REFERENCE_RECORD, SOME_HSBC_RECORD_LOAD_FAILURE
} from '../actions/financialProfile_act';
import { COMPONENT_LOADING } from '../../../common/actions/nav';
const initState = {
    incomeDetail: {
        personalDetail: {},
        contriByFamliyDetial: {},
        divideIncomeDetail: {},
        rentalIncomeDetail: {},
        otherIncomeDetail: {}
    },
    expenseDetail: {
        personalDetail: {},
        mortgageRentalDetail: {},
        educationDetail: {},
        otherDetail: {},
        monthInsuranceDetail: {},
        rentalPaymentDetial: {},
        mortgageRentalPaymentRecord: {},
        monthlyInsurancePremiumRecord: {},
        lifeInsurancePremiumRecord: {}
    },
    assetsDetail: {
        otherLiquidDetail: {},
        savingCashDepositDetail: {},
        investmentDetail: {},
        investmentPropertyDetail: {},
        oridinaryCPFDetail: {},
        nonliquidTrustsDetail: {}
    },
    liabilityDetail: {
        mortgageLoanDetail: {},
        pernalLoanDetail: {},
        shortNonDetail: {},
        longNonDetail: {}
    },
    pvcIndicatorDetail: {},
    EFIndicatorDetail: {},
    dciIndicatorDetail: {},
    closeIndicator: true,
    fnaObj: {
        income: {
            total: { currencyCode: null, amount: 0 },
            detailList: []
        },
        expense: {
            totalLivingExpense: { currencyCode: null, amount: 0 },
            total: { currencyCode: null, amount: 0 },
            detailList: []
        },
        assets: {
            totalLiquidAssets: { currencyCode: null, amount: 0 },
            total: { currencyCode: null, amount: 0 },
            detailList: []
        },
        liability: {
            total: { currencyCode: null, amount: 0 },
            detailList: []
        },
        investorIndicators: [],
        dependentNo: null,
        netWorth: { currencyCode: null, amount: 0 },
        mfdNetWorth: { currencyCode: null, amount: 0 },
        savingCapacity: { currencyCode: null, amount: 0 },
        MIAESelected: {
            commentType: null,
            commentKey: null
        },
    },
    fxrateDetail: {

    },
    renderToLanding: false,
    fnaDataModel: [],
    assetReferenceRecord: {
        assetInvestmentObj: {
            amt: '',
            ccyCode: ''
        },
        assetSavingObj: {
            amt: '',
            ccyCode: ''
        },
        assetDci: { val: 'N' }
    },
    incomeReferenceRecord: {
        amt: '',
        ccyCode: ''
    },
    expensesReferenceRecord: {
        mortgageRentalPaymentRecordObj: {
            amt: '',
            ccyCode: ''
        },
        lifeInsurancePremiumRecordObj: {
            amt: '',
            ccyCode: ''
        }, monthlyInsurancePremiumRecordObj: {
            amt: '',
            ccyCode: ''
        }
    },
    liabilitiesReferenceRecord: {
        morgageLoansRecordObj: {
            amt: '',
            ccyCode: ''
        },
        otherPersonalLoansAndDebtsRecordObj: {
            amt: '',
            ccyCode: ''
        }
    },
    componentLoading: [],
    hsbcRecordErrors: []
};

const reducer = (state = initState, action) => {
    let incomeDetail;
    let assetsDetail;
    let expenseDetail;
    let liabilityDetail;
    let pvcIndicatorDetail;
    let EFIndicatorDetail;
    let dciIndicatorDetail;
    let fnaObj;
    let fnaDataModel;
    let assetReferenceRecord;
    let incomeReferenceRecord;
    let expensesReferenceRecord;
    let liabilitiesReferenceRecord;
    let hsbcRecordErrors;
    switch (action.type) {
        case FNA_RECORD_FNA_DATA:
            return { ...state };
        case INIT_FNA_ACTION:
            console.trace("clear hsbcRecordError about loading", action.responseWithError);
            hsbcRecordErrors = [];
            return { ...state, hsbcRecordErrors };
        case SOME_HSBC_RECORD_LOAD_FAILURE:
            console.trace("add loading failure", action);
            hsbcRecordErrors = state.hsbcRecordErrors;
            hsbcRecordErrors.push(action.responseWithError);
            return { ...state, hsbcRecordErrors };
        case FNA_SUBMIT_TOTAL_EXPENSE:
            return { ...state, closeIndicator: false };
        case GET_FNAPROFILE_ACTION:
            incomeDetail = action.incomeDetail;
            assetsDetail = action.assetsDetail;
            expenseDetail = action.expenseDetail;
            liabilityDetail = action.liabilityDetail;
            pvcIndicatorDetail = action.pvcIndicatorDetail;
            EFIndicatorDetail = action.EFIndicatorDetail;
            dciIndicatorDetail = action.dciIndicatorDetail;
            fnaDataModel = action.fnaDataModel;
            fnaObj = action.fnaObject;
            console.log("get financialSituationDetail", fnaDataModel);
            console.log("get assetsDetail", assetsDetail);
            console.log("get fnaObj,,,", fnaObj);
            return { ...state, fnaObj, incomeDetail, expenseDetail, assetsDetail, liabilityDetail, pvcIndicatorDetail, EFIndicatorDetail, dciIndicatorDetail, fnaDataModel };
        case RETRIEVE_FXRATEBYCURRENCY_ACTION:
            return { ...state };
        case GET_FXRATEBYCURRENCY_ACTION:
            const fxrateDetail = action.fxrateDetail;
            console.log("rdc get fxrateDetail,,,", fxrateDetail);
            return { ...state, fxrateDetail };
        case FNA_SAVE_FINISHED_RENDER_TO_LANDING:
            let renderToLanding = action.isRender;
            return { ...state, renderToLanding };
        case FNA_RESET_RENDER_INDICATOR:
            return { ...state, renderToLanding: false };

        case UPDATE_ASSET_REFERENCE_RECORD:
            assetReferenceRecord = action.assetReferenceRecord;
            console.log("assetReferenceRecord reducer", assetReferenceRecord);
            return { ...state, assetReferenceRecord };
        case UPDATE_INCOME_REFERENCE_RECORD:
            incomeReferenceRecord = action.incomeReferenceRecord;
            console.log("incomeReferenceRecord reducer", incomeReferenceRecord);
            return { ...state, incomeReferenceRecord };
        case UPDATE_EXPENSES_REFERENCE_RECORD:
            expensesReferenceRecord = action.expensesReferenceRecord;
            return { ...state, expensesReferenceRecord };
        case UPDATE_LIABILITIES_REFERENCE_RECORD:
            liabilitiesReferenceRecord = action.liabilitiesReferenceRecord;
            return { ...state, liabilitiesReferenceRecord };
        case COMPONENT_LOADING:
            if (action.toggle)
                state.componentLoading[action.componentName] = 1;
            else state.componentLoading[action.componentName] = 0;
            console.trace("fp rdc loading", action);
            return state;
        default:
            return state;
    }
}

export default reducer;