import {
    DASHBOARD_UPDATE_KE,DASHBOARD_UPDATE_RTQ,DASHBOARD_UPDATE_FNA,DASHBOARD_INIT,DASHBOARD_UPDATE_FNA_DATA,DASHBOARD_UPDATE_FNA_DATA_UPDATE,DASHBOARD_INIT_FNA_DATA,DASHBOARD_INIT_IPDETAIL,DASHBOARD_INIT_IPDETAIL_UPDATE,
    DASHBOARD_UPDATE_FHCSUMMARY_DATE,DASHBOARD_INIT_ASSETSMIX,DASHBOARD_INIT_ASSETSMIX_UPDATE,DASHBOARD_UPDATE_FHCSUMMARY_RECORED_STATE
} from '../actions/landing_act';


import {RECORD_BASE_SIJ_GOAL,BASE_SIJ_GOAL} from '../actions/sij_act';

const initialState = {
    rtqResult : {
    },
    fnaResult : [],
    keResult : [],
    keQuestionaire : {
    },
    lastDateTime:"",
    customerInfo:{},
    depositeConstentCode:'',
    result:{ },
    overlayData : {
            "createdDate":"26/07/2016",
            result:{},
            aboutMe:{},
            growYourWealth:{},
            criticalIllness:{},
            protection:{},
            education:{},
            retirement:{},
            staffId:"",
            staffName:""
    },
    financialFHcObj:{},
    haveFHCRecord:false,
    assetsMixResult:[],
    invHoldingsResult:[]
};
//action test
//----1---------2------------3------4-----------5-------

const reducer = (state = initialState, action) => {
    //you   can do your action in this code block{}
    action = { ...action, testActionResult: "test data from reducer,actionType:"+action.type+"." };
    let fnaResult
    switch (action.type) {
        case DASHBOARD_INIT:
            return { ...state};
        case DASHBOARD_UPDATE_RTQ:
            const rtqResult = action.rtqResult;
            return { ...state, rtqResult};
        case DASHBOARD_UPDATE_FNA:
             fnaResult = action.fnaResult;
            return { ...state, fnaResult};
        case DASHBOARD_UPDATE_FHCSUMMARY_DATE:
            const overlayData = action.overlayData;
            const financialFHcObj = action.financialFHcObj;
            // console.log("overlayData==",overlayData);
            // console.log("financialFHcObj==",financialFHcObj);
			return { ...state,overlayData,financialFHcObj,haveFHCRecord};
        case DASHBOARD_UPDATE_FHCSUMMARY_RECORED_STATE:
            const haveFHCRecord = action.haveFHCRecord;;
			return { ...state,haveFHCRecord};
        case DASHBOARD_UPDATE_KE:
            const keResult = action.keResult;
            const keQuestionaire = action.keQuestionaire;
            const lastDateTime=action.lastDateTime;
            return { ... state, keResult, keQuestionaire,lastDateTime};
        case DASHBOARD_UPDATE_FNA_DATA:
            console.log('DASHBOARD_UPDATE_FNA_DATA excute...');
            return { ... state};
        case DASHBOARD_UPDATE_FNA_DATA_UPDATE:
            console.log('DASHBOARD_UPDATE_FNA_DATA_UPDATE excute...');
            fnaResult = action.fnaResult;
            console.log('DASHBOARD_INIT_FNA_DATA excute...fna',fnaResult);
            return { ... state, fnaResult};
        case DASHBOARD_INIT_FNA_DATA:
            console.log('DASHBOARD_INIT_FNA_DATA excute...');
            // fnaResult = action.fnaResult;
            // console.log('DASHBOARD_INIT_FNA_DATA fnaResult...',fnaResult);
            return { ... state};
        case RECORD_BASE_SIJ_GOAL:
            console.log('record base goal sij  excute...');
            return { ... state}; 
           case BASE_SIJ_GOAL:
            console.log('record base goal sij  excute.1..');
            return { ... state};     
        case DASHBOARD_INIT_IPDETAIL:
            console.log('DASHBOARD_INIT_IPDETAIL excute...');
            return {...state};
        case DASHBOARD_INIT_IPDETAIL_UPDATE:
            let customerInfo = action.customerInfo;
            let depositeConstentCode = action.depositeConstentCode; 
            return {...state, customerInfo, depositeConstentCode};
        case DASHBOARD_INIT_ASSETSMIX:
            console.log('DASHBOARD_INIT_ASSETSMIX excute...');
            return {...state};
        case DASHBOARD_INIT_ASSETSMIX_UPDATE:
            console.log('DASHBOARD_INIT_ASSETSMIX_UPDATE excute...',action);
            const assetsMixResult = action.assetsMixResult;
            const invHoldingsResult = action.invHoldingsResult;
            console.log('DASHBOARD_INIT_ASSETSMIX_UPDATE reducer...',assetsMixResult,invHoldingsResult);
            return {...state,assetsMixResult,invHoldingsResult};
        default:
            return state;
    }
};



export default reducer;
