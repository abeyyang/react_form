import { connect } from 'react-redux';
import goalSimulator from '../components/goalSimulator_cpn';
import {
    retrievePlanningYourRetirementAct,
    calculatePlanningYourRetirementAct,
    recordPlanningYourRetirementAct,
    retrievePlanningYourChildrenFutureAct,
    calculatePlanningYourChildrenFutureAct,
    recordPlanningYourChildrenFuturetAct,
    retrieveGrowingYourWealthAct,
    calculateGrowingYourWealthAct,
    recordGrowingYourWealthAct,
    retrieveProtectionPlanningAct,
    calculateProtectionPlanningAct,
    recordProtectionPlanningAct,
    calculateRiskCapacityAct,
    updateFieldsDetail,
    initData
} from '../actions/goalSimulator_act';

const mapStateToProps = (state) => ({
    testResult: state.goalSimulator.testResult,
    riskResult: state.goalSimulator.riskResult,
    calculateResult: state.goalSimulator.calculateResult,
    fhcDetail : state.goalSimulator.fhcDetail,
    returnTargetAmount : state.goalSimulator.returnTargetAmount,
    returnCompletedAmount : state.goalSimulator.returnCompletedAmount,
    fieldsDetail: state.goalSimulator.fieldsDetail
});

const goalSimulatorContainer = connect(
    mapStateToProps,
    {
        retrievePlanningYourRetirementAct,
        calculatePlanningYourRetirementAct,
        recordPlanningYourRetirementAct,
        retrievePlanningYourChildrenFutureAct,
        calculatePlanningYourChildrenFutureAct,
        recordPlanningYourChildrenFuturetAct,
        retrieveGrowingYourWealthAct,
        calculateGrowingYourWealthAct,
        recordGrowingYourWealthAct,
        retrieveProtectionPlanningAct,
        calculateProtectionPlanningAct,
        recordProtectionPlanningAct,
        calculateRiskCapacityAct,
        updateFieldsDetail,
        initData
    }
)(goalSimulator);

export default goalSimulatorContainer;