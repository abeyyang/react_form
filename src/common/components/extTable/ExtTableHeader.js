import React, { Component,PropTypes } from 'react';

export class ExtTableHeader extends Component {
    render () {
        const { data } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                    {
                        data && data.map && data.map((item,index)=>{
                            const type = Object.prototype.toString.call(item);
                            const title = type==='[object String]' ? item : item['title'];
                            let width = type==='[object Object]' && item['width'] ? item['width'] : '';
                            width = width.toString().length>0 ? (!/px$/i.test(width.toString()) ? width+"px": width) : width;
                            return (
                                <th key={index}>
                                <div style={{display:'block', width}}>{title}</div>
                                </th>);
                        })
                    }
                    </tr>
                </thead>
            </table>
        );
    }
}

ExtTableHeader.propTypes = {
    data: PropTypes.array
};