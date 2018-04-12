import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import TabNode from './TabNode';
import styles from './style.scss';

class ScrollTab extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activeIndex: props.activeIndex
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (tab, index) {
        const { onClick } = this.props;
        typeof onClick === 'function' && onClick(tab, index);

        this.setState({
            activeIndex: index
        });
    }

    componentWillReceiveProps (nextProps) {
        this.state = {
            activeIndex: nextProps.activeIndex
        };
    }

    render () {
        const { id, tabs, theme } = this.props;
        const tabNodes = tabs.map((tab, index) => {
            return (
                <TabNode tab={tab} onClick={this.handleClick} key={index} index={index} theme={theme} active={index === this.state.activeIndex} />
            );
        });

        return (
            <div className={classNames(styles.scrollTab, theme.scrollTab)}>
                {tabNodes}
                <input type="text" style={{display: 'none'}} id={id?id:null} value={this.state.activeIndex} />
            </div>
        );
    }
};

ScrollTab.propTypes = {
    tabs: PropTypes.array.isRequired,
    activeIndex: PropTypes.number,
    theme: PropTypes.object,
    onClick: PropTypes.func
};

ScrollTab.defaultProps = {
    activeIndex: 0,
    theme: {}
};

export default ScrollTab;
