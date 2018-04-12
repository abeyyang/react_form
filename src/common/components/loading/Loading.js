import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Spinner from '../spinner';
import styles from './style.scss';

const Transition = (props) => (
    <div className={classNames(styles.transitionContainer, props.theme.transitionContainer)} style={{ position: props.position, left: 0, top: 0 }}>
        <div>
            <div className={classNames(styles.loadEffect)}>
                <Spinner spinnerColor={props.spinnerColor} spinnerWidth={props.spinnerWidth} size={props.spinnerSize} visible animate />
                <div className={classNames(styles.caption)}>
                    <span>{props.caption}</span>
                </div>
            </div>
        </div>
    </div>
);

Transition.propTypes = {
    caption: PropTypes.string.isRequired,
    spinnerColor: PropTypes.string.isRequired,
    spinnerSize: PropTypes.number.isRequired,
    spinnerWidth: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    position: PropTypes.string
};

Transition.defaultProps = {
    caption: 'Loading',
    spinnerColor: '#ffffff',
    spinnerSize: 60,
    spinnerWidth: 4,
    theme: {},
    position: 'absolute'
};

export default Transition;
