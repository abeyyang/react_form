export default{
    "HKHBAP":{
         "API_HOST" : "/group-sfp-war",
         //"API_HOST" : "http://localhost:9088/group-sfp-war",
         "WEB_ROOT" : "/",
         "groupMember":"HBAP",
         "countryCode":"HK",
         "lineOfBusinessCode":"PFS",
         "USE_DUMMY_DATA": false,
         "SERVICE_DUMMY_DATA_DELAY": 3000,
         "RTQ_CURRENT_VERSION": 6
    },
    "HKHBAP_SIT":{
         "API_HOST" : "http://hkl101136.hk.hsbc:9088/group-sfp-war",
         "WEB_ROOT" : "/",
         "groupMember":"HBAP",
         "countryCode":"HK",
         "lineOfBusinessCode":"PFS",
         "USE_DUMMY_DATA": false,
         "SERVICE_DUMMY_DATA_DELAY": 2000
    },
    "HKHBAP_UAT":{
         "API_HOST" : "http://sfpfe-amh-uat.cf.wgdc-drn-01.cloud.uk.hsbc/group-sfp-war",
         "WEB_ROOT" : "/",
         "groupMember":"HBAP",
         "countryCode":"HK",
         "lineOfBusinessCode":"PFS",
         "USE_DUMMY_DATA": false,
         "SERVICE_DUMMY_DATA_DELAY": 2000
    },
     "GBHBEU":{
         "API_HOST" : "http://localhost:9088/group-sfp-war",
         "WEB_ROOT" : '/',
         "groupMember":"HBEU",
         "countryCode":"GB"
    }
};
