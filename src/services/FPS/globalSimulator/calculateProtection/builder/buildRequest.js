import ObjectHelper from '../../../../../common/lib/ObjectHelper';
import calculateProtectionConstant from '../constant/calculateProtectionConstant';
import lifeProtectionGoalBean from '../model/lifeProtectionGoal';
import {calculateProtectionConfig} from '../../../../config/globalSimulator/calculateProtectionConfig';
const buildRequest={
      buildRequestImpl:(calculateProtectionParams)=>{
            let request={};
            let mortAndDebetsAmountVal=0,monIncomeAmountVal=0,lumpSumAmount=0,monReplaceAmount=0,provideYear=0;
            let financialProfile=[],lifeProtectionGoal={},projectionType={}, localeCode={};
            let currencyCode='HKD',riskLevel=null;
            let goalKey={},sessionInfo={};

            if(!ObjectHelper.isNullOrEmpty(calculateProtectionParams.sessionInfo)){
                sessionInfo=calculateProtectionParams.sessionInfo;
                request.localeCode={
                    localeCode:sessionInfo.localeCode
                };
                if(!ObjectHelper.isNullOrEmpty(sessionInfo.goalJourney)){
                goalKey=sessionInfo.goalJourney;
                request.goalKey={
                        arrangementIdentifierFinancialPlanning:goalKey.planId,
                        goalSequenceNumber:goalKey.goalId
                    };
                }
            }
             if(!ObjectHelper.isNullOrEmpty(calculateProtectionParams.currencyCode)){
                currencyCode=calculateProtectionParams.currencyCode;
            }
            if(!ObjectHelper.isNullOrEmpty(calculateProtectionParams.riskLevel)){
                riskLevel=calculateProtectionParams.riskLevel;
            }
            
            if(!ObjectHelper.isNullOrEmpty(calculateProtectionParams.mortAndDebetsAmountVal)){
                mortAndDebetsAmountVal=calculateProtectionParams.mortAndDebetsAmountVal
                financialProfile.push({
                    amountCode:calculateProtectionConstant.OHER_DEBT,
                    financialAmount:mortAndDebetsAmountVal,
                    financialCurrencyCode:currencyCode,
                })
            }
             if(!ObjectHelper.isNullOrEmpty(calculateProtectionParams.monIncomeAmountVal)){
                 monIncomeAmountVal=calculateProtectionParams.monIncomeAmountVal
                financialProfile.push({
                    amountCode:calculateProtectionConstant.INCM_MO_AMT,
                    financialAmount:monIncomeAmountVal,
                    financialCurrencyCode:currencyCode,
                })
            }
             if(!ObjectHelper.isNullOrEmpty(calculateProtectionParams.monReplaceAmount)){
                 monReplaceAmount=calculateProtectionParams.monReplaceAmount
                financialProfile.push({
                    amountCode:calculateProtectionConstant.SAVNG_AND_INVST,
                    financialAmount:monReplaceAmount,
                    financialCurrencyCode:currencyCode,
                })
            }
            if(!ObjectHelper.isNullOrEmpty(calculateProtectionParams.lumpSumAmount)){
                 lumpSumAmount=calculateProtectionParams.lumpSumAmount
            }
             if(!ObjectHelper.isNullOrEmpty(calculateProtectionParams.provideYear)){
                 provideYear=calculateProtectionParams.provideYear
            }
            request.financialProfile=financialProfile
            request.lifeProtectionGoal=buildRequest.buildLifeProtectionGoal(riskLevel,lumpSumAmount,provideYear,currencyCode);
            request.projectionType={
                projectionTypeCode:calculateProtectionConfig.projectionTypeCode
            }
            request={
                request,
                messageId:calculateProtectionParams.messageId
            }
            return request;
      },
      buildLifeProtectionGoal:(riskLevel,lumpSumAmount,provideYear,currencyCode)=>{
            let numberOfDependents="0",lifeInsCoverage=0;
            let lifeProtectionGoal={};
            lifeProtectionGoal=lifeProtectionGoalBean;
            lifeProtectionGoal.calculatedRiskCapacityLevelNumber=riskLevel;
            lifeProtectionGoal.coverageLifeInsuranceTotalAmount=lifeInsCoverage;
            lifeProtectionGoal.coverageLifeInsuranceTotalCurrencyCode=currencyCode;
            lifeProtectionGoal.goalCostCoverAmount=lumpSumAmount;
            lifeProtectionGoal.goalCostCoverCurrencyCode =currencyCode;
            lifeProtectionGoal.goalYearCount=provideYear;    
            lifeProtectionGoal.numberOfDependents=numberOfDependents;
            lifeProtectionGoal.riskLevelNumber=riskLevel;
            lifeProtectionGoal.riskToleranceLevel=riskLevel;
            lifeProtectionGoal.planForCustomerIndicator=calculateProtectionConfig.planForCustomerIndicator;
            lifeProtectionGoal.goalTypeCode=calculateProtectionConfig.goalTypeCode;
            lifeProtectionGoal.goalDescription=calculateProtectionConfig.goalDescription;
            lifeProtectionGoal.simulateSegmentIndicator=calculateProtectionConfig.simulateSegmentIndicator;
            lifeProtectionGoal.skipRiskProfilingIndicator=calculateProtectionConfig.skipRiskProfilingIndicator;
            return lifeProtectionGoal
      }
}
export default buildRequest;