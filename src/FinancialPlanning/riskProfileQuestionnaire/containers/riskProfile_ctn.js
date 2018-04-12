import { connect } from 'react-redux';
import riskProfileCpn from '../components/riskProfile';
import {initRiskProfileData} from '../actions/riskProfile_act';
import {submitRTQressult} from '../actions/riskProfile_act';
import {riskSinglePrint} from '../actions/riskProfile_act';
import {clearUp} from '../actions/riskProfile_act';
import {clearUpCalResult} from '../actions/riskProfile_act';
import {getTheRiskDescription} from '../actions/riskProfile_act';
import {cleanError} from '../../../common/actions/nav'
//import {getRiskProfileResult} from '../actions/riskProfileQuest_act';
const mapStateToProps = (state) => ({
    rtqResult: state.riskProfile.rtqResult,
    calResult: state.riskProfileQues.calResult,
    ansRecordFromQues: state.riskProfileQues.ansRecord,
    mainResult: state.riskProfile.mainResult,
    staffInfo: state.riskProfileQues.staffInfo,
    session: state.session,
    msgName: state.riskProfile.msgName,
    qasConfig:state.riskProfile.qasConfig
});

const riskProfileCpnContainer = connect(
    mapStateToProps,
    {riskSinglePrint,initRiskProfileData,submitRTQressult,clearUp,clearUpCalResult,getTheRiskDescription,cleanError}
)(riskProfileCpn);

export default riskProfileCpnContainer;
