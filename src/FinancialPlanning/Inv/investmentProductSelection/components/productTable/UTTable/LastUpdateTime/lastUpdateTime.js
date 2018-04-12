import React, { Component } from 'react';
import styles from './style.scss';

const LastUpdateTime= (props) => {

    const { data } = props;
    return (
        <div>
            <span>{data.attribute.perfCalcDate_PERFRM}</span>
        </div>
    );
}

export default LastUpdateTime;
