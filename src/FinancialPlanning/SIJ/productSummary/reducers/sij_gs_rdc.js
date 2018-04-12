import {
    SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL,SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL_SUCCESS,
    SIJ_GS_REVIEWINVESTMENT,SIJ_GS_REVIEWINVESTMENT_SUCCESS,
    SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL,SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL_SUCCESS,SIJ_GET_QUOTE_OVERLAY,
    SHOW_GET_QUOTE_OVERLAY,UPDATE_GET_QUOTE_DATA_FORM,
    SIJ_GS_UPDATE_FORM_DATA,SIJ_GS_UPDATE_FORM_DATA_SUCCESS,
    SIJ_GS_ADD_MORE_DISCUSS_PRODUCT, SIJ_GS_ADD_MORE_DISCUSS_PRODUCT_SUCCESS,
    SIJ_GS_REMOVE_DISCUSS_PRODUCT,SIJ_GS_REMOVE_DISCUSS_PRODUCT_SUCCESS,
    SIJ_GS_REMOVE_INS_PRODUCT,SIJ_GS_REMOVE_INS_PRODUCT_SUCCESS
} from '../actions/sij_gs_act';
import {combineReducers} from 'redux';

const initialState = {
    goalSolutionDetailData :{
        rtvResponse : {},
        insProductCardList : [],
        alternativeProductList : [],
        financialGoal : {},
        getQuoteData:{
            currencyCodeList:[],
            selectCurrencyCode:'HKD'
        },
        goMeetingSummaryFlag : false
    },
    customerDeclaration : [
        {
            declarationCode : 'UNFLD_BUY_PRUP',
            declarationValue : 'N',
            reasonDeclarationTextSize : 99999,
            reasonDeclarationText : ''
        },
        {
            declarationCode : 'PROCEED_INS_POLICY',
            declarationValue : 'N',
            reasonDeclarationTextSize : 99999,
            reasonDeclarationText : ''
        },
        {
            declarationCode : 'ALT_PROD_RECOMM',
            declarationValue : 'N',
            reasonDeclarationTextSize : 99999,
            reasonDeclarationText : ''
        },
        {
            declarationCode : 'INS_MUL_PURCHASE_ACK',
            declarationValue : 'N',
            reasonDeclarationTextSize : 99999,
            reasonDeclarationText : ''
        },
        {
            declarationCode : 'PRD_NOT_SUIT_ACK',
            declarationValue : 'N',
            reasonDeclarationTextSize : 99999,
            reasonDeclarationText : ''
        }
    ]
};

