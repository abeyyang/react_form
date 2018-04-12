import React, { Component } from 'react';
import styles from './style.scss';

const SuitabilityCheck = (props) => {

    const { data } = props;
    return (
        <div>
            <span>{data.value}</span>
        </div>
    );
}

export default SuitabilityCheck;
