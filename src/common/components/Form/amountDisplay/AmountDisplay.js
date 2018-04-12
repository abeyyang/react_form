// @flow

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

const AmountDisplay = (props) => {
    const addThousandSeparator = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const { value, precision, currency, theme } = props;
    let formattedNumber = '';

    if (typeof value === 'string') {
        formattedNumber = value;
    } else {
        formattedNumber = addThousandSeparator(value.toFixed(precision));
    }

    return (
        <div className={classNames(styles.AmountDisplay, theme.AmountDisplay)}>
            {currency} <span className={classNames(styles.formattedNumber, theme.formattedNumber)}>{formattedNumber}</span>
        </div>
    );
};

AmountDisplay.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    currency: PropTypes.string,
    precision: PropTypes.number,
    theme: PropTypes.object
};

AmountDisplay.defaultProps = {
    currency: 'HKD',
    precision: 2,
    theme: {}
};

export default AmountDisplay;
