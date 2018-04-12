import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

class TabNode extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        const { tab, index, onClick } = this.props;
        onClick(tab, index);
    }

    render () {
        const { tab, theme, active } = this.props;
        const nodeStyle = classNames(styles.scrollTabNode, theme.scrollTabNode, {
            [`${styles.active}`]: active,
            [`${theme.active}`]: active && theme.active,
            [`${styles.inactive}`]: !active,
            [`${theme.inactive}`]: !active && theme.inactive
        });

        return (
            <div className={nodeStyle} onClick={this.handleClick}>
                <span>{tab.title}</span>
            </div>
        );
    }
}

TabNode.propTypes = {
    active: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    tab: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default TabNode;
