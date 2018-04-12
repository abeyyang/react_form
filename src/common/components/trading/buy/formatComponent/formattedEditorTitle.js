import React,{ Component } from 'react';
import { FormattedMessage,injectIntl } from 'react-intl';
import { judgeEditorPanelTitle } from '../../../../services/static/proDetail'

export default _=>(
    <FormattedMessage id={ judgeEditorPanelTitle( _.title ) }/>    
)