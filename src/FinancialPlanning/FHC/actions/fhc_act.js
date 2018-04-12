export const FHC_PAGE_INIT = 'FHC_PAGE_INIT';
export const FHC_UPDATE = 'FHC_UPDATE';
export const FHC_CHANGE_TAB = 'FHC_CHANGE_TAB';
export const FHC_CHANGE_TAB_DONE = 'FHC_CHANGE_TAB_DONE';
export const FHC_COPY_AS_TEMPLATE = 'FHC_COPY_AS_TEMPLATE';
export const FHC_UPDATE_CREATE_FORM = 'FHC_UPDATE_CREATE_FORM';
export const FHC_RECEIVE_RECORD_DETIAL = 'FHC_RECEIVE_RECORD_DETIAL';
export const FHC_GET_RECORD_DETIAL = 'FHC_GET_RECORD_DETIAL';
export const FHC_INIT_VIEW_RECORD_TAB = 'FHC_INIT_VIEW_RECORD_TAB';
export const FHC_INIT_VIEW_RECORD_TAB_DONE = 'FHC_INIT_VIEW_RECORD_TAB_DONE';
export const FHC_INIT_CREATE_TAB = 'FHC_INIT_CREATE_TAB';

export const FHC_SAVE_PRIORITY_CHANGES = 'FHC_SAVE_PRIORITY_CHANGES';
export const FHC_COMMON_UPDATE_INPUT_VALUE = 'FHC_COMMON_UPDATE_INPUT_VALUE';
export const FHC_CHANGE_CHILDREN_NO = 'FHC_CHANGE_CHILDREN_NO';
export const FHC_CHANGE_CHILDREN_AGE = 'FHC_CHANGE_CHILDREN_AGE';

export const FHC_CALCULATE= 'FHC_CALCULATE';
export const FHC_SAVE_AND_CONTINUE= 'FHC_SAVE_AND_CONTINUE';
export const FHC_CHANGE_HAS_CHILD_UNDER_18= 'FHC_CHANGE_HAS_CHILD_UNDER_18';
export const FHC_CHANGE_UNIVERSITY_COUNTRY_CDE= 'FHC_CHANGE_UNIVERSITY_COUNTRY_CDE';
export const FHC_CHANGE_POST_RETIRE_YEAR= 'FHC_CHANGE_POST_RETIRE_YEAR';
export const FHC_CHANGE_TARGET_RETIRE_AGE= 'FHC_CHANGE_TARGET_RETIRE_AGE';
export const FHC_CREATE_FORM_EXPAND_ALL= 'FHC_CREATE_FORM_EXPAND_ALL';


export const initFhcPage=(request)=>({
    type: FHC_PAGE_INIT,
    customerId : request.customerId
})

export const fhcChangeTab=()=>({
    type: FHC_CHANGE_TAB
})

export const copyAsTemplate=(record)=>({
    type: FHC_COPY_AS_TEMPLATE,
    record
})

export const receiveRecordDetial=(record)=>(
    {
        type: FHC_RECEIVE_RECORD_DETIAL,
        record
    }
)


export const fhcInitViewRecordTab=()=>({
    type: FHC_INIT_VIEW_RECORD_TAB
})


export const fhcInitCreateTab=()=>({
    type: FHC_INIT_CREATE_TAB
})

export const fhcCalculate=()=>({
        type: FHC_CALCULATE
})

export const fhcSaveAndContinue=()=>({
        type: FHC_SAVE_AND_CONTINUE
})

export const savePriorityChanges=(priorityChangesObject)=>({
    type: FHC_SAVE_PRIORITY_CHANGES,
    priorityChangesObject
})

export const commonUpdateInputValue=(section, fieldName, value)=>({
    type: FHC_COMMON_UPDATE_INPUT_VALUE,
    section,
    fieldName,
    value
})

export const changeChildrenNo=(operation)=>({
    type: FHC_CHANGE_CHILDREN_NO,
    operation
})

export const changeChildrenAge=(fieldName,value)=>({
    type: FHC_CHANGE_CHILDREN_AGE,
    fieldName,
    value
})

export const changeHasChildUnder18=(value)=>({
    type: FHC_CHANGE_HAS_CHILD_UNDER_18,
    value
})

export const changeUniversityCountryCde=(value)=>({
    type: FHC_CHANGE_UNIVERSITY_COUNTRY_CDE,
    value
})

export const changePostRetireYear=(value)=>({
    type: FHC_CHANGE_POST_RETIRE_YEAR,
    value
})

export const changeTargetRetireAge=(value,customerInfo)=>({
    type: FHC_CHANGE_TARGET_RETIRE_AGE,
    value,
    customerInfo
})

export const createFormExpandAll=()=>({
    type: FHC_CREATE_FORM_EXPAND_ALL
})