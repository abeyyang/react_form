import React, { Component } from 'react';
import styles from './style.scss';

const RiskLevel = (props) => {

    const { data } = props;
    let styleName = "circleRiskLevel" + data.value;
    return (
        <div>
            <span className={styles[styleName]}>{(data.value && data.value !="" )?data.value:"N/A"}</span>
        </div>
    );
}

export default RiskLevel;
