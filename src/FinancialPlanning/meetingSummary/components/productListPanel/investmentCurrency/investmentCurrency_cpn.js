import React,{Component} from 'react';

import styles from './style.scss';

const InvestmentCurrency = (props) => {
        const {data}= props;
        return (
             <div>
                <select >
                        <option value="HKD">HKD</option>
                        <option value="CNY">CNY</option>
                        <option value="CNY">SGD</option>
                    </select>
            </div>     
        );
    }

export default InvestmentCurrency;