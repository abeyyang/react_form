import React, { Component, PropTypes, cloneElement } from 'react';
import classNames from 'classnames';
import Cell from './Cell';
import styles from './style.scss';

class ProductTable extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inside: false
        };
        this.handleTableScroll = this.handleTableScroll.bind(this);
        this.handlePageScroll = this.handlePageScroll.bind(this);
        this.handleTableCellClick = this.handleTableCellClick.bind(this);
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }

    componentDidMount () {
        document.addEventListener('scroll', this.handlePageScroll);
        this.tableBody.addEventListener('scroll', this.handleTableScroll);
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.handlePageScroll);
        this.tableBody.removeEventListener('scroll', this.handleTableScroll);
    }

    componentWillReceiveProps(nextState){
        // console.log("props changed");
    }

    handlePageScroll (event) {
        const { rowHeight, headerHeight, snapOffset, topOffset } = this.props;
        const rect = this.table.getBoundingClientRect();

        if (!this.state.inside && rect.top < topOffset && rect.bottom > rowHeight + headerHeight - snapOffset) {
            this.setState({ inside: true });
        } else if (this.state.inside && (rect.top > topOffset || rect.bottom < rowHeight + headerHeight - snapOffset)) {
            this.setState({ inside: false });
        }
    }

    handleTableScroll () {
        this.scrollHead.scrollLeft = this.tableBody.scrollLeft;
    }

    handleTableCellClick (row, column) {
        const { handleTableCellClick } = this.props;
        typeof handleTableCellClick === 'function' && handleTableCellClick(row, column);
    }
    handleAddProduct (productId) {
        const { addProduct } = this.props;
        typeof addProduct === 'function' && addProduct(productId);
    }

    getRowKey (index) {
        const { getRowKey, data } = this.props;
        if (typeof getRowKey === 'function') {
            return getRowKey(data[index]);
        } else {
            return index;
        }
    }

    render () {
        const { theme,column, children, data, cell,openedComponent ,leftOffset, expandRowComponent, expandIndex, headerComponent, topOffset, openedIndex } = this.props;
        
        const self = this;
        let headerStyles = classNames(styles.tableHead, theme.tableHead);
        let topOffsetPixel = 0;
        let leftOffsetPixel = 0;
        if (this.state.inside) {
            headerStyles = classNames(styles.fixedHead, theme.fixedHead);
            topOffsetPixel = topOffset;
            leftOffsetPixel = leftOffset;
        }
        let length  = 0;
        if(column != undefined && column > 0){
            length = column
        } else {
            length = data.length;
        }

        let tableContent='', fixedColumnContent='';
        if(data != undefined){
            tableContent = data.map((rowData, rowIndex) => {
            const tableRow = rowData.map((data, columnIndex) => {
                const tableCellComponent = cloneElement(cell, {
                    data,
                    children: children[columnIndex],
                    row: rowIndex,
                    column: columnIndex,
                    onClick: self.handleTableCellClick,
                    add: self.props.add,
                    discuss: self.props.discuss,
                    remove: self.props.remove,
                    change: self.props.change,
                    open:self.props.open,
                    close:self.props.close,
                    expand:self.props.expand,
                    key: columnIndex,
                    expandIndex,
                    theme
                });
                if(columnIndex < length){
                    return tableCellComponent;
                }
            });

            const expandRowNode = expandIndex === rowIndex ? cloneElement(expandRowComponent, {
                data:rowData,
                row:rowIndex,
                open:self.props.open
            }) : null;
            const openedRowNode = openedIndex === rowIndex ? cloneElement(openedComponent, {
                data:rowData,
                row:rowIndex,
                close:self.props.close
            }) : null;
            if(openedIndex === rowIndex){
                return (
                    <div key={self.getRowKey(rowIndex)}>
                        <div className={classNames(styles.tableRow, theme.tableRow, theme.detailWidth, theme.detailHeight)}>
                            { openedRowNode }
                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={self.getRowKey(rowIndex)}>
                        <div className={classNames(styles.tableRow, theme.tableRow, theme.minWidth)}>
                            { tableRow }
                        </div>
                        { expandRowNode }
                    </div>
                );
            }
            
        });
    

    }

        const headerContent = cloneElement(headerComponent, {
            theme
        });

        return (
            <div className={classNames(styles.table, theme.table)}
                ref={(table) => { this.table = table; }}
            >
                <div className={classNames(headerStyles, styles.fixedHeaderColumn, theme.fixedHeaderColumn)} style={{ top: `${topOffsetPixel}px`,left:`${leftOffsetPixel}px` }}>
                    { headerContent }
                </div>
                <div className={headerStyles} ref={(scrollHead) => { this.scrollHead = scrollHead; }} style={{ top: `${topOffsetPixel}px`,left:`${leftOffsetPixel}px`}}>
                    { headerContent }
                </div>
                <div className={classNames(styles.tableBody, theme.tableBody)}
                    ref={(tableBody) => { this.tableBody = tableBody; }}
                >
                    { tableContent }
                </div>
            </div>
        );
    }
};

ProductTable.defaultProps = {
    cell: <Cell />,
    columnFixedCell: 0,
    expandRowComponent: null,
    expandIndex: -1,
    getRowKey: null,
    headerHeight: 0,
    headerComponent: null,
    rowHeight: 0,
    snapOffset: 0,
    theme: {},
    topOffset: 0
};

ProductTable.propTypes = {
    cell: PropTypes.element,
    children: PropTypes.node,
    data: PropTypes.array,
    expandIndex: PropTypes.number,
    expandRowComponent: PropTypes.element,
    getRowKey: PropTypes.func,
    handleTableCellClick: PropTypes.func,
    addProduct: PropTypes.func,
    removeProduct: PropTypes.func,
    open: PropTypes.func,
    close: PropTypes.func,
    change: PropTypes.func,
    headerComponent: PropTypes.element,
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    snapOffset: PropTypes.number,
    theme: PropTypes.object,
    topOffset: PropTypes.number
};

export default ProductTable;
