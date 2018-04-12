import {INV_RETRIEVE_GOAL_SOLUTION_DETAIL,
    GET_GOAL_SOLUTION_DETAIL,ADD_MORE_PRODUCT,
    REMOVE_PRODUCT,
    REMOVE_INV_PRODUCT,
    RECORD_SOLUTION_DETAIL,
    IAJ_GOALSUMMARY_RECORD_GOAL_SUCCESS,
    IAJ_GOALSUMMARY_REVIEW_INVESTMENT,
    IAJ_GOALSUMMARY_REVIEW_INVESTMENT_SUCCESS,
    RETRIEVE_GOAL_SUMMARY_ASSETS_HOLDING_SUCCESS,
    SAVE_DISCUSSED_PRODUCT_TO_STATE} from '../actions/goalSummary_act';
import ObjectHelper from 'common/lib/ObjectHelper';
import {combineReducers} from 'redux';
const discussReducer = (state = {alternativeProductList:[],resParams:{}}, action)=>{
    let alternativeProductListTemp = [];
    let saveMoreProduct = [];
    let blankProductRow = [
            {"alternativeProductAttributeCode": "PRD_TYPE",
			"alternativeProductAttributeValue": "add productType","rowIndex":""},
            {"alternativeProductAttributeCode": "PRD_NAME",
			"alternativeProductAttributeValue": "add productName","rowIndex":""},
            {"alternativeProductAttributeCode": "RISK",
			"alternativeProductAttributeValue": "add Level","rowIndex":""}]
        switch(action.type){
            case GET_GOAL_SOLUTION_DETAIL:
                alternativeProductListTemp = action.goalSolutionDetail.alternativeProductList;
                alternativeProductListTemp = [...alternativeProductListTemp,blankProductRow];
                alternativeProductListTemp = [...alternativeProductListTemp,Object.assign([],blankProductRow)];
                break;
            case ADD_MORE_PRODUCT:
                alternativeProductListTemp = action.goalSolutionDetail.alternativeProductList;
                alternativeProductListTemp.push(blankProductRow);
                break;
            case REMOVE_PRODUCT:
                let indexid = action.goalSolutionDetail.rowIndex;
                alternativeProductListTemp = action.goalSolutionDetail.alternativeProductList;
                alternativeProductListTemp.map((rowData,index)=>{
                    rowData.map((t,key)=>{
                        if(t.hasOwnProperty("rowIndex") && t.rowIndex == indexid){
                            console.log("rowIndex",t.hasOwnProperty("rowIndex"),index);
                            alternativeProductListTemp.splice(index,1);
                        }
                    })  
                })
                break;
            case SAVE_DISCUSSED_PRODUCT_TO_STATE:
                let moreProducts =action.params ;
                console.log("SAVE_DISCUSSED_PRODUCT_TO_STATE",moreProducts,saveMoreProduct);
                return {...state,moreProducts};
            default:
                return state;
        }
        console.log("alternativeProductListTemp",alternativeProductListTemp)
        //sort array
        alternativeProductListTemp.map((rowData,index)=>{
            rowData[0] = Object.assign({},rowData[0]);
            rowData[1] = Object.assign({},rowData[1]);
            rowData[2] = Object.assign({},rowData[2]);
            rowData[0].rowIndex = index,rowData[1].rowIndex = index,rowData[2].rowIndex = index;
       })
       return Object.assign({},state,{alternativeProductList:[...alternativeProductListTemp],resParams:action.goalSolutionDetail.resParams});
}


const invProductReducer = (state = {productCardList:[],productList:[],validationDetails:{validationList:[],totalNetWorth:{}}},action) =>{
      let productCardListTemp = [];
      
    switch(action.type){
        case GET_GOAL_SOLUTION_DETAIL:
            productCardListTemp = action.goalSolutionDetail.productCardList;
            let productList = action.goalSolutionDetail.productList;
            console.log("action.goalSolutionDetail.productList",action.goalSolutionDetail.productList,action.goalSolutionDetail.productCardList);
           return Object.assign({},state,{productCardList:[...productCardListTemp],productList:[...productList]});
        case REMOVE_INV_PRODUCT:
            let indexid = action.goalSolutionDetail.rowIndex;
            productCardListTemp = action.goalSolutionDetail.productCardList;
            productCardListTemp.map((rowData,index)=>{
                for(let i = 0;i < rowData.length;i++){
                    if(rowData[i].hasOwnProperty("rowIndex") && rowData[i].rowIndex == indexid){
                        console.log("rowIndex",rowData[i].hasOwnProperty("rowIndex"),index);
                        productCardListTemp.splice(index,1);
                        break;
                    }
                }
                })
            break;
        case IAJ_GOALSUMMARY_RECORD_GOAL_SUCCESS:
            let recordSuccessFlag = action.successFlag;
            console.log('recordSuccessFlag',recordSuccessFlag);
        return {...state,recordSuccessFlag}
        // case RECORD_SOLUTION_DETAIL:
               
        //    return state
        case IAJ_GOALSUMMARY_REVIEW_INVESTMENT_SUCCESS:
            let validationDetails = action.validationDetails;
            console.log("rdc",validationDetails);
            return {...state,validationDetails};
        case RETRIEVE_GOAL_SUMMARY_ASSETS_HOLDING_SUCCESS:
            let assetsHolding = action.assetsHolding;
            console.log("assetsHolding",assetsHolding)
            return {...state,assetsHolding};
        default:
            return state;
    }
    return Object.assign({},state,{productCardList:[...productCardListTemp]});
}
const DeclarationsReducer = (state,action) =>{
    
}
const rootRuducer = combineReducers({
    invProductReducer,
    discussReducer
})

export default rootRuducer;