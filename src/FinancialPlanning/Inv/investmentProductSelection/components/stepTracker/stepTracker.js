import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

class StepTracker extends Component{
    
    render(){
        return (
            <div className={styles.titleProgress}>
                <p>1.Product selection</p>
                <hr className={styles.stepProgressDone}/><hr className={styles.stepProgressUndone}/>
            </div>
        );
    }
}

export default StepTracker;
