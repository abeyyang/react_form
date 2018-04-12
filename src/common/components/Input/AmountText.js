import React, { Component } from 'react';
import styles from './style.scss';

class AmountText extends Component {
    render() {
        const {currencyCode, amount,id,name,disabledTag} = this.props;

        return (
            <div className={styles.currencyType}>
                <span>{currencyCode}</span>
                <input 
                  disabled={disabledTag}
                  type="text" name={name} id={id}
                  onChange={this.props.onChange}
                  value={amount}
                />
            </div>
        );
    }
}

export default AmountText;
