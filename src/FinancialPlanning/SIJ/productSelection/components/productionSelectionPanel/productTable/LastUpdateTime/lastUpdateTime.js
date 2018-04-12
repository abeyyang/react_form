import React, { Component } from 'react';
import styles from './style.scss';

const LastUpdateTime= (props) => {

    const { data } = props;
    return (
        <div>
            <span>{data.value}</span>
        </div>
    );
}

export default LastUpdateTime;
