import React,{Component} from 'react';

import styles from './style.scss';

const RiskingRatingSelect = (props) => {

        return (
             <div className={styles.riskRatingSelect}>
                    <select>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
            </div>
        );
    }

export default RiskingRatingSelect;