import { connect } from 'react-redux';
import KnowledgeAndExperience from '../components/knowledgeAndExperience';
import {initKnowladgeAndExperienceData, updateKEResult, submitKEResult} from '../actions/knowledgeAndExperience_act';

const mapStateToProps = (state) => ({
    keResult: state.knowledgeAndExperience.keResult,
    keQuestionaire : state.knowledgeAndExperience.keQuestionaire,
    itemMap: state.knowledgeAndExperience.itemMap,
    lastDateTime:state.knowledgeAndExperience.lastDateTime
});

const knowledgeAndExperienceContainer = connect(
    mapStateToProps,
    {initKnowladgeAndExperienceData,updateKEResult,submitKEResult}
)(KnowledgeAndExperience);

export default knowledgeAndExperienceContainer;
