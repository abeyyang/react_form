import React, { Component } from 'react';
import styles from './style.scss';

const YTD = (props) => {

    const { data } = props;
    return (
        <div>
            <span>{data.value}</span>
        </div>
    );
}

export default YTD;
