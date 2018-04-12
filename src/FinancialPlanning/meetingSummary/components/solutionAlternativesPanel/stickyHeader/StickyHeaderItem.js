import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

class StickyHeaderItem extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        const { sortKey, onClick } = this.props;
        typeof onClick !== 'undefined' && onClick(sortKey);
    }

    render () {
        const { title, sortOrder } = this.props;

        let arrowNode = '';
        if (typeof this.props.onClick !== 'undefined') {
            arrowNode = (
                <div className={styles.arrow}>
                    <div className={classNames(styles.ascArrow, sortOrder === 'asc' && styles.active)} />
                    <div className={classNames(styles.descArrow, sortOrder === 'desc' && styles.active)} />
                </div>
            );
        }

        return (
            <div className={styles.stickyHeaderItem} onClick={this.handleClick}>
                <div className={styles.discussProTitle}>{title}</div>
            </div>
        );
    }
}

StickyHeaderItem.propTypes = {
    sortKey: PropTypes.string,
    sortOrder: PropTypes.string,
    title: PropTypes.node,
    onClick: PropTypes.func
};

export default StickyHeaderItem;