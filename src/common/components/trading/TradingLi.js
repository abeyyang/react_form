/**
 * Refer to:
 * https://finance.yahoo.com/quote/YHOO?ltr=1
 */
import React, { PropTypes } from 'react';
import styles from './TradingLi.scss';

const Triangle = (props) => {
    return (
        <p
            className={
                (props.isVisible && styles['triangle-left']) || styles.hidden
            }
        />
    );
};

function TradingLi (props) {
    const isSelectedOne = props.fieldNameToBeEdited === props.fieldName;
    // const isRequiredToDisplay = props.requiredFiledNames.indexOf(
    //     props.fieldName
    // ) > -1;
    // const className = !isRequiredToDisplay && styles.hidden || isSelectedOne && styles.on || '';
    const className = isSelectedOne && styles.on || '';

    function onClick () {
        if (props.isEditable) {
            props.handleTradingLiClick(props.fieldName);
        }
    }

    return (
        <li onClick={onClick} className={className}>
            {props.children}
            <Triangle isVisible={isSelectedOne && props.isEditable} />
        </li>
    );
}

// Specifies the default values for props:
TradingLi.defaultProps = {
    isEditable: true
};

TradingLi.propTypes = {
    fieldNameToBeEdited: PropTypes.string.isRequired,
    handleTradingLiClick: PropTypes.func.isRequired,
    requiredFiledNames: PropTypes.array.isRequired,
    children: PropTypes.array,
    fieldName: PropTypes.string,
    isEditable: PropTypes.bool
};

Triangle.propTypes = {
    isVisible: PropTypes.bool
};

export default TradingLi;
