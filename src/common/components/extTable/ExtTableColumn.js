import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DropDown, { DropdownItem } from '../Form/dropdown';
import { AmountDisplay, Textarea, Checkbox, MultiSelect, AmountInput, RadioButton } from 'CommonUI/Form';
import UIStyles from '../../styles/ui.scss';

export class ExtTableColumn extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: props.data
        };
        this.checkWidth = this.checkWidth.bind(this);
        this.renderContext = this.renderContext.bind(this);
    }
    componentDidMount(){
        this.checkWidth();
    }
    componentDidUpdate(){
        this.checkWidth();
    }
    checkWidth () {
        const dom = ReactDOM.findDOMNode(this);
        const cWidth = dom.clientWidth;
        const { width, onSizeChange } = this.props;
        if(cWidth !== width && cWidth !== width + 1 && (width === undefined || width === null || width.toString().length<=0)) {
            typeof onSizeChange=='function' && onSizeChange(cWidth);
        }
    }
    renderContext() {
        const {type, width} = this.props;
        const data = this.state.data;
        const dType = Object.prototype.toString.call(width);
        const dValue = dType === '[object Object]' ? data['value'] : data;
        if (data !== undefined && data !== null) {
            if(type == "select") {
                const selectData = data['data'];
                const wType = Object.prototype.toString.call(width);
                let vWidth = wType === '[object Number]' ? width.toString() + "px" : width;
                vWidth = /px$/i.test(vWidth) ? vWidth : vWidth + "px";
                if(selectData && Object.prototype.toString.call(selectData) === '[object Array]') {
                    return (<DropDown onClick={()=>alert('click')} width={vWidth} option={selectData} onChange={(value)=>{
                            //this.props.data.value= value['value'];
                            console.log('DropDownChenced');
                        }}
                    />);
                }else {
                    return '';
                }
            }else if (type == "checkbox"){
                return (<div className={UIStyles.checkboxList}><Checkbox isChecked={dValue} theme={UIStyles} onChange={(value)=>{ console.log(value); }} /></div>);
            }else {
                if(React.isValidElement(data)) {
                    return data;
                }else {
                    return data.toString();
                }
            }
        } else {
            return '';
        }
    }
    render () {
        const { children, width } = this.props;
        const context = this.renderContext();
        const wType = Object.prototype.toString.call(width);
        let vWidth = wType === '[object Number]' ? width.toString() + "px" : width;
            vWidth = /px$/i.test(vWidth) ? vWidth : vWidth + "px";
        return (
            <td>
                <div style={{display:'block',width:vWidth}}>
                    {context}
                    {children}
                </div>
            </td>
        );
    }
}

ExtTableColumn.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool
    ]),
    type: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.node,
        PropTypes.element
    ]),
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onSizeChange: PropTypes.func
};

ExtTableColumn.defaultProps = {
    type: '',
    width: '',
    data: null
};