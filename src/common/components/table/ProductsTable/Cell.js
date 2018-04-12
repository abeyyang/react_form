import React, { Component, PropTypes, cloneElement } from 'react';

class Cell extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        const { onClick, row, column } = this.props;
        onClick(row, column);
    }
    handleOnClick(){
        const { onClick, row, column } = this.props;
        onClick(row,column);
    }

    render () {
        const self = this;
        const { children, theme,row,column } = this.props;
        const childNode = cloneElement(children, {
            row:row,
            column:column,
            data:self.props.data,
            theme:self.props.theme,
            onClick:self.handleOnClick,
            add: self.props.add,
            discuss:self.props.discuss,
            remove: self.props.remove,
            change: self.props.change,
            expand:self.props.expand
        }
        
        );

        return (
            <div className={theme.cell} onClick={this.handleClick}>
                {childNode}
            </div>
        );
    }
}

Cell.defaultProps = {
    theme: {}
};

Cell.propTypes = {
    children: PropTypes.node,
    column: PropTypes.number,
    row: PropTypes.number,
    theme: PropTypes.object,
    onClick: PropTypes.func
};

export default Cell;