const Reducer = (state = initialState, action)=>{
    let newState = {...state};
    let alternativeProductList = {};
    let blankProductRow = [
            {"alternativeProductAttributeCode": "PRD_TYPE",
			"alternativeProductAttributeValue": "add productType","rowIndex":""},
            {"alternativeProductAttributeCode": "PRD_NAME",
			"alternativeProductAttributeValue": "add productName"},
            {"alternativeProductAttributeCode": "RISK",
			"alternativeProductAttributeValue": "add Level"}]
        switch(action.type){
            case SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL:
                return state;
            case SIJ_GS_RETRIEVE_GOAL_SOLUTIO_DETAIL_SUCCESS:
                let goalSolutionDetailData = action.goalSolutionDetailData;
                alternativeProductList = action.goalSolutionDetailData.alternativeProductList;
                alternativeProductList = [...alternativeProductList,blankProductRow];
                alternativeProductList = [...alternativeProductList,Object.assign([],blankProductRow)];
                alternativeProductList.map((rowData,index)=>{
                        rowData[0] = Object.assign({},rowData[0]);
                        rowData[1] = Object.assign({},rowData[1]);
                        rowData[2] = Object.assign({},rowData[2]);
                        rowData[0].rowIndex = index,rowData[1].rowIndex = index,rowData[2].rowIndex = index;
                })
                newState.goalSolutionDetailData = action.goalSolutionDetailData;
                goalSolutionDetailData.alternativeProductList = alternativeProductList;
                // newState.goalSolutionDetailData = Object.assign({}, newState.goalSolutionDetailData.alternativeProductList, alternativeProductList);
                newState.goalSolutionDetailData = goalSolutionDetailData;
                return newState;
            case SIJ_GS_REVIEWINVESTMENT:
                return newState;
            case SIJ_GS_REVIEWINVESTMENT_SUCCESS:
                return newState;
            case SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL:
                return newState;
            case SIJ_GS_RECORD_GOAL_SOLUTIO_DETAIL_SUCCESS:
                newState.goalSolutionDetailData.goMeetingSummaryFlag = true;
                return newState;
            case SIJ_GS_UPDATE_FORM_DATA:
                return newState;
            case SIJ_GS_UPDATE_FORM_DATA_SUCCESS:
                newState.customerDeclaration = action.customerDeclaration;
                return newState;
            case SIJ_GS_ADD_MORE_DISCUSS_PRODUCT:
                alternativeProductList = action.request.alternativeProductList;
                alternativeProductList.push(blankProductRow);
                 alternativeProductList.map((rowData,index)=>{
                        rowData[0] = Object.assign({},rowData[0]);
                        rowData[1] = Object.assign({},rowData[1]);
                        rowData[2] = Object.assign({},rowData[2]);
                        rowData[0].rowIndex = index,rowData[1].rowIndex = index,rowData[2].rowIndex = index;
                 })
                return {newState,...{goalSolutionDetailData:{alternativeProductList:[...alternativeProductList]}}};
            case SIJ_GS_ADD_MORE_DISCUSS_PRODUCT_SUCCESS:
                return newState;
            case SIJ_GS_REMOVE_DISCUSS_PRODUCT:
                let indexid = action.request.rowIndex;
                alternativeProductList = action.request.alternativeProductList;
                alternativeProductList.map((rowData,index)=>{
                    rowData.map((t,key)=>{
                        if(t.hasOwnProperty("rowIndex") && t.rowIndex == indexid){
                            console.log("rowIndex",t.hasOwnProperty("rowIndex"),index);
                            alternativeProductList.splice(index,1);
                        }
                    })  
                })
                return {newState,...{goalSolutionDetailData:{alternativeProductList:[...alternativeProductList]}}};
            case SIJ_GS_REMOVE_DISCUSS_PRODUCT_SUCCESS:
                return newState;
            case SIJ_GS_REMOVE_INS_PRODUCT:
                return newState;
            case SIJ_GS_REMOVE_INS_PRODUCT_SUCCESS:
                // let indexid = action.goalSolutionDetailData.rowIndex;
                // alternativeProductListTemp = action.goalSolutionDetailData.alternativeProductList;
                // alternativeProductListTemp.map((rowData,index)=>{
                //     rowData.map((t,key)=>{
                //         if(t.hasOwnProperty("rowIndex") && t.rowIndex == indexid){
                //             console.log("rowIndex",t.hasOwnProperty("rowIndex"),index);
                //             alternativeProductListTemp.splice(index,1);
                //         }
                //     })  
                // })
           case SHOW_GET_QUOTE_OVERLAY:
           
                        //  newState.goalSolutionDetail.needEvaluationList.supportFamilyAmount = Object.assign({}, newState.goalSolutionDetail.needEvaluationList.supportFamilyAmount, action.field);
           //let newState = {...state};
           let getQuoteData={
               getQuoteData:action.updateData
           }
           newState.goalSolutionDetailData = Object.assign({}, newState.goalSolutionDetailData, getQuoteData);
           return  newState;
          case UPDATE_GET_QUOTE_DATA_FORM:
        //       debugger;
        //     let newState = {...state};
        //    let updateQuoteData={
        //        action:action
        //    }
        //    newState.goalSolutionDetailData = Object.assign({}, newState.goalSolutionDetailData, getQuoteData);  
            return newState; 
            default:
                return state;
        }
        //sort array
    //     alternativeProductListTemp.map((rowData,index)=>{
    //         rowData[0] = Object.assign({},rowData[0]);
    //         rowData[0].rowIndex = index;
    //    })
        
}

export default Reducer;
