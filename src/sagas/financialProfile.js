import { call, put, select, takeEvery, takeLatest, compose, fork, take } from 'redux-saga/effects';
import {
	INIT_FNA_ACTION, GET_FNAPROFILE_ACTION, FNA_RECORD_FNA_DATA, FNA_SAVE_FINISHED_RENDER_TO_LANDING, GET_FXRATEBYCURRENCY_ACTION,
	RETRIEVE_FXRATEBYCURRENCY_ACTION, INIT_FNA_ASSEST_ACTION, INIT_FNA_INCOME_ACTION, INIT_FNA_EXPENSES_ACTION, INIT_FNA_LIABILITIES_ACTION,
	UPDATE_ASSET_REFERENCE_RECORD,UPDATE_INCOME_REFERENCE_RECORD,UPDATE_EXPENSES_REFERENCE_RECORD,UPDATE_LIABILITIES_REFERENCE_RECORD
} from '../FinancialPlanning/financialProfile/actions/financialProfile_act';
import fpsService from '../services/FPS/fpsService'
import fpsConverter from '../services/FPS/fpsConverter';
import fnaConverter from '../services/FPS/fna/fnaConverter'
import { inputValidate, outPutValidate,outputValidateWithError  } from '../services/commonService/validate';
import { DASHBOARD_INIT } from '../FinancialPlanning/landing/actions/landing_act';
import { UPDATE_ERROR_INFO, CLEAN_ALL_ERROR_INFO, COMMON_RESPONSE_VALIDATE, REST_RESPONSE_VALIDATE,UPDATE_MESSAGE_BOX} from '../common/actions/nav';
import ObjectHelper from '../common/lib/ObjectHelper';
import {sendMessageWithTimeout} from "./common_sga";



function* getSessionInfo() {
	let tempState = yield select();
	let sessionInfo = tempState.session;
	console.log("sessionInfo", sessionInfo);
	return sessionInfo;
};


function* initFNAProfileAssest() {
	yield put({
			type: 'COMPONENT_LOADING',
			componentName: 'hsbcAssets',
			toggle: true
		});
	let assetsParams = {
		messageId: 'retrieveFinancialSituationReferenceRecordAssets',
		fieldKeys: ["HSBC_SAVING", "HSBC_INVESTMENT", "HSBC_DEPOSIT_CONSENT_INDICATOR"]
	};
	let assetsRequest, assetsRequestConverter, assetsResponse, assetsResult, assetsFinaResult;

	let tempState = yield select();
	let sessionInfo = tempState.session;
	// let sessionInfo = getSessionInfo();
	assetsParams.sessionInfo = sessionInfo;
	// console.log("assetsParams",assetsParams);
	assetsRequest = inputValidate(assetsParams);
	// console.log("assetsRequest",assetsRequest);

	assetsRequestConverter = fnaConverter.retrieveFinancialSituationReferenceRecordAssetsRequest(assetsRequest);
	console.log("assetsRequestConverter", assetsRequestConverter);
	assetsResponse = yield call (sendMessageWithTimeout, fpsService.process,assetsRequestConverter); 
	console.log("assetsResponse",assetsResponse);
	if (assetsResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : assetsResponse.errorList
        });
        return;
    }
	assetsResponse = outputValidateWithError(assetsResponse);
    if (assetsResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : assetsResponse.errorList
        });
	}
		assetsFinaResult = fnaConverter.retrieveFinancialSituationReferenceRecordAssetsConvertResponse(assetsResponse.responseBody);
		console.log("FNA profile assetsFinaResult", assetsFinaResult);
		let assetReferenceRecord = {};
		assetReferenceRecord.assetInvestmentObj = assetsFinaResult.assetInvestmentObj;
		assetReferenceRecord.assetSavingObj = assetsFinaResult.assetSavingObj;
		assetReferenceRecord.assetDci = assetsFinaResult.assetDci;
		console.log("assetReferenceRecord1", assetReferenceRecord);
		yield put({
			type: 'UPDATE_ASSET_REFERENCE_RECORD',
			assetReferenceRecord
		});
		console.log("assetReferenceRecord2", assetReferenceRecord);
	
	console.trace('fp saga go on');
	yield put({
			type: 'COMPONENT_LOADING',
			componentName: 'hsbcAssets',
			toggle: false
		});
};


function* initFNAProfileIncome() {
	let incomeParams = {
		messageId: 'retrieveFinancialSituationReferenceRecordIncome',
		fieldKeys: ["HSBC_MONTHLY_INCOME"]

	};
	let incomeRequest, incomeRequestConverter, incomeResponse, incomeResult, incomeFinaResult;
	let tempState = yield select();
	let sessionInfo = tempState.session;
	// let sessionInfo = getSessionInfo();
	incomeParams.sessionInfo = sessionInfo;
	// console.log("incomeParams",incomeParams);

	incomeRequest = inputValidate(incomeParams);
	// console.log("incomeRequest",incomeRequest);

	incomeRequestConverter = fnaConverter.retrieveFinancialSituationReferenceRecordIncomeRequest(incomeRequest);
	console.log("incomeRequestConverter", incomeRequestConverter);
	incomeResponse = yield call(sendMessageWithTimeout,fpsService.process, incomeRequestConverter);

	console.log("incomeResponse", incomeResponse);
	if (incomeResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : incomeResponse.errorList
        });
        return;
    }
	incomeResponse = outputValidateWithError(incomeResponse);
    if (incomeResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : incomeResponse.errorList
        });
	}
		incomeFinaResult = fnaConverter.retrieveFinancialSituationReferenceRecordIncomeConvertResponse(incomeResponse.responseBody);
		console.log("FNA profile incomeFinaResult", incomeFinaResult);
		let incomeReferenceRecord = incomeFinaResult;
		yield put({
			type: 'UPDATE_INCOME_REFERENCE_RECORD',
			incomeReferenceRecord
		});
		console.log("incomeReferenceRecord", incomeReferenceRecord);
	
	
};



function* initFNAProfileExpenses() {
	let expensesParams = {
		messageId: 'retrieveFinancialSituationReferenceRecordExpenses',
		fieldKeys: ["HSBC_MORTGAGE_RENTAL_PAYMENT", "HSBC_MONTHLY_INSURANCE_PREMIUM", "HSBC_LIFE_INSURANCE_PREMIUM"]

	};
	let expensesRequest, expensesRequestConverter, expensesResponse, expensesResult, expensesFinaResult;
	let tempState = yield select();
	let sessionInfo = tempState.session;
	expensesParams.sessionInfo = sessionInfo;
	// console.log("expensesParams",expensesParams);
	expensesRequest = inputValidate(expensesParams);
	// console.log("expensesRequest",expensesRequest);
	expensesRequestConverter = fnaConverter.retrieveFinancialSituationReferenceRecordExpensesRequest(expensesRequest);
	console.log("expensesRequestConverter", expensesRequestConverter);
	expensesResponse = yield call(sendMessageWithTimeout,fpsService.process, expensesRequestConverter);
	console.log("expensesResponse", expensesResponse);
	if (expensesResponse.isTimeout) {
		yield put({
			type: UPDATE_MESSAGE_BOX,
			errorList : expensesResponse.errorList
		});
		return;
    }
	expensesResponse = outputValidateWithError(expensesResponse);
    if (expensesResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : expensesResponse.errorList
        });
	}
		expensesFinaResult = fnaConverter.retrieveFinancialSituationReferenceRecordExpensesConvertResponse(expensesResponse.responseBody);
		
		console.log("FNA profile expensesFinaResult", expensesFinaResult);
		let expensesReferenceRecord = {};
		expensesReferenceRecord.mortgageRentalPaymentRecordObj = expensesFinaResult.mortgageRentalPaymentRecordObj;
		expensesReferenceRecord.lifeInsurancePremiumRecordObj = expensesFinaResult.lifeInsurancePremiumRecordObj;
		expensesReferenceRecord.monthlyInsurancePremiumRecordObj = expensesFinaResult.monthlyInsurancePremiumRecordObj;
		yield put({
			type: 'UPDATE_EXPENSES_REFERENCE_RECORD',
			expensesReferenceRecord
		});
		console.log("expensesReferenceRecord", expensesReferenceRecord);
	
	
};



function* initFNAProfileLiabilities() {
	let liabilitiesParams = {
		messageId: 'retrieveFinancialSituationReferenceRecordLiabilities',
		fieldKeys: ["HSBC_MORTGAGE_LOANS", "HSBC_OTHER_PERSONAL_LOANS_AND_DEBTS"]

	};
	let liabilitiesRequest, liabilitiesRequestConverter, liabilitiesResponse, liabilitiesResult, liabilitiesFinaResult;

	let tempState = yield select();
	let sessionInfo = tempState.session;
	liabilitiesParams.sessionInfo = sessionInfo;
	// console.log("liabilitiesParams",liabilitiesParams);

	liabilitiesRequest = inputValidate(liabilitiesParams);
	// console.log("liabilitiesRequest",liabilitiesRequest);
	liabilitiesRequestConverter = fnaConverter.retrieveFinancialSituationReferenceRecordLiabilitiesRequest(liabilitiesRequest);
	console.log("liabilitiesRequestConverter", liabilitiesRequestConverter);
	liabilitiesResponse = yield call(sendMessageWithTimeout,fpsService.process, liabilitiesRequestConverter);
	console.log("liabilitiesResponse", liabilitiesResponse);

	if (liabilitiesResponse.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : liabilitiesResponse.errorList
        });
        return;
    }
	
	liabilitiesResponse = outputValidateWithError(liabilitiesResponse);
	

    if (liabilitiesResponse.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : liabilitiesResponse.errorList
        });
	}
		liabilitiesFinaResult = fnaConverter.retrieveFinancialSituationReferenceRecordLiabilitiesResponse(liabilitiesResponse.responseBody);
		console.log("FNA profile liabilitiesFinaResult", liabilitiesFinaResult);
		// let Liabilities
		let liabilitiesReferenceRecord = {};
		liabilitiesReferenceRecord.morgageLoansRecordObj = liabilitiesFinaResult.morgageLoansRecordObj;
		liabilitiesReferenceRecord.otherPersonalLoansAndDebtsRecordObj = liabilitiesFinaResult.otherPersonalLoansAndDebtsRecordObj;
		yield put({
			type: 'UPDATE_LIABILITIES_REFERENCE_RECORD',
			liabilitiesReferenceRecord
		});

		console.log("liabilitiesReferenceRecord", liabilitiesReferenceRecord);
	
	

};




function* initFNAProfile(params) {
	yield put({
		type: CLEAN_ALL_ERROR_INFO
	});

	console.log("init financail profile....this.is for  financial proflle .");
	console.log('dashboardInitFNAData start...');

	let fnaResult, request, response, requestConverter, result;
	console.log('dashboardInitFNAData fnaParams...', params);
	let tempState = yield select();
	let sessionInfo = tempState.session;

	let fnaParams = params.fnaParams;
	fnaParams.sessionInfo = sessionInfo;

	request = inputValidate(fnaParams);
	requestConverter = fnaConverter.retrieveFinancialSituationDataConvertRequest(fnaParams);
	response = yield call(sendMessageWithTimeout,fpsService.process, requestConverter);
	console.log("initFNAProfile response", response);

	if (response.isTimeout) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
        return;
    }
	// let errorFlag = outPutValidate(response);
	response = outputValidateWithError(response);
	

    if (response.errorList.length > 0) {
        yield put({
            type: UPDATE_MESSAGE_BOX,
            errorList : response.errorList
        });
	}else {
		fnaResult = fnaConverter.retrieveFinancialSituationDataConvertResponse(response.responseBody);
		console.log("FNA profile result", fnaResult);
		let fnaObject = fnaResult[0].financialSituation;
		fnaObject.MIAESelected = fnaResult[0].MIAESelected;
		console.log("FNA profile result2", fnaObject);

		let incomeDetail = {
			personalDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "PERSONAL_INC"
			},
			contriByFamliyDetial: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "CONTRI_BY_FAMILY"
			},
			divideIncomeDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "DIVIDEND_INC"
			},
			rentalIncomeDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "RENTAL_INC"
			},
			otherIncomeDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "OTHER_INC"
			},
			monthlyIncomeRecordObj: {}
		};
		let assetsDetail = {
			otherLiquidDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "OTHER_LIQ_AST"
			},
			savingCashDepositDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "LOCAL_CCY_DE"
			},
			investmentDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "STRU_NOTE"
			},
			investmentPropertyDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "INVESTMENT_PROPERTY"
			},
			oridinaryCPFDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "CPF_ORIDINARY"
			},
			nonliquidTrustsDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "OTHER_NON_LIQ_AST"
			},
			assetSavingObj: {},
			assetInvestmentObj: {},
			assetDci: {}
		};
		let liabilityDetail = {
			mortgageLoanDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "OTHER_SHORT_LIA"
			},
			pernalLoanDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "OTHER_LONG_LIA"
			},
			shortNonDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "NHSBC_OTHER_SHRT_LIA"
			},
			longNonDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "NHSBC_OTHER_LONG_LIA"
			},
			morgageLoansRecordObj: {},
			otherPersonalLoansAndDebtsRecordObj: {}
		};
		let expenseDetail = {
			personalDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "LIVING_EXP"
			},
			mortgageRentalDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "MORTGAGE_PAYMENT"
			},
			educationDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "EDUCATION_EXPENSES"
			},
			otherDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "OTHER_EXP"
			},
			monthInsuranceDetail: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "INSURANCE"
			},
			rentalPaymentDetial: {
				amount: "",
				currencyCode: "HKD",
				typeCode: "RENTAL"
			},
			mortgageRentalPaymentRecordObj: {},
			monthlyInsurancePremiumRecordObj: {},
			lifeInsurancePremiumRecordObj: {},
			monthlyExpenseObj: {}
		};

		if (fnaObject.income.detailList.length > 0) {
			for (var i = 0; i < fnaObject.income.detailList.length; i++) {
				if (fnaObject.income.detailList[i].typeCode == "PERSONAL_INC") {
					incomeDetail.personalDetail = fnaObject.income.detailList[i];
				}
				if (fnaObject.income.detailList[i].typeCode == "CONTRI_BY_FAMILY") {
					incomeDetail.contriByFamliyDetial = fnaObject.income.detailList[i];
				}
				if (fnaObject.income.detailList[i].typeCode == "DIVIDEND_INC") {
					incomeDetail.divideIncomeDetail = fnaObject.income.detailList[i];
				}
				if (fnaObject.income.detailList[i].typeCode == "RENTAL_INC") {
					incomeDetail.rentalIncomeDetail = fnaObject.income.detailList[i];
				}
				if (fnaObject.income.detailList[i].typeCode == "OTHER_INC") {
					incomeDetail.otherIncomeDetail = fnaObject.income.detailList[i];
				}
			}
		}


		if (fnaObject.expense.detailList.length > 0) {
			for (var i = 0; i < fnaObject.expense.detailList.length; i++) {
				if (fnaObject.expense.detailList[i].typeCode == "LIVING_EXP") {
					expenseDetail.personalDetail = fnaObject.expense.detailList[i];
				}
				if (fnaObject.expense.detailList[i].typeCode == "MORTGAGE_PAYMENT") {
					expenseDetail.mortgageRentalDetail = fnaObject.expense.detailList[i];
				}
				if (fnaObject.expense.detailList[i].typeCode == "EDUCATION_EXPENSES") {
					expenseDetail.educationDetail = fnaObject.expense.detailList[i];
				}
				if (fnaObject.expense.detailList[i].typeCode == "OTHER_EXP") {
					expenseDetail.otherDetail = fnaObject.expense.detailList[i];
				}
				if (fnaObject.expense.detailList[i].typeCode == "INSURANCE") {
					expenseDetail.monthInsuranceDetail = fnaObject.expense.detailList[i];
				}
				if (fnaObject.expense.detailList[i].typeCode == "RENTAL") {
					expenseDetail.rentalPaymentDetial = fnaObject.expense.detailList[i];
				}
			}
		}


		if (fnaObject.assets.detailList.length > 0) {
			for (var i = 0; i < fnaObject.assets.detailList.length; i++) {
				if (fnaObject.assets.detailList[i].typeCode == 'OTHER_LIQ_AST') {
					assetsDetail.otherLiquidDetail = fnaObject.assets.detailList[i];
				}
				if (fnaObject.assets.detailList[i].typeCode == 'LOCAL_CCY_DE') {
					assetsDetail.savingCashDepositDetail = fnaObject.assets.detailList[i];
				}
				if (fnaObject.assets.detailList[i].typeCode == 'STRU_NOTE') {
					assetsDetail.investmentDetail = fnaObject.assets.detailList[i];
				}
				if (fnaObject.assets.detailList[i].typeCode == 'INVESTMENT_PROPERTY') {
					assetsDetail.investmentPropertyDetail = fnaObject.assets.detailList[i];
				}
				if (fnaObject.assets.detailList[i].typeCode == 'CPF_ORIDINARY') {
					assetsDetail.oridinaryCPFDetail = fnaObject.assets.detailList[i];
				}
				if (fnaObject.assets.detailList[i].typeCode == 'OTHER_NON_LIQ_AST') {
					assetsDetail.nonliquidTrustsDetail = fnaObject.assets.detailList[i];
				}


			}
		}


		// }
		if (fnaObject.liability.detailList.length > 0) {
			for (var i = 0; i < fnaObject.liability.detailList.length; i++) {
				if (fnaObject.liability.detailList[i].typeCode == 'OTHER_SHORT_LIA') {
					liabilityDetail.mortgageLoanDetail = fnaObject.liability.detailList[i]
				}
				if (fnaObject.liability.detailList[i].typeCode == 'NHSBC_OTHER_LONG_LIA') {
					liabilityDetail.longNonDetail = fnaObject.liability.detailList[i];
				}
				if (fnaObject.liability.detailList[i].typeCode == 'NHSBC_OTHER_SHRT_LIA') {
					liabilityDetail.shortNonDetail = fnaObject.liability.detailList[i];
				}
				if (fnaObject.liability.detailList[i].typeCode == 'OTHER_LONG_LIA') {
					liabilityDetail.pernalLoanDetail = fnaObject.liability.detailList[i];
				}
			}
		}

		let EFIndicatorDetail = {};
		let pvcIndicatorDetail = {};
		let dciIndicatorDetail = {};
		if (fnaObject.investorIndicators.length > 0) {
			for (var i = 0; i < fnaObject.investorIndicators.length; i++) {
				if (fnaObject.investorIndicators[i].indicatorKey == 'EF') {
					EFIndicatorDetail = fnaObject.investorIndicators[i];
				}
				if (fnaObject.investorIndicators[i].indicatorKey == 'PVC_EAI') {
					pvcIndicatorDetail = fnaObject.investorIndicators[i];
				}
				if (fnaObject.investorIndicators[i].indicatorKey == 'DCI') {
					dciIndicatorDetail = fnaObject.investorIndicators[i];
				}
			}
		}
		incomeDetail.monthlyIncomeObj = fnaObject.monthlyIncome[0] == undefined ? {} : fnaObject.monthlyIncome[0];
		expenseDetail.monthlyExpenseObj = fnaObject.monthlyExpense[0] == undefined ? {} : fnaObject.monthlyExpense[0];

		//fnaObject.fnaDataModel = fnaResult;
		let fnaDataModel = fnaResult;
		yield put({
			type: GET_FNAPROFILE_ACTION,
			fnaDataModel,
			incomeDetail,
			assetsDetail,
			liabilityDetail,
			expenseDetail,
			pvcIndicatorDetail,
			EFIndicatorDetail,
			dciIndicatorDetail,
			fnaObject
		});
	}



}

function* recordFNAProfile(request) {
	console.log("record FNA Profile");
	let params = request;
	let requestCo = fnaConverter.recordFinancialSituationDataConvertRequest(request);
	let responseCo = yield call(fpsService.process, requestCo);

	yield put({
		type: DASHBOARD_INIT,
		request: {
			customerId: "IF200106"
		}
	});
	yield put({
		type: FNA_SAVE_FINISHED_RENDER_TO_LANDING,
		isRender: true
	});

}

function* getFxrateByCurrency(request) {
	console.log("get fxrate by currency");
	console.log('params...', request);


	// let requestCo=inputValidate(request); 
	let requestConverter = fpsConverter.retrieveByCurrencyConvertRequest(request);
	let responseCO = yield call(fpsService.process, requestConverter);
	//let result=outPutValidate(responseCO);
	let fxrateResult = fpsConverter.retrieveByCurrencyConvertResponse(responseCO);
	let fxrateDetail = {
		fxrateObj: fxrateResult
	}

	// fxrateDetail.fxrateObj = fxrateResult;
	console.log("fxrateDetail", fxrateDetail);

	yield put({
		type: GET_FXRATEBYCURRENCY_ACTION,
		fxrateDetail
	});

}

export default function* () {
	yield [
		takeEvery(INIT_FNA_ACTION, initFNAProfile),
		takeEvery(INIT_FNA_ASSEST_ACTION, initFNAProfileAssest),
		takeEvery(INIT_FNA_INCOME_ACTION, initFNAProfileIncome),
		takeEvery(INIT_FNA_EXPENSES_ACTION, initFNAProfileExpenses),
		takeEvery(INIT_FNA_LIABILITIES_ACTION, initFNAProfileLiabilities),
		takeEvery(FNA_RECORD_FNA_DATA, recordFNAProfile),
		takeEvery(RETRIEVE_FXRATEBYCURRENCY_ACTION, getFxrateByCurrency)
	]
}