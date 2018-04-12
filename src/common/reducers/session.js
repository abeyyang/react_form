import {
    SFP_LOGIN,UPDATE_SESSION,
    GATEWAY_LOGIN,GATEWAY_LOGOUT,
    CHANNEL_DATA_RECEIVED,CHANNEL_DATA_LOGIN_REQUEST,CHANNEL_DATA_LOGIN_SUCCESS,CHANNEL_DATA_LOGIN_FAILURE,
    CUSTOMER_DETAIL_REQUEST,CUSTOMER_DETAIL_SUCCESS,CUSTOMER_DETAIL_FAILURE,
    JOINT_CUSTOMER_DETAIL_REQUEST,JOINT_CUSTOMER_DETAIL_SUCCESS,JOINT_CUSTOMER_DETAIL_FAILURE,
    RELATED_SOLE_CUSTOMER_DETAIL_REQUEST,RELATED_SOLE_CUSTOMER_DETAIL_SUCCESS,RELATED_SOLE_CUSTOMER_DETAIL_FAILURE,
    CONTROL_DATA_REQUEST, CONTROL_DATA_SUCCESS, CONTROL_DATA_FAILURE,
    SESSION_INIT_REQUEST,SESSION_INIT_SUCCESS,SESSION_INIT_FAILURE
} from '../actions/session';

const initialState = {
};

const reducer = (state = initialState, action) => {
    const handlers = {
        SFP_LOGIN: (state, action) => ({ ...state, ...action.session}),
        UPDATE_SESSION: (state, action) => ({ ...state, ...action.session}),

        GATEWAY_LOGIN: (state, action) => ({ ...state}),
        GATEWAY_LOGOUT: (state, action) => (initialState),        

        SESSION_INIT_REQUEST: (state, action) => {
            return {...state, hasError: false, loaded: null}
        },
        SESSION_INIT_SUCCESS: (state, action) => {
            return {...state, loaded: true}
        },
        SESSION_INIT_FAILURE: (state, action) => {
            return {...state, loaded: false}
        },

        CHANNEL_DATA_RECEIVED: (state, action) => ({ ...state, ...action.launchChannelData}), //...parseChannelData(action.launchParamStr)}),
        CHANNEL_DATA_LOGIN_SUCCESS: (state, action) => {
            const onlineChannelData = action.response
            return {
                ...state, 
                ...onlineChannelData
            }
        },
        CHANNEL_DATA_LOGIN_FAILURE: (state, action) => ({ ...state, logon: false, hasError: true}),// TODO: if to reset previous success data
        CUSTOMER_DETAIL_REQUEST: (state, action) => {
            return {
                ...state, 
                customerDetails: {}, 
                isJointCustomer: false, 
                relatedSoleCustomerIDs: null
            }
        },
        CUSTOMER_DETAIL_SUCCESS: (state, action) => {
            const {request: {customerID}, response} = action
            const {customerDetails, channelCountryCode, channelGroupMember, customerType} = state
            customerDetails[customerID] = {
                countryISOCode : channelCountryCode,
                groupMemberCode : channelGroupMember,
                sourceSystemRolePlayerCode : customerType,
                rolePlayerIdentificationNumber : customerID,
                ...response
            }
            return {...state, customerDetails}
        },
        CUSTOMER_DETAIL_FAILURE: (state, action) => {
            const {request: {customerID}, response} = action
            const {customerDetails, channelCountryCode, channelGroupMember, customerType} = state
            delete customerDetails[customerID]
            return {...state, customerDetails, hasError: true}
        },

        JOINT_CUSTOMER_DETAIL_REQUEST: (state, action) => {
            return {...state}
        },
        JOINT_CUSTOMER_DETAIL_SUCCESS: (state, action) => {
            const {response: {relatedSoleCustomerIDs}} = action
            return {...state, relatedSoleCustomerIDs}
        },
        JOINT_CUSTOMER_DETAIL_FAILURE: (state, action) => {
            return {...state, hasError: true}
        },

        RELATED_SOLE_CUSTOMER_DETAIL_REQUEST: (state, action) => {
            return state
        },
        RELATED_SOLE_CUSTOMER_DETAIL_SUCCESS: (state, action) => {
            const {request: {customerID}, response} = action
            const {customerDetails, channelCountryCode, channelGroupMember, customerType} = state
            customerDetails[customerID] = {
                countryISOCode : channelCountryCode,
                groupMemberCode : channelGroupMember,
                sourceSystemRolePlayerCode : customerType,
                rolePlayerIdentificationNumber : customerID,
                ...response
            }
            return {...state, customerDetails}
        },
        RELATED_SOLE_CUSTOMER_DETAIL_FAILURE: (state, action) => {
            const {request: {customerID}, response} = action
            const {customerDetails, channelCountryCode, channelGroupMember, customerType} = state
            delete customerDetails[customerID]
            return {...state, customerDetails, hasError: true}
        },


        CONTROL_DATA_REQUEST: (state, action) => {
            const taxIntegration=null, systemParameterMap={}, accountTypeMapping=[], accountFormat={}
            return {...state, taxIntegration, systemParameterMap, accountTypeMapping, accountFormat}
        },
        CONTROL_DATA_SUCCESS: (state, action) => {
            const {response} = action
            return {...state, ...response}
        },
        CONTROL_DATA_FAILURE: (state, action) => {
            return {...state, hasError: true}
        }
    }
    const handler = handlers[action.type]
    return handler? handler(state, action) : state
}

