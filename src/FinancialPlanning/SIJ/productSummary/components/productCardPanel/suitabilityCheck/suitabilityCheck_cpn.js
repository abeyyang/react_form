import React,{Component} from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';

const SuitabilityCheck = (props) => {
        const {data}= props;
        return (
           <div className={styles.suitabilityCheck}>
               <FontIcon icon="circle-error" className={styles.icon}/>
            </div>   
        );
    }

export default SuitabilityCheck;