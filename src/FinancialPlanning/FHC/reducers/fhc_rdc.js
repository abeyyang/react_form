import {
    FHC_PAGE_INIT,FHC_UPDATE,FHC_CHANGE_TAB_DONE,FHC_UPDATE_CREATE_FORM,FHC_GET_RECORD_DETIAL,
	FHC_INIT_VIEW_RECORD_TAB_DONE,FHC_INIT_CREATE_TAB,FHC_CALCULATE,FHC_COMMON_UPDATE_INPUT_VALUE,
    FHC_CHANGE_CHILDREN_NO,FHC_CHANGE_CHILDREN_AGE,FHC_CHANGE_HAS_CHILD_UNDER_18,FHC_CHANGE_UNIVERSITY_COUNTRY_CDE,
    FHC_CHANGE_POST_RETIRE_YEAR,FHC_CHANGE_TARGET_RETIRE_AGE,FHC_CREATE_FORM_EXPAND_ALL
} from '../actions/fhc_act';
import fhcConfig from "../../../config/fhcConfig";


const initialState = {
    keResult : {
    },
    keQuestionaire : {
    },
    selectedTab:'create',
    formData:{
            result:{
                expanded:false
            },
            aboutMe:{
                riskLevel:'0',
                childrenNo:1,
                expanded:true
            },
            growYourWealth:{
                expanded:true
            },
            criticalIllness:{
                expanded:true
            },
            protection:{
                expanded:true
            },
            education:{
                expanded:true
            },
            retirement:{
                expanded:true
            }
    },
	finHealthCheckSummaryList:[],
	overlayData : {
            result:{},
            aboutMe:{},
            growYourWealth:{},
            criticalIllness:{},
            protection:{},
            education:{},
            retirement:{}
    }   
    
};

const reducer = (state = initialState, action) => {
    console.log("FFFFFFFFFFFFFFFF reducer action==",action);
    let formData,aboutMe,retirement,protection,childrenNo;
    switch (action.type) {
        case FHC_COMMON_UPDATE_INPUT_VALUE:
            formData=state.formData;
            formData[action.section][action.fieldName] = action.value;
            return { ...state};
        case FHC_CHANGE_HAS_CHILD_UNDER_18:
            formData=state.formData;
            formData.aboutMe.hasChildUnder18 = action.value;
            formData.education.annualExp=getAssumptionAverageAmount(formData);
            return { ...state};
        case FHC_CHANGE_CHILDREN_NO:
            let operation = action.operation;
            formData=state.formData;
            aboutMe = formData.aboutMe;
            childrenNo = formData.aboutMe.childrenNo;
            if((operation=='minus'&&childrenNo<=1)||(operation=='add'&&childrenNo>=5)){
                return state;
            }
            if(operation=='minus'){
                aboutMe.childrenNo--;
            }
            else{
                aboutMe.childrenNo++;
            }
            formData.education.annualExp=getAssumptionAverageAmount(formData);
            return { ...state};
        case FHC_CHANGE_UNIVERSITY_COUNTRY_CDE:
            formData=state.formData;
            formData.aboutMe.universityCountryCde = action.value;
            formData.education.annualExp=getAssumptionAverageAmount(formData);
            return { ...state};
        case FHC_CHANGE_CHILDREN_AGE:
            let currentYear = (new Date()).getFullYear();
            formData=state.formData;
            aboutMe = formData.aboutMe;
            if(null!=action.value&&action.value.length>0){
                aboutMe[action.fieldName] = String(currentYear-Number(action.value));
            }
            else{
                aboutMe[action.fieldName] = '';
            }
            formData.education.yearTillEnterSchool = getYearTillEnterSchool(formData);
            return { ...state};
        case FHC_CHANGE_POST_RETIRE_YEAR:
            formData=state.formData;
            retirement = formData.retirement;
            retirement.postRetireYear = action.value;
            retirement.hopeLiveYear = (undefined!=retirement.targetRetireAge? Number(retirement.targetRetireAge):0)+(undefined!=retirement.postRetireYear? Number(retirement.postRetireYear):0);
            return { ...state};
        case FHC_CHANGE_TARGET_RETIRE_AGE:
            formData=state.formData;
            retirement = formData.retirement;
            retirement.targetRetireAge = action.value;
            retirement.hopeLiveYear = action.customerInfo.genderCode=='M'? fhcConfig.maleAvgMortalityAge:fhcConfig.femaleAvgMortalityAge;
            retirement.postRetireYear = retirement.hopeLiveYear - (undefined!=retirement.targetRetireAge? Number(retirement.targetRetireAge):0);
            protection = formData.protection;
            protection.yearToSupport = getProtectionYearToSupport(formData,action.customerInfo);
            return { ...state};
        case FHC_CREATE_FORM_EXPAND_ALL:
            formData=state.formData;
            formData.aboutMe.expanded = true;
            formData.growYourWealth.expanded = true;
            formData.criticalIllness.expanded = true;
            formData.protection.expanded = true;
            formData.education.expanded = true;
            formData.retirement.expanded = true;
            return { ...state};
        case FHC_UPDATE_CREATE_FORM:
            formData=action.formData;
            let selectedTab = 'create';
            return { ...state,formData,selectedTab};
		case FHC_GET_RECORD_DETIAL:
			const overlayData = action.overlayData;
            console.log("overlayData==",overlayData);
			return { ...state,overlayData};
		case FHC_INIT_VIEW_RECORD_TAB_DONE:
            selectedTab = 'view';
            // console.log("selectedTab",selectedTab);
			const finHealthCheckSummaryList = action.finHealthCheckSummaryList;
            return { ...state,finHealthCheckSummaryList,selectedTab};
        case FHC_CALCULATE:
            return { ...state}
        default:
            return state;
    }
};


const getAssumptionAverageAmount = (formData) => {
    let {hasChildUnder18,universityCountryCde,childrenNo} = formData.aboutMe;
    let amt = 0;
    if(hasChildUnder18){
        var selected = fhcConfig.spendingCountry.filter(item => {
            if(item.code==universityCountryCde){
                return item;
            }
        });
        if(null!==selected&&selected.length>0){
            amt = selected[0].amount*childrenNo;
        }
    }
    return amt;
}

const getYearTillEnterSchool = (formData) => {
    let {hasChildUnder18,childrenNo,yearOfChildrenDOB1,yearOfChildrenDOB2,yearOfChildrenDOB3,yearOfChildrenDOB4,yearOfChildrenDOB5} = formData.aboutMe;
    if(!hasChildUnder18){
        return 0;
    }
    let oldestYear;
    if(null!=yearOfChildrenDOB1&&yearOfChildrenDOB1.length>0){
        oldestYear = Number(yearOfChildrenDOB1);
    }
    if(childrenNo>1&&null!=yearOfChildrenDOB2&&yearOfChildrenDOB2.length>0&&null!=oldestYear&&oldestYear>Number(yearOfChildrenDOB2)){
        oldestYear = Number(yearOfChildrenDOB2);
    }
    if(childrenNo>2&&null!=yearOfChildrenDOB3&&yearOfChildrenDOB3.length>0&&null!=oldestYear&&oldestYear>Number(yearOfChildrenDOB3)){
        oldestYear = Number(yearOfChildrenDOB3);
    }
    if(childrenNo>3&&null!=yearOfChildrenDOB4&&yearOfChildrenDOB4.length>0&&null!=oldestYear&&oldestYear>Number(yearOfChildrenDOB4)){
        oldestYear = Number(yearOfChildrenDOB4);
    }
    if(childrenNo>4&&null!=yearOfChildrenDOB5&&yearOfChildrenDOB5.length>0&&null!=oldestYear&&oldestYear>Number(yearOfChildrenDOB5)){
        oldestYear = Number(yearOfChildrenDOB5);
    }
    if(oldestYear==null){
        return 0;
    }
    else{
        return 18-((new Date()).getFullYear()-oldestYear);
    }
}

const getProtectionYearToSupport = (formData,customerInfo) => {
    let targetRetireAge = formData.retirement.targetRetireAge;
    let age = (new Date()).getFullYear()-(new Date(customerInfo.birthDate)).getFullYear();
    let yearToSupport = (undefined!=targetRetireAge? Number(targetRetireAge):0)-age;
    return yearToSupport>0? yearToSupport:0;
}


export default reducer;