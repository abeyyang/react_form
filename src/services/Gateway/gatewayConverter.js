

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

const channelDataConverter = (launchParamStr) => {
    var targetFunction = "";
    var serviceMode = "";
    var parsingChannelData = {};

    // var paramFullStr = window.location.search.substr("?".length);
    var paramObj = {};
    var responseObj ={};
    var state ="";
    var encryptedState = null;

    if (launchParamStr) {
        parsingChannelData.launchParamStr = launchParamStr
        
        paramObj = splitQueryString(launchParamStr);
        if (paramObj["serviceMode"] == null)
            serviceMode = "online";
        else
            serviceMode = paramObj["serviceMode"];
        console.debug("service Mode: " + serviceMode);

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
        
        const ts = new Date().getTime();
        if("online" == serviceMode){
            parsingChannelData.online = ("online" == serviceMode)

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
                        "TimeStamp=" + ts;
            } else {
                encryptedState=paramObj["encryptedState"];
                state = "";
            }

            console.debug("state: " + state);
            parsingChannelData.encryptedState = encryptedState
            parsingChannelData.state = state
        }
        // else {
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
        //}
        
        var localeParts = parsingChannelData.locale.split("_");
        parsingChannelData.localeLanguage = localeParts[0] || "en";
        parsingChannelData.localeCountry = localeParts[1] || parsingChannelData.channelCountryCode;
        
        parsingChannelData.prospectID = paramObj["PROSPECTID"];
        
        parsingChannelData.backActionURL = paramObj["backActionURL"];
        parsingChannelData.continueActionURL = paramObj["continueActionURL"];
        parsingChannelData.URL_REDIRECT_ACTION = paramObj["URL_REDIRECT_ACTION"];

        // SFP Framework Internal flag
        parsingChannelData.enableMarkScreen = paramObj["enableMarkScreen"];

        // TODO: remove as it is old AMH react design.
        parsingChannelData.countryISOCode = parsingChannelData.channelCountryCode
        parsingChannelData.groupMemberCode = parsingChannelData.channelGroupMember
        parsingChannelData.customerId = parsingChannelData.customerID
        parsingChannelData.sourceSystemRolePlayerCode = parsingChannelData.customerType
        parsingChannelData.staffId = parsingChannelData.staffID
        parsingChannelData.channelId = parsingChannelData.channelID
        parsingChannelData.lineOfBusinessCode = parsingChannelData.customerBusinessLine
        parsingChannelData.localeCode = parsingChannelData.locale


        const {customerID, prospectID, customerType} = parsingChannelData
        if ("P" === customerType || prospectID) {
            parsingChannelData.customerType = "CRMS"
            parsingChannelData.customerID = prospectID || customerID
        } else if (customerID) {
            parsingChannelData.customerType = "CDM"
        }

        parsingChannelData.leaderCustomerId = null

        // TODO: remove
        parsingChannelData.countryISOCode = parsingChannelData.channelCountryCode
        parsingChannelData.groupMemberCode = parsingChannelData.channelGroupMember
        parsingChannelData.customerId = parsingChannelData.customerID
        parsingChannelData.sourceSystemRolePlayerCode = parsingChannelData.customerType
    }

    return parsingChannelData;
}

const logonConvertRequest = (params) => ({
    messageId: 'logon',
    sessionInfo: params.sessionInfo,
    request: {
        encryptedState: params.encryptedState, 
        state: params.state,
        targetFunction: params.targetFunction
    }
})
const logonConvertResponse = (response) => {
    var parsingChannelData = {}
    parsingChannelData.channelCountryCode = response.staffInfo.countryCode;
    parsingChannelData.channelGroupMember = response.staffInfo.groupMemberCode;
    parsingChannelData.staffID = response.staffInfo.staffId;

    var responseObj = splitQueryString(response.data);
    if(responseObj["HSBC_OHD_STAFF_NAME"]){
        parsingChannelData.staffName = responseObj["HSBC_OHD_STAFF_NAME"];
    }else{
        parsingChannelData.staffName = response.staffInfo.name;
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

    return parsingChannelData
    // return params
}


const gatewayConverter = {
    channelDataConverter,
    logonConvertRequest,
    logonConvertResponse
}
export default gatewayConverter