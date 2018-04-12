// @flow

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

const PieLegend = (props: Object) => {
    const { data, theme, unit } = props;

    const listNodes = data.map((item: Object, index: number) => {
        const style = {
            backgroundColor : item.color
        };

        return (
            // TODO - change 'index' to another name for 'key'
            // TODO - handle prefix and suffix unit
            <li key={index} className={classNames(styles.pieLegend, theme.pieLegend)}>
                <span className={classNames(styles.legendColorBox, theme.legendColorBox)} style={style} />
                <p className={classNames(styles.legendTitle, theme.legendTitle)}>
                    <span className={classNames(styles.legendName, theme.legendName)}>{item.name}</span><br/>
                    <span className={theme.legendValue}>{item.y}</span>
                </p>
            </li>
        );
    });

    return (
        <ul>
            {listNodes}
        </ul>
    );
};

PieLegend.propTypes = {
    data: PropTypes.array,
    theme: PropTypes.object,
    unit: PropTypes.string
};

PieLegend.defaultProps = {
    theme: {},
    unit: ''
};

export default PieLegend;