export default reducer;

export const getSessionInfo = (state) => ({
    "businessLine": state.session.customerBusinessLine,
    "channelId": state.session.channelID,
    "countryCode": state.session.channelCountryCode,
    "groupMember": state.session.channelGroupMember,
    "employeeUserId": state.session.staffID,
    "hubUserId": state.session.userLegacyID,
    "hubWorkstationId": state.session.userLegacyDeviceID,
    "localeCode": state.session.locale,
    "currentTargetFunction": state.nav.currentTargetFunction
})

export const getCustomerInfo = (selectedCustomerID) => (state) => {
    const {customerID:currentCustomerID, relatedSoleCustomerIDs, customerDetails, leaderCustomerId} = state.session
    let jointCustomer, customers
    let customerID = selectedCustomerID || currentCustomerID
    if (customerID) {
        const customerDetail = customerDetails[customerID]
        if (customerDetail) {
            if (customerDetail.isJointCustomer) {
                const jointCustomerDetail = customerDetail
                jointCustomer = {
                    countryISOCode : jointCustomerDetail.countryISOCode,
                    groupMemberCode : jointCustomerDetail.groupMemberCode,
                    sourceSystemRolePlayerCode : jointCustomerDetail.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber : jointCustomerDetail.rolePlayerIdentificationNumber,
                    customerAttribute : [{
                        attributeKey : "",
                        attributeValue : ""
                    }]
                }
                customers = relatedSoleCustomerIDs.map(relatedSoleCustomerID=>{
                    const relatedSoleCustomerDetail = customerDetails[relatedSoleCustomerID]
                    const isLeader = (relatedSoleCustomerID===leaderCustomerId)
                    return {
                        countryISOCode : relatedSoleCustomerDetail.countryISOCode,
                        groupMemberCode : relatedSoleCustomerDetail.groupMemberCode,
                        sourceSystemRolePlayerCode : relatedSoleCustomerDetail.sourceSystemRolePlayerCode,
                        rolePlayerIdentificationNumber : relatedSoleCustomerDetail.rolePlayerIdentificationNumber,
                        customerAttribute : [{
                            attributeKey : (isLeader? "LEADER": ""),
                            attributeValue : (isLeader? "Y": "")
                        }]
                    }
                })
            } else {
                const soleCustomerDetail = customerDetail
                customers = [{
                    countryISOCode : soleCustomerDetail.countryISOCode,
                    groupMemberCode : soleCustomerDetail.groupMemberCode,
                    sourceSystemRolePlayerCode : soleCustomerDetail.sourceSystemRolePlayerCode,
                    rolePlayerIdentificationNumber : soleCustomerDetail.rolePlayerIdentificationNumber,
                    customerAttribute : [{
                        attributeKey : "",
                        attributeValue : ""
                    }]
                }]
            }
        }
    }
    return {jointCustomer, customers}
}
