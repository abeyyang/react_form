import {commonConfig} from '../config/fna/commonConfig'
let config=commonConfig.pvcConfig;
export const pvcHandleUtil={
    isPVCApplicable:(checkMode,investorIndicator,riskProfile) =>{
        var result = false;
        if ("PVC_AGE_MODE" == checkMode) {
        	result = isCustomerOverAged(investorIndicator);
        } else if ("PVC_POFILE_MODE" == checkMode) {
        	result = isProfileRisky(investorIndicator,riskProfile);
        } else if ("PVC_CONFIG_MODE" == checkMode) {
        	result = pvcHandleUtil.isSwitchOn();
        }

        return result;
    },

    isSwitchOn:()=>{
        return config.PVC_FEATURE;
    },
    isCustomerOverAged:(investorIndicator)=>{
        var result = false;
        var exceedAgeKey = config.EXC_AGE_KEY;
        if (null != investorIndicator) {
            if (exceedAgeKey != "") {
                for (var i = 0; i < investorIndicator.length; i++) {
                    if (exceedAgeKey == investorIndicator[i].indicatorKey) {
                        var ifExceedAge = investorIndicator[i].indicatorValue;
                        if ("Y" == ifExceedAge) {
                            result = true;
                        }
                    }
                }
            }
        }
        return result;
    },
    isProfileRisky:(investorIndicator, riskProfile)=>{
        var result = false;
        var pVCOverallKey = config.PVC_OVERALL;
        if (investorIndicator != null) {
            for (var i = 0; i < investorIndicator.length; i++) {
                if (pVCOverallKey != null && pVCOverallKey == investorIndicator[i].indicatorKey) {
                    // Judge whether the risk is larger than 4(configuration).
                    if (null != riskProfile && null != investorIndicator[i]) {
                        if (null != riskProfile.riskCapacity && "Y" == investorIndicator[i].indicatorValue) {
                            var riskLevelConfig = config.PVC_RISK_LEVEL_KEY;
                            if (riskLevelConfig != null && riskProfile.riskCapacity >= riskLevelConfig) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
}