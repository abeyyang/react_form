import React,{ Component } from 'react';
import { FormattedMessage,injectIntl } from 'react-intl';
import { judgePicop } from '../../../../services/static/proDetail';

export default _=>(
    <FormattedMessage id={ judgePicop( _.picop ) }/>    
)