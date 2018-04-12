import {
    GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_RETIREMENT,
	GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_RETIREMENT_DONE,
	GOALSIMULATOR_CALCULATE_PLANNING_YOUR_RETIREMENT,
	GOALSIMULATOR_CALCULATE_PLANNING_YOUR_RETIREMENT_DONE,
	GOALSIMULATOR_RECORD_PLANNING_YOUR_RETIREMENT,
	GOALSIMULATOR_RECORD_PLANNING_YOUR_RETIREMENT_DONE,
	GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_CHILDREN_FUTURE,
	GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_CHILDREN_FUTURE_DONE,
	GOALSIMULATOR_CALCULATE_PLANNING_YOUR_CHILDREN_FUTURE,
	GOALSIMULATOR_CALCULATE_PLANNING_YOUR_CHILDREN_FUTURE_DONE,
	GOALSIMULATOR_RECORD_PLANNING_YOUR_CHILDREN_FUTURE,
	GOALSIMULATOR_RECORD_PLANNING_YOUR_CHILDREN_FUTURE_DONE,
	GOALSIMULATOR_RETRIEVE_GROWING_YOUR_WEALTH,
	GOALSIMULATOR_RETRIEVE_GROWING_YOUR_WEALTH_DONE,
	GOALSIMULATOR_CALCULATE_GROWING_YOUR_WEALTH,
	GOALSIMULATOR_CALCULATE_GROWING_YOUR_WEALTH_DONE,
	GOALSIMULATOR_RECORD_GROWING_YOUR_WEALTH,
	GOALSIMULATOR_RECORD_GROWING_YOUR_WEALTH_DONE,
	GOALSIMULATOR_RETRIEVE_PROTECTION_PLANNING,
	GOALSIMULATOR_RETRIEVE_PROTECTION_PLANNING_DONE,
	GOALSIMULATOR_CALCULATE_PROTECTION_PLANNING,
	GOALSIMULATOR_CALCULATE_PROTECTION_PLANNING_DONE,
	GOALSIMULATOR_RECORD_PROTECTION_PLANNING,
	GOALSIMULATOR_RECORD_PROTECTION_PLANNING_DONE,
	GOALSIMULATOR_CALCULATE_RISK_CAPACITY,
	GOALSIMULATOR_CALCULATE_RISK_CAPACITY_DONE,
	GOALSIMULATOR_INIT_DATA,
	GOALSIMULATOR_INIT_DATA_DONE
} from '../actions/goalSimulator_act';


const initialState = {
    testResult: null,
	calculateResult: {
		calculateFinancialResult: [],
		calculatePhaseResult: {
			calculateReturnResult: [],
			phaseType: "",
			stochasticPercentileResult: {
				stochasticDataPoint: []
			}
		},
		simulateSegmentIndicator: ""
	},
	returnTargetAmount : 0,
	returnCompletedAmount : 0,
	fhcDetail : {
		retireAge : 0,
		liveUntil : 0,
		monthlyExpenses : 0,
		currentSaving : 0,
		currentAge : 0,
		initialTargetAmount : 0,
		initialCompletedAmount : 0
	},
	fieldsDetail: {
		lumpSumAmount: 0,
		monthlyInvestedAmount: 0,
		targetAmount: 0,
		yearOfInvestment: 10,
		riskLevelSelected: 3,
		riskLevelList: [
			{value: 'AMH', displayValue: 'Hong Kong'},
			{value: 'AOC', displayValue: 'China'},
			{value: 'SGH', displayValue: 'Singapore'}
		],
		noDataProvider: true
	}
};

const reducer = (state = initialState, action) => {
	let newState = {...state};
	let calculateResult = {};
    switch (action.type) {
            // retirement
        case GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_RETIREMENT_DONE:
			const testResult = action.testResult;
            console.log("retrievePlanningYourRetirementResponse", testResult);
			return { ...state, testResult};
        case GOALSIMULATOR_CALCULATE_PLANNING_YOUR_RETIREMENT_DONE:
			calculateResult = action.calculateResult;
            console.log("calculatePlanningYourRetirementResponse", calculateResult);
			return { ...state, calculateResult };
        case GOALSIMULATOR_RECORD_PLANNING_YOUR_RETIREMENT_DONE:
			const testResult11 = action.testResult;
            console.log("recordPlanningYourRetirementResponse", testResult11);
			return { ...state, testResult};
            // education
        case GOALSIMULATOR_RETRIEVE_PLANNING_YOUR_CHILDREN_FUTURE_DONE:
			const testResult111 = action.testResult;
            console.log("retrievePlanningYourChildrenFutureResponse", testResult111);
			return { ...state, testResult};
        case GOALSIMULATOR_CALCULATE_PLANNING_YOUR_CHILDREN_FUTURE_DONE:
			const testResult1111 = action.testResult;
            console.log("calculatePlanningYourChildrenFutureResponse", testResult1111);
			return { ...state, testResult};
        case GOALSIMULATOR_RECORD_PLANNING_YOUR_CHILDREN_FUTURE_DONE:
			const testResult11111 = action.testResult;
            console.log("recordPlanningYourChildrenFuturetResponse", testResult11111);
			return { ...state, testResult};
            // group your wealth
        case GOALSIMULATOR_RETRIEVE_GROWING_YOUR_WEALTH_DONE:
			const testResult111111 = action.testResult;
            console.log("retrieveGrowingYourWealthResponse", testResult111111);
			return { ...state, testResult};
        case GOALSIMULATOR_CALCULATE_GROWING_YOUR_WEALTH_DONE:
			calculateResult = action.calculateResult;
            console.log("calculateGrowingYourWealthResponse", calculateResult);
			return { ...state, calculateResult };
        case GOALSIMULATOR_RECORD_GROWING_YOUR_WEALTH_DONE:
			const testResult11111111 = action.testResult;
            console.log("recordGrowingYourWealthResponse", testResult11111111);
			return { ...state, testResult};
            // protection
        case GOALSIMULATOR_RETRIEVE_PROTECTION_PLANNING_DONE:
			const testResult111111111 = action.testResult;
            console.log("retrieveProtectionPlanningResponse", testResult111111111);
			return { ...state, testResult};
        case GOALSIMULATOR_CALCULATE_PROTECTION_PLANNING_DONE:
			const testResult1111111111 = action.testResult;
            console.log("calculateProtectionPlanningResponse", testResult1111111111);
			return { ...state, testResult};
        case GOALSIMULATOR_RECORD_PROTECTION_PLANNING_DONE:
			const testResult11111111111 = action.testResult;
            console.log("recordProtectionPlanningResponse", testResult11111111111);
			return { ...state, testResult};
        case GOALSIMULATOR_CALCULATE_RISK_CAPACITY_DONE:
            console.log("calculateRiskCapacityResponse", action.riskResult);
			newState.fieldsDetail.riskLevelSelected = action.riskResult;
			return newState;
		case 'update_fields_detail':
			newState.fieldsDetail = Object.assign({}, newState.fieldsDetail, action.field);
            return newState;
            // default
		case GOALSIMULATOR_INIT_DATA_DONE:
			return {...state, fhcDetail : action.fhcDetail};
        default:
            return state;
    }
};



export default reducer;