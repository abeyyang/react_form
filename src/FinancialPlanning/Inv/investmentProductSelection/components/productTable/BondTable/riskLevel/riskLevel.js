import React, { Component } from 'react';
import styles from './style.scss';

const riskLevelBond = (props)=>{
    const { data } = props;
    let styleName = "circleRiskLevel" + data.attribute.riskLvlCde;
    
    return (
        <div>
            <span className={styles[styleName]}>{data.attribute.riskLvlCde}</span>
        </div>
    );
};



export default riskLevelBond;
