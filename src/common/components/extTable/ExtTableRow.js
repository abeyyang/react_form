import React, { Component, PropTypes } from 'react';
import { ExtTableColumn } from './ExtTableColumn';

export class ExtTableRow extends Component {
    constructor(props) {
        super(props);
        this.handleOnColumnSizeChange = this.handleOnColumnSizeChange.bind(this);
        this.renderChildrenContext = this.renderChildrenContext.bind(this);
    }
    handleOnColumnSizeChange(width,index) {
        const { header,onHeaderDataChange } = this.props;
        const headerItem = header[index];
        const type = Object.prototype.toString.call(headerItem);
        let headerData = {};
        if(type==='[object Object]') {
            headerData = {
                ...headerItem,
                width
            };
        }else if(type ==='[object String]' || type==='[object Number]') {
            headerData = {
                title: headerItem,
                width
            };
        }else {
            headerData = {
                width
            };
        }
        this.props.header[index] = headerData;
        typeof onHeaderDataChange === 'function' && onHeaderDataChange(this.props.header);
    }
    renderChildrenContext () {
        const { children, header } = this.props;
        const type = Object.prototype.toString.call(children);
        let mapChildren = [];
        if(type === '[object Object]') {
            mapChildren.push(children);
        } else if (type === '[object Array]') {
            mapChildren = children;
        }
        const result = [];
        mapChildren && mapChildren.map((item, key)=>{
            const iType = Object.prototype.toString.call(item);
            if(iType === '[object Object]') {
                if(React.isValidElement(item)) {
                    const mTypeString = item.type.toString();
                    const mTypeArr = mTypeString.match(/(function)(\s*)([a-zA-Z0-9\_\-]*)\(/);
                    const mTypeStr = mTypeArr && mTypeArr.length>3 ? mTypeArr[3] : '';
                    if(mTypeStr === 'ExtTableColumn') {
                        result.push(React.cloneElement(item,{
                            key,
                            onSizeChange: (sWidth)=>this.handleOnColumnSizeChange(sWidth,key)
                        }));
                    }
                }
            }
        });
        return result;
    }
    render () {
        const { data, header } = this.props;
        const childrenTD = this.renderChildrenContext();
        return (<tr>
            {
                header && header.map((item,key)=>{
                    const headerItem = item;
                    const subValue = data[headerItem['key']];
                    const subType = Object.prototype.toString.call(subValue);
                    const width = typeof headerItem === 'object' && headerItem['width'] ? headerItem['width'] : '';
                    const columnType = typeof headerItem === 'object' && headerItem['type'] ? headerItem['type'] : '';
                    return <ExtTableColumn onSizeChange={(sWidth)=>this.handleOnColumnSizeChange(sWidth,key)} key={key} data={subValue} type={columnType} width={width} />
                })
            }
            {childrenTD}
        </tr>);
    }
}

ExtTableRow.propTypes = {
    data: PropTypes.object.isRequired,
    header: PropTypes.array.isRequired,
    onHeaderDataChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element
    ])
};


/*Object.keys(data).map((subItem, subKey) => {
    const subValue = data[subItem];
    const subType = Object.prototype.toString.call(subValue);
    const headerItem = header[subKey] || {};
    const width = typeof headerItem === 'object' && headerItem['width'] ? headerItem['width'] : '';
    const columnType = typeof headerItem === 'object' && headerItem['type'] ? headerItem['type'] : '';
    return <ExtTableColumn onSizeChange={(sWidth)=>this.handleOnColumnSizeChange(sWidth,subKey)} key={subKey} data={subValue} type={columnType} width={width} />
})*/