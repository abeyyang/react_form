import { connect } from 'react-redux';
import riskProfileQuestionnaire from '../components/riskProfileQuestionnaire';
import {initRiskProfileQuestData} from '../actions/riskProfileQuest_act';
import {initRiskProfileQuestTextData} from '../actions/riskProfileQuest_act';
import {getRiskProfileResult} from '../actions/riskProfileQuest_act';
import {cleanCulResult} from '../actions/riskProfileQuest_act';
import {getStaffInformation} from '../actions/riskProfileQuest_act';
import {setBack} from '../actions/riskProfileQuest_act';
const mapStateToProps = (state) => ({
    rtqResult: state.riskProfileQues.rtqResult,
    rtqTextResult: state.riskProfileQues.rtqTextResult,
    session: state.session,
    staffInfo: state.riskProfileQues.staffInfo,
    staffValid: state.riskProfileQues.staffValid,
    calResult: state.riskProfileQues.calResult,
    messageName: state.riskProfileQues.messageName
});

const riskProfileQuestionnaireContainer = connect(
    mapStateToProps,
    {initRiskProfileQuestData,initRiskProfileQuestTextData,getRiskProfileResult,cleanCulResult,getStaffInformation,setBack}
)(riskProfileQuestionnaire);

export default riskProfileQuestionnaireContainer;
