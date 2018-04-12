import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import StickyHeaderItem from './stickyHeaderItem';
import styles from './style.scss';
import { FormattedMessage, injectIntl } from "react-intl";

class StickyHeader extends Component {
    constructor (props) {
        super(props);
        this.handleTableHeaderClick = this.handleTableHeaderClick.bind(this);
    }

    handleTableHeaderClick (sortKey, sortOrder) {
        const { handleTableHeaderClick } = this.props;
        typeof handleTableHeaderClick !== 'undefined' && handleTableHeaderClick(sortKey);
    }

    render () {
        const { sortKey, sortOrder, theme, locale } = this.props;
        const items = [   
            { sortKey: 'code', title:"Product type"},
            { sortKey: 'underlyingStockCode_sort', title: "Product name *"},
            { sortKey: 'structureType', title: "PRODUCT CODE" },
            { sortKey: 'period_sort', title: "RISK LEVEL" },
            { sortKey: 'annum_sort', title: "Currency"},
            { sortKey: 'riskLevel', title: " "},
            { sortKey: 'tenor', title:  "DISCUSSED"},
            { sortKey: 'currency', title: "ADD / REMOVE PRODUCT"}, 
        ];
        const headerItems = items.map((item, index) => {
            if (item.title === '') {
                return <div key={item.sortKey} />;
            }

            let sortOrderNode = '';
            if (sortKey === item.sortKey) {
                sortOrderNode = sortOrder;
            }

            const config = {
                sortKey: item.sortKey,
                sortOrder: sortOrderNode,
                title: item.title,
                onClick: this.handleTableHeaderClick
            };

            // remove sorting function for these columns
            if (item.sortKey === 'chart') {
                delete config.onClick;
            }

            return <StickyHeaderItem key={item.sortKey} {...config} />;
        });

        return (
            <div className={classNames(styles.stickyHeader, theme.stickyHeader, theme.minWidth)}>
                { headerItems }
            </div>
        );
    }
};

StickyHeader.defaultProps = {
    theme: {}
};

StickyHeader.propTypes = {
    handleTableHeaderClick: PropTypes.func,
    sortKey: PropTypes.string,
    sortOrder: PropTypes.string,
    theme: PropTypes.object
};

export default StickyHeader;
