import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import styles from '../financialProfilePanel/style.scss';

export default  class SelectCurrencyComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){

        return (
           <div className={styles.currencySelect}>
                <p>Select currency</p>
                <select>
                    <option value="HKD">HKD</option>
                </select>
            </div>
        );
    }

}