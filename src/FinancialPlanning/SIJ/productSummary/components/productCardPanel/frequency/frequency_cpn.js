import React,{Component} from 'react';

import styles from './style.scss';

const Frequency = (props) => {
        const {data}= props;
        return (
            <div className={styles.frequency}>
               <span>{data.Frequency}</span>
            </div>   
        );
    }

export default Frequency;