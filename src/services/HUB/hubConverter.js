const retrieveInvolvedPartyDetailsIndividualConvertRequest = (params) => ({
    messageId: 'retrieveInvolvedPartyDetailsIndividual',
    sessionInfo: params.sessionInfo,
    request: {
        cdmBusinessObjectIdentification : {
            businessObjectType : "IP",
            externalReferenceNumber : params.customerID
        },
        cdmResponseScope : {
            scopeName : "OHAPE_IND",
            scopeVersion : "0001"
        },
        cdmResponseScope2 : {
            scopeName : "OHAPE_NAME",
            scopeVersion : "0001"
        },
        cdmResponseScope3 : {
            scopeName : "OHAPE_ADDR_DFLT",
            scopeVersion : "0001"
        },
        cdmResponseScope4 : {
            scopeName : "OHAPE_EMAIL",
            scopeVersion : "0001"
        },
        cdmResponseScope5 : {
            scopeName : "OHAPE_TEL_NO",
            scopeVersion : "0001"
        },
        cdmResponseScope6 : {
            scopeName : "OHAPE_CDE",
            scopeVersion : "0001"
        },
        cdmResponseScope7 : {
            scopeName : "OHAPE_ID",
            scopeVersion : "0001"
        },
        cdmResponseScope8 : {
            scopeName : "OHAPE_IP_ADD_DTLS",
            scopeVersion : "0001"
        },
        cdmResponseScope9 : {
            scopeName : "OHAPE_ADDR_CORR",
            scopeVersion : "0001"
        },
        cdmResponseScope10 : {
            scopeName : "OHAPE_ADDR_WORK",
            scopeVersion : "0001"
        },
        cdmResponseScope11 : {
            scopeName : "OHAPE_FIN_DTLS",
            scopeVersion : "0001"
        },
        coreReserveAreaDetails : [{}],
        localFieldsAreaDetails : [{}]
    }
})
const _isJointCustomer = (response) => {
    let isJointCustomer = false
    const {reasonCode: reasonCodes} = response
    if (reasonCodes && reasonCodes.length > 0) {
        const {reasonCode} = reasonCodes[0]
        isJointCustomer = ('UOH0111' === reasonCode)
    }
    return isJointCustomer
}
const retrieveInvolvedPartyDetailsIndividualConvertResponse = (response) => {
    const {individual: individuals, address: addresses} = response
    let birthDate, provinceCode, givenName, lastName, fullName
    let isJointCustomer = _isJointCustomer(response)
    if (!isJointCustomer) {
        if (individuals && individuals.length > 0) {
            const individual = individuals[0]
            birthDate = individual.birthDate
            givenName = individual.givenName
            lastName = individual.lastName
            fullName = `${givenName} ${lastName}` //TODO
        }
        if (addresses && addresses.length > 0) {
            const address = addresses[0]
            provinceCode = address.addressLine4Text
        }
    }
    return {isJointCustomer, birthDate, provinceCode, fullName}
}

const retrieveJointCustomerInformationConvertRequest = (params) => ({
    messageId: 'retrieveJointCustomerInformation',
    sessionInfo: params.sessionInfo,
    request: {
        customerIdentification: {
            customerNumber: params.customerID
        },
        coreReserveAreaDetails : [{}],
        localFieldsAreaDetails : [{}]
    }
})
const retrieveJointCustomerInformationConvertResponse = (response) => {
    const {relatedSoleCustomer: relatedSoleCustomers} = response
    let relatedSoleCustomerIDs
    if (relatedSoleCustomers && relatedSoleCustomers.length > 0) {
        relatedSoleCustomerIDs = relatedSoleCustomers.map(relatedSoleCustomer=>relatedSoleCustomer.customerSoleNumber)
    }
    return {relatedSoleCustomerIDs}
}


const hubConverter = {
    retrieveInvolvedPartyDetailsIndividualConvertRequest,
    retrieveInvolvedPartyDetailsIndividualConvertResponse,
    retrieveJointCustomerInformationConvertRequest,
    retrieveJointCustomerInformationConvertResponse
}
export default hubConverter