import { connect } from 'react-redux';
import {getReport} from '../actions/riskProfileQuestionnaireHistroicalRecords_act'
import {getHistoricalRecords} from '../actions/riskProfileQuestionnaireHistroicalRecords_act'
import riskProfileQuestionnaireHistroicalRecordsCpn from '../components/riskProfileQuestionnaireHistroicalRecords';
 const mapStateToProps = (state) => ({
    session: state.session,
    historyRecords:state.riskHistoricalRecords.rtqHistoryResult,
    report: state.riskHistoricalRecords.report
 });

const  riskProfileQuestionnaireHistroicalRecords_Container = connect(
    mapStateToProps,
    {getHistoricalRecords,getReport}
)(riskProfileQuestionnaireHistroicalRecordsCpn);

export default riskProfileQuestionnaireHistroicalRecords_Container;
