

const sessionInfoService={
    getSessionInfo:() => {
     let SessionInfo={
            channelId:"OHB",
            custmerId:"IF200106",
            countryCode:"HK",
            employeeUserId:"WD01",
            groupMember:"HBAP",
            userId:"43382921",
            localeCode:"en_US",
            goalJourney:{
                goalId:209,
                planId:150
            }
        }
    return SessionInfo
},

getSessionInfo_:() => {
     let SessionInfo={
            channelId:"OHB",
            customerId:"IF200106",
            countryISOCode:"HK",
            employeeUserId:"WD01",
            groupMemberCode:"HBAP",
            userId:"43382921",
            localeCode:"en_US",
            sourceSystemRolePlayerCode:"CDM",
            goalJourney:{
                goalId:209,
                planId:150
            }
        }
    return SessionInfo
    },
}

export default sessionInfoService;





// X-HDR-User-Id:43382921
// X-HDR-IP-Id:IF200106
// X-HDR-IP-Segment:PFS
// X-HDR-User-Legacy-Id:WD01
// X-HDR-App-Role:ALL
// X-HDR-Channel-Id:OHB
// X-HDR-IP-CC:HK
// X-HDR-Channel-GMC:HBAP
// X-HDR-Channel-CC:HK
// X-HDR-IP-GMC:HBAP
// X-HDR-User-Legacy_Device-Id:WD01
// Content-Type:application/json