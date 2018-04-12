import { connect } from 'react-redux';
import FhcTabs from '../components/FhcTabs';
import {initFhcPage,fhcInitViewRecordTab,copyAsTemplate,receiveRecordDetial,fhcInitCreateTab,fhcCalculate,
    fhcSaveAndContinue} from '../actions/fhc_act';

const mapStateToProps = (state) => ({
    keResult: state.fhc.keResult,
    keQuestionaire : state.fhc.keQuestionaire,
    selectedTab: state.fhc.selectedTab,
    formData:state.fhc.formData,
    overlayData:state.fhc.overlayData,
    finHealthCheckSummaryList:state.fhc.finHealthCheckSummaryList,
    recordDetialInformation:state.fhc.recordDetialInformation,
    customerInfo:state.landing.customerInfo
});

const fhcContainer = connect(
    mapStateToProps,
    {initFhcPage,fhcInitViewRecordTab,copyAsTemplate,receiveRecordDetial,fhcInitCreateTab,fhcCalculate,fhcSaveAndContinue}
)(FhcTabs);

export default fhcContainer;
