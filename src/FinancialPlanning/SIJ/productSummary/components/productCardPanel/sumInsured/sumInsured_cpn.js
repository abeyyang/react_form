import React,{Component} from 'react';

import styles from './style.scss';

const SumInsured = (props) => {
        const {data}= props;
        return (
           <div className={styles.suminsured}>
               <span>{data.Suminsured}</span>
            </div>   
        );
    }

export default SumInsured;