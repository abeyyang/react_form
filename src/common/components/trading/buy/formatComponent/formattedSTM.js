import React,{ Component } from 'react';
import { FormattedMessage,injectIntl } from 'react-intl';
import { judgeSettlementMethod } from '../../../../services/static/proDetail'

export default _=>(
    <FormattedMessage id={ judgeSettlementMethod( _.method ) }/>    
)