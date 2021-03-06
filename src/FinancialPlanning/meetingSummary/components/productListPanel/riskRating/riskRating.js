import React,{Component} from 'react';

import styles from './style.scss';
import RiskLevel from 'common/components/riskLevel'

const RiskRating = (props) => {
        const {data}= props;
        return (
           <div>
               <RiskLevel level={data.riskLevelCode}/>
            </div>   
        );
    }

export default RiskRating;