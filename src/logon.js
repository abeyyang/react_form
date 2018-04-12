
// import QASApi from "./services/QASService/QASService";
// import keCommonService from './services/QASService/keCommonService';

const splitQueryString = (queryString) => {
    
    var invalidCharacterList = ["<",">","\"","'","%","^","?","!","&"]; //invalidCharacters = "<>\"'%^?!&";

    var paramPairStrs = queryString.split("&");
    var paramObj = {};
    for (var i=0, len=paramPairStrs.length; i<len; i++) {
        var paramPairStr = paramPairStrs[i]
        var pos = paramPairStr.indexOf("="),
        key = (-1!==pos)? paramPairStr.substr(0,pos): null,
        value = (-1!==pos)? paramPairStr.substr(pos+1): null;
        if (key) {
            paramObj[key] = unescape(value);

            for (var index = 0; index < invalidCharacterList.length; ++index) {
                if (paramObj[key].indexOf(invalidCharacterList[index]) >= 0) {
                    paramObj[key] = paramObj[key].replace(invalidCharacterList[index], "");
                }	           
            }       	
        }
    }
    return paramObj;
}

const parseChannelData = () => {

    var targetFunction = "";
    var serviceMode = "";
    var parsingChannelData = {};

    var paramFullStr = window.location.search.substr("?".length);
    var paramObj = {};
    var responseObj ={};
    var state ="";
    var encryptedState = null;

    if (paramFullStr) {
        paramObj = splitQueryString(paramFullStr);
        if (paramObj["serviceMode"] == null)
            serviceMode = "online";
        else
            serviceMode = paramObj["serviceMode"];
        console.debug("service Mode: " + serviceMode);

        var d = new Date();
        var n = d.getTime();

        if (paramObj["encryptedState"] == null) {
            encryptedState = "";
            state = "ChannelID=" + paramObj["ChannelID"] + "&" +
                    "HSBC_OHD_CHANNEL_COUNTRY_CODE=" + paramObj["HSBC_OHD_CHANNEL_COUNTRY_CODE"] + "&" +
                    "HSBC_OHD_CHANNEL_GROUP_MEMBER_ID=" + paramObj["HSBC_OHD_CHANNEL_GROUP_MEMBER_ID"] + "&" + 
                    "HSBC_OHD_STAFF_ID=" + paramObj["HSBC_OHD_STAFF_ID"] + "&" + 
                    "MANUAL_TAGGING_STAFF_ID=" + paramObj["MANUAL_TAGGING_STAFF_ID"] + "&" +
                    "MANUAL_TAGGING_STAFF_NAME=" + paramObj["MANUAL_TAGGING_STAFF_NAME"] + "&" +				
                    "HSBC_OHD_USER_LEGACY_ID=" + (paramObj["HSBC_OHD_USER_LEGACY_ID"] || "WD01") + "&" + 
                    "HSBC_OHD_USER_LEGACY_DEVICE_ID=" + (paramObj["HSBC_OHD_USER_LEGACY_DEVICE_ID"] || "WD01") + "&" + 				
                    "planID=" + paramObj["planID"] + "&" + 
                    "goalID=" + paramObj["goalID"] + "&" + 
                    "goalType=" + paramObj["goalType"] + "&" + 
                    "sourcePage=" + paramObj["sourcePage"] + "&" + 
                    "IPID=" + paramObj["IPID"] + "&" + 
                    "PROSPECTID=" + paramObj["PROSPECTID"] + "&" + 
                    "IPCC=" + paramObj["IPCC"] + "&" +
                    "IPGMC=" + paramObj["IPGMC"] + "&" +
                    "IPType=" + paramObj["IPType"] + "&" + 
                    "TimeStamp=" + n;
        } else {
            encryptedState=paramObj["encryptedState"];
            state = "";
        }

        console.debug("state: " + state);

        parsingChannelData.timezone = paramObj["HSBC_OHD_DISPLAY_TIMEZONE"];
        parsingChannelData.locale = paramObj["launchLocale"];
        parsingChannelData.customerType=paramObj["HSBC_OHD_CUSTOMER_TYPE"];
        parsingChannelData.leadId = paramObj["LEAD_ID"];
        parsingChannelData.userLegacyID = paramObj["HSBC_OHD_USER_LEGACY_ID"] || "WD01";
        parsingChannelData.userLegacyDeviceID = paramObj["HSBC_OHD_USER_LEGACY_DEVICE_ID"] || "WD01";

        parsingChannelData.channelOperationUnit = paramObj["channelOperationUnit"] || "373";
        parsingChannelData.customerOperationalUnit = paramObj["customerOperationalUnit"] || "392";
        parsingChannelData.customerSegment = paramObj["customerSegment"] || "";
        parsingChannelData.launchCommand = paramObj["launchCommand"] || "TRUE";
        parsingChannelData.siteID = paramObj["siteID"] || "GPLWD";
        parsingChannelData.staffLaunch = paramObj["staffLaunch"] || "TRUE";
        parsingChannelData.userDeviceID = paramObj["userDeviceID"] || "127.0.0.1";
        
        parsingChannelData.manualTaggingStaffId = paramObj["MANUAL_TAGGING_STAFF_ID"];
        parsingChannelData.manualTaggingStaffName = paramObj["MANUAL_TAGGING_STAFF_NAME"];

        parsingChannelData.planID = paramObj["planID"];
        parsingChannelData.goalID = paramObj["goalID"];
        parsingChannelData.goalType = paramObj["goalType"];
        parsingChannelData.sourcePage = paramObj["sourcePage"];
        
        targetFunction=paramObj["targetFunction"] || 'rtq';
        parsingChannelData.targetFunction = targetFunction;

        parsingChannelData.cacheBust = paramObj["cacheBust"];
        
        if("online" == serviceMode){
            console.log("post");
            var encryptedStateJSON = '"encryptedState": "' + encryptedState + '"';
            var stateJSON = '"state": "' + state + '"';
            var targetFunctionJson  = '"targetFunction": "' + targetFunction + '"';

            var text = '{' + encryptedStateJSON + ',' + stateJSON + ',' + targetFunctionJson + '}';
            //var text = '{' + encryptedStateJSON + ',' + stateJSON + '}';

            fetch ("/group-sfp-war/gateway/authcontroller/logon",
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                credentials: 'include',
                body: text
            })
            .then(function (responseData) {
                parsingChannelData.channelCountryCode = responseData.staffInfo.countryCode;
                parsingChannelData.channelGroupMember = responseData.staffInfo.groupMemberCode;
                parsingChannelData.staffID = responseData.staffInfo.staffId;
                //channelData.staffName = responseData.staffInfo.name;
                
                responseObj = splitQueryString(responseData.data);
                if(responseObj["HSBC_OHD_STAFF_NAME"]){
                    parsingChannelData.staffName = responseObj["HSBC_OHD_STAFF_NAME"];
                }else{
                    parsingChannelData.staffName = responseData.staffInfo.name;
                }
                var _updateChannelDataByServerDataIfExist = function(channelDataKey, serverDataKey) {
                    var _data = responseObj[serverDataKey];
                    if (null != _data) {
                        parsingChannelData[channelDataKey] = _data;
                    }
                };
                _updateChannelDataByServerDataIfExist("channelID", "ChannelID");
                _updateChannelDataByServerDataIfExist("customerID", "IPID");
                _updateChannelDataByServerDataIfExist("prospectID", "PROSPECTID");
                _updateChannelDataByServerDataIfExist("customerCountryCode", "IPCC");
                _updateChannelDataByServerDataIfExist("customerGroupMember", "IPGMC");
                _updateChannelDataByServerDataIfExist("customerBusinessLine", "IPType");
                _updateChannelDataByServerDataIfExist("manualTaggingStaffId", "MANUAL_TAGGING_STAFF_ID");
                _updateChannelDataByServerDataIfExist("manualTaggingStaffName", "MANUAL_TAGGING_STAFF_NAME");
                _updateChannelDataByServerDataIfExist("planID", "planID");
                _updateChannelDataByServerDataIfExist("goalID", "goalID");
                _updateChannelDataByServerDataIfExist("goalType", "goalType");
                _updateChannelDataByServerDataIfExist("sourcePage", "sourcePage");
            })
            .catch(function(res){ console.log("ajax logon call fail ? ..", res); })

            // $.ajax({
            //     type: "POST",
            //     url: "/group-sfp-war/gateway/authcontroller/logon",
            //     data: text,
            //     dataType: "json",
            //     async: false,
            //     error: function(jqxhr) {
            //         console.log("ajax logon call fail ? ..", jqxhr);
            //         // window.location.href = "/1/3";
            //     }
            // }).done(function (responseData) {
            //     parsingChannelData.channelCountryCode = responseData.staffInfo.countryCode;
            //     parsingChannelData.channelGroupMember = responseData.staffInfo.groupMemberCode;
            //     parsingChannelData.staffID = responseData.staffInfo.staffId;
            //     //channelData.staffName = responseData.staffInfo.name;
                
            //     responseObj = splitQueryString(responseData.data);
            //     if(responseObj["HSBC_OHD_STAFF_NAME"]){
            //         parsingChannelData.staffName = responseObj["HSBC_OHD_STAFF_NAME"];
            //     }else{
            //         parsingChannelData.staffName = responseData.staffInfo.name;
            //     }
            //     var _updateChannelDataByServerDataIfExist = function(channelDataKey, serverDataKey) {
            //         var _data = responseObj[serverDataKey];
            //         if (null != _data) {
            //             parsingChannelData[channelDataKey] = _data;
            //         }
            //     };
            //     _updateChannelDataByServerDataIfExist("channelID", "ChannelID");
            //     _updateChannelDataByServerDataIfExist("customerID", "IPID");
            //     _updateChannelDataByServerDataIfExist("prospectID", "PROSPECTID");
            //     _updateChannelDataByServerDataIfExist("customerCountryCode", "IPCC");
            //     _updateChannelDataByServerDataIfExist("customerGroupMember", "IPGMC");
            //     _updateChannelDataByServerDataIfExist("customerBusinessLine", "IPType");
            //     _updateChannelDataByServerDataIfExist("manualTaggingStaffId", "MANUAL_TAGGING_STAFF_ID");
            //     _updateChannelDataByServerDataIfExist("manualTaggingStaffName", "MANUAL_TAGGING_STAFF_NAME");
            //     _updateChannelDataByServerDataIfExist("planID", "planID");
            //     _updateChannelDataByServerDataIfExist("goalID", "goalID");
            //     _updateChannelDataByServerDataIfExist("goalType", "goalType");
            //     _updateChannelDataByServerDataIfExist("sourcePage", "sourcePage");
            // })
        } else {
            parsingChannelData.channelID = paramObj["ChannelID"];
            parsingChannelData.channelCountryCode = paramObj["HSBC_OHD_CHANNEL_COUNTRY_CODE"];
            parsingChannelData.channelGroupMember = paramObj["HSBC_OHD_CHANNEL_GROUP_MEMBER_ID"];
            parsingChannelData.staffID = paramObj["HSBC_OHD_STAFF_ID"];
            if(paramObj["HSBC_OHD_STAFF_NAME"]){
                parsingChannelData.staffName = paramObj["HSBC_OHD_STAFF_NAME"];
            }else{
                parsingChannelData.staffName = "";
            }
            parsingChannelData.staffUserGroup = [];
            parsingChannelData.customerID = paramObj["IPID"];
            parsingChannelData.prospectID = paramObj["PROSPECTID"];
            parsingChannelData.customerCountryCode = paramObj["IPCC"];
            parsingChannelData.customerGroupMember = paramObj["IPGMC"];
            parsingChannelData.customerBusinessLine = paramObj["IPType"];
        }
        
        var localeParts = parsingChannelData.locale.split("_");
        parsingChannelData.localeLanguage = localeParts[0] || "en";
        parsingChannelData.localeCountry = localeParts[1] || parsingChannelData.channelCountryCode;
        
        //UK performance testing: to change the country code and group member code to FR
        // if(channelData.channelCountryCode == 'GB'){
        // 	channelData.channelCountryCode = 'FR';
        // }
        // if(channelData.channelGroupMember == 'HBEU'){
        // 	channelData.channelGroupMember = 'HBFR';
        // }
        
        //Prospect flow testing:
        parsingChannelData.prospectID = paramObj["PROSPECTID"];
        
        parsingChannelData.backActionURL = paramObj["backActionURL"];
        parsingChannelData.continueActionURL = paramObj["continueActionURL"];
        parsingChannelData.URL_REDIRECT_ACTION = paramObj["URL_REDIRECT_ACTION"];

        // SFP Framework Internal flag
        parsingChannelData.enableMarkScreen = paramObj["enableMarkScreen"];


        fetch ("/group-sfp-war/gateway/controller/sfp/questionnaireService/retrieveQuestionnaireResponseDetail",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            credentials: 'include',
            body: JSON.stringify({"customers":[{"countryISOCode":"HK","groupMemberCode":"HBAP","rolePlayerIdentificationNumber":"CNHSBC506035781","sourceSystemRolePlayerCode":"CDM"}],"detailSearchCriteria":{"localeCode":"en_US","searchFunctionCode":"L"},"questionnaireKey":{"countryISOCode":"HK","groupMemberCode":"HSBC","lineOfBusinessCode":"PFS","questionnaireTypeCode":"RTQ"},"searchCriteria":[{"key":"RESP_TYPE","value":"SOLE"}]})
        })
        .then(function(res){ console.debug("----------------------------> fire.", res); })
        .catch(function(res){ console.log(res) })
    }

    return parsingChannelData;
}

export const logon=() =>{
    console.debug("Going to logon app.");
    return parseChannelData();
}