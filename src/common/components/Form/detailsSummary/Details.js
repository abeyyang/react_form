import React, { Component, PropTypes, cloneElement } from 'react';
import classNames from 'classnames';
import styles from './style.scss';

class Details extends Component {
    constructor (props) {
        super(props);

        this.state = {
            open: props.open
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.open !== this.state.open) {
            this.setState({ open: nextProps.open });
        }
    }

    handleClick (event) {
        this.setState({ open: !this.state.open });
    }

    handleKeyPress (event) {
        this.setState({ open: !this.state.open });
    }

    render () {
        const { children, theme } = this.props;
        const { open } = this.state;

        let summary = null;
        const otherChildren = [];
        children.map((child) => {
            if (child.type && child.type.name === 'Summary') {
                summary = cloneElement(child, {
                    children: child.props.children,
                    handleClick: this.handleClick,
                    handleKeyPress: this.handleKeyPress,
                    theme: child.props.theme
                });
            } else {
                otherChildren.push(child);
            }
        });

        return (
            <details
                open={open}
                className={classNames(styles.details, theme.details)}
            >
                { summary }
                { otherChildren }
            </details>
        );
    }
}

Details.defaultProps = {
    open: false,
    theme: {}
};

Details.propTypes = {
    children: PropTypes.array,
    open: PropTypes.bool,
    theme: PropTypes.object
};

export default Details;
