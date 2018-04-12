// @flow

import React, { Component, PropTypes } from 'react';
// import classNames from 'classnames';

class Handle extends Component {
    constructor (props: Object) {
        super(props);
        (this:any).onClick = this.onClick.bind(this);
    }

    onClick (value: number) {
        const { onClick } = this.props;
        typeof onClick === 'function' && onClick(value);
    }

    render () {
        const { offset, className } = this.props;

        return (
            <span className={className} style={{ left: `${offset}%` }} />
        );
    }
}

Handle.defaultProps = {
    offset: 0
};

Handle.propTypes = {
    offset: PropTypes.number.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Handle;
