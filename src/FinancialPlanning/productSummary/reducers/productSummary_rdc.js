import {
    RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM,RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS,
    REVIEWINVESTMENT_PRODSUMM,REVIEWINVESTMENT_PRODSUMM_SUCCESS,
    RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM,RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS

} from '../actions/productSummary_act';
import ObjectHelper from 'common/lib/ObjectHelper';
import {combineReducers} from 'redux';



const discussProductReducer = (state = {alternativeProductList:[],financialGoal:{},rtvGSResponse:{}}, action)=>{
    let alternativeProductListTemp = [];
    let financialGoal = {};
    let rtvGSResponse = {};
    let blankProductRow = [
            {"alternativeProductAttributeCode": "PRD_TYPE",
			"alternativeProductAttributeValue": "add productType","rowIndex":""},
            {"alternativeProductAttributeCode": "PRD_NAME",
			"alternativeProductAttributeValue": "add productName"},
            {"alternativeProductAttributeCode": "RISK",
			"alternativeProductAttributeValue": "add Level"}]
        switch(action.type){
            case RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS:
                alternativeProductListTemp = action.goalSolutionDetail.alternativeProductList;
                alternativeProductListTemp = [...alternativeProductListTemp,blankProductRow];
                financialGoal = action.goalSolutionDetail.financialGoal;
                rtvGSResponse = action.goalSolutionDetail.rtvGSResponse;
                alternativeProductListTemp = [...alternativeProductListTemp,Object.assign([],blankProductRow)];
                break;
            case REVIEWINVESTMENT_PRODSUMM_SUCCESS:
                break;
            case RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS:
                break;    
            // case ADD_MORE_PRODUCT:
            //     alternativeProductListTemp = action.goalSolutionDetail.alternativeProductList;
            //     alternativeProductListTemp.push(blankProductRow);
            //     break;
            // case REMOVE_PRODUCT:
            //     let indexid = action.goalSolutionDetail.rowIndex;
            //     alternativeProductListTemp = action.goalSolutionDetail.alternativeProductList;
            //     alternativeProductListTemp.map((rowData,index)=>{
            //         rowData.map((t,key)=>{
            //             if(t.hasOwnProperty("rowIndex") && t.rowIndex == indexid){
            //                 console.log("rowIndex",t.hasOwnProperty("rowIndex"),index);
            //                 alternativeProductListTemp.splice(index,1);
            //             }
            //         })  
            //     })
            //     break;
            default:
                return state;
        }
        //sort array
        alternativeProductListTemp.map((rowData,index)=>{
            rowData[0] = Object.assign({},rowData[0]);
            rowData[0].rowIndex = index;
       })
        return Object.assign({},state,{alternativeProductList:[...alternativeProductListTemp],financialGoal:{...financialGoal},rtvGSResponse:{...rtvGSResponse}});
}

const insProductReducer = (state = {insProductCardList:[]}, action)=>{
    let insProductCardList = [];
        switch(action.type){
            case RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS:
                insProductCardList = action.goalSolutionDetail.insProductCardList;
                break;
            case REVIEWINVESTMENT_PRODSUMM_SUCCESS:
                break;
            case RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS:
                break;    
            // case ADD_MORE_PRODUCT:
            //     alternativeProductListTemp = action.goalSolutionDetail.alternativeProductList;
            //     alternativeProductListTemp.push(blankProductRow);
            //     break;
            // case REMOVE_PRODUCT:
            //     let indexid = action.goalSolutionDetail.rowIndex;
            //     alternativeProductListTemp = action.goalSolutionDetail.alternativeProductList;
            //     alternativeProductListTemp.map((rowData,index)=>{
            //         rowData.map((t,key)=>{
            //             if(t.hasOwnProperty("rowIndex") && t.rowIndex == indexid){
            //                 console.log("rowIndex",t.hasOwnProperty("rowIndex"),index);
            //                 alternativeProductListTemp.splice(index,1);
            //             }
            //         })  
            //     })
            //     break;
            default:
                return state;
        }
        //sort array
        insProductCardList.map((rowData,index)=>{
            rowData[0] = Object.assign({},rowData[0]);
            rowData[0].rowIndex = index;
       })
        return Object.assign({},state,{insProductCardList:[...insProductCardList]});
}

const invProductReducer = (state = {productCardList:[]},action) =>{
      let productCardListTemp = [];
    switch(action.type){
        case RETRIEVE_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS:
            productCardListTemp = action.goalSolutionDetail.productCardList;
            break;
        case REVIEWINVESTMENT_PRODSUMM_SUCCESS:
            break;
        case RECORD_GOAL_SOLUTIO_DETAIL_PRODSUMM_SUCCESS:
            break;
        // case REMOVE_INV_PRODUCT:
        //     let indexid = action.goalSolutionDetail.rowIndex;
        //     productCardListTemp = action.goalSolutionDetail.productCardList;
        //     productCardListTemp.map((rowData,index)=>{
        //         for(let i = 0;i < rowData.length;i++){
        //             if(rowData[i].hasOwnProperty("rowIndex") && rowData[i].rowIndex == indexid){
        //                 console.log("rowIndex",rowData[i].hasOwnProperty("rowIndex"),index);
        //                 productCardListTemp.splice(index,1);
        //                 break;
        //             }
        //         }
        //         })
        // break;
        default:
            return state;
    }
    return Object.assign({},state,{productCardList:[...productCardListTemp]});
}

const rootRuducer = combineReducers({
    invProductReducer,
    discussProductReducer,
    insProductReducer
});

export default rootRuducer;
