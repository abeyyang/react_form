import React, { Component, PropTypes  } from 'react';

export const ValidationController = (ChildComponent) =>{
    const ValidationWrapper = (props, context) => {
        let { validateByTag } = context.validation;
        console.log(context, 'context controller');
        validateByTag = validateByTag.bind(context);
        return (<ChildComponent validateByTag={validateByTag}/>);
    };
    ValidationWrapper.contextTypes = {
        validation: PropTypes.object.isRequired
    };
    return ValidationWrapper;
};