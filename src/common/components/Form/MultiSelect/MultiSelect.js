import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Button from 'wealth/lib/web/components/ui/button';
import Checkbox from '../checkbox';
import classNames from 'classnames';
import styles from './style.scss';

class MultiSelect extends Component {

    constructor (props) {
        super(props);
        let displayValue = (<i style={{fontStyle: 'normal',color:'#999'}}>{this.props.placeholder}</i>);
        const options = JSON.parse(JSON.stringify(props.option || []));
        this.checkAll = this.checkAll.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdownBoxDisplayValueClick = this.handleDropdownBoxDisplayValueClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleDropDownListClick = this.handleDropDownListClick.bind(this);
        this.getDropDownWidth = this.getDropDownWidth.bind(this);
        this.saveOldCheckData = this.saveOldCheckData.bind(this);
        if(options && options.length>0 && props.selectData && props.selectData.length>0){
            for(const tmpData of options) {
                props.selectData.map && props.selectData.map((item)=>{
                    if(tmpData.value === item.value) {
                        tmpData.isChecked = true;
                    }
                });
            }
            displayValue = this.handleSubmit(true);
        }
        this.state = {
            optionData: options,
            checkAll: false,
            boxOpened: false,
            displayValue
        };
        this.oldCheckData = [];
    }
    componentWillReceiveProps(nextPros) {
        if(Object.prototype.toString.call(nextPros.selectData) === '[object Array]' && nextPros.selectData != this.props.selectData){
            const { option } = this.props;
            if (option && option.length > 0 && nextPros.selectData) {
                const optionData = this.state.optionData;
                for (const key in optionData) {
                    const tmpData = optionData[key];
                    let isChecked = false;
                    nextPros.selectData.map && nextPros.selectData.map((item) => {
                        if (Object.prototype.toString.call(item) === '[object Object]' && tmpData.value == item.value) {
                            isChecked = true;
                        }
                    });
                    tmpData.isChecked = isChecked;
                }
                const displayValue = this.handleSubmit(true);
                this.setState({
                    displayValue,
                    initialValue: nextPros.initialValue
                });
            }
        }
        
    }
    checkAll () {
        const { checkAll, optionData } = this.state;
        for (let i = 0; i< optionData.length; i++) {
            optionData[i].isChecked = !checkAll;
        }
        this.setState({
            optionData,
            checkAll: !checkAll,
            displayValue: this.handleSubmit(true)
        });
    }
    checkboxChange (event, isChecked, index) {
        if (this.props.disabled) {
            return;
        }
        // this.saveOldCheckData(index,isChecked);
        const { optionData } = this.state;
        optionData[index].isChecked = isChecked;
        const selectData = [];
        let checkState = true;
        for (let i = 0; i < optionData.length; i++) {
            !optionData[i].isChecked && (checkState = false);
        }
        this.setState({
            optionData,
            checkAll: checkState,
            displayValue: this.handleSubmit(true)
        });

        typeof this.props.onDropDownItemChange === 'function' && this.props.onDropDownItemChange(optionData[index]);
    }
    saveOldCheckData (index,isChecked) {
        const { optionData } = this.state;
        const oldCheckData = this.oldCheckData || [];
        if(optionData[index]) {
            let isExists = false;
            for(const item of oldCheckData) {
                if(item.key === index){
                    isExists = true;
                    break;
                }
            }
            !isExists && oldCheckData.push({
                key: index,
                value: optionData[index].isChecked,
                newValue: isChecked
            });
            this.oldCheckData = oldCheckData;
        }
    }
    componentDidMount () {
        document.addEventListener('click', this.handleClickOutside, true);
    }
    componentWillUnmount () {
        document.removeEventListener('click', this.handleClickOutside, true);
    }
    handleClickOutside (event) {
        const dom = ReactDOM.findDOMNode(this);
        if (dom && !dom.contains(event.target)){
            this.setState({
                boxOpened: false
            });
        }
    }
    handleSubmit (isInitalize) {
        const optionData = this.state ? this.state.optionData : this.props.option;
        const { displayString } = this.props;
        const selectData = [];
        let newDisplay = '';
        for(let value of optionData) {
            if(value.isChecked) {
                selectData.push(value);
            }
        }
        if(selectData.length==1){
            newDisplay = selectData[0]['displayValue'];
        }else if(selectData.length>1) {
            newDisplay = displayString.replace(/\{\{value\}\}/g, selectData.length);
        }else {
            newDisplay = <i style={{fontStyle: 'normal',color:'#999'}}>{this.props.placeholder}</i>;
        }
        this.oldCheckData = [];
        if(!isInitalize){
            this.setState({
                boxOpened: !this.state.boxOpened,
                displayValue: newDisplay
            });
            typeof this.props.onChange === 'function' && this.props.onChange(selectData);
        }else {
            return newDisplay;
        }
    }

    handleDropdownBoxDisplayValueClick (event) {
        event.nativeEvent.cancelBubble = true;
        if (this.props.disabled) {
            return;
        }
        this.setState({
            boxOpened: !this.state.boxOpened
        });
    }
    handleDropDownListClick(event) {
        event.nativeEvent.cancelBubble = true;
    }
    getDropDownWidth(){
        const { column } = this.props;
        let sWidth = 158;
        let width = sWidth;
        if(column > 1 && column < 10) {
            width = sWidth * column + column * 20;
        } else {
            width = this.displayElement ? this.displayElement.clientWidth : 360;
        }
        return width;
    }
    render () {
        const { optionData, boxOpened, displayValue } = this.state;
        const { id, name, theme, disabled, column } = this.props;
        const dropWidth = this.getDropDownWidth();
        const itemStyle = {
            float: column<=1 || column>=10 ? 'none' : 'left',
            width: column<=1 || column>=10 ? "100%" : '150px'
        };
        const labelStyle = {
            maxWidth: column<=1 || column>=10 ? '100%' : '',
            width: column<=1 || column>=10 ? '100%' : ''
        };

        return (
            <div className={classNames(
                    styles.dropdownBox, theme.dropdownBox,
                    boxOpened && styles.opened, boxOpened && theme.opened,
                    disabled && styles.disabled, disabled && theme.disabled
                )}
            >
                <div className={classNames(styles.dropdownBoxDisplayValue, theme.dropdownBoxDisplayValue)}
                    onClick={this.handleDropdownBoxDisplayValueClick}
                    ref={(self) => {
                        this.displayElement = self;
                    }}
                >
                    {displayValue}
                </div>
                <div className={classNames(styles.MultiCheckbox, theme.MultiCheckbox)}>
                    <div style={{ width: dropWidth + "px" }} onClick={this.handleDropDownListClick} className={classNames(styles.MultiCheckboxUl, theme.MultiCheckboxUl)}>
                        <ul>
                            {
                                optionData && optionData.map((item, index) => {
                                    return (
                                        <li style={itemStyle} className={classNames(styles.MultiCheckboxLi, theme.MultiCheckboxLi)} key={index} title={item.displayValue}>
                                            <label style={labelStyle} htmlFor={`${id}-${index}`}>
                                                <Checkbox name={name} id={`${id}-${index}`} index={index} theme={styles} isChecked={item.isChecked}
                                                    onChange={this.checkboxChange}
                                                />
                                                {item.img && <span className={classNames(styles.img, theme.img)}><img onClick={this.handleDropDownListClick} src={item.img} /></span>}
                                                <span className={classNames(styles.labelText, theme.labelText)}>{item.displayValue}</span>
                                            </label>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={classNames(styles.selectAll, theme.selectAll)}>
                        <Button value={(this.state.checkAll ? this.props.clear : this.props.selectAll)} isChecked={this.state.checkAll} onClick={this.checkAll} theme={styles} />
                        <Button value={this.props.confirm} onClick={()=>{this.handleSubmit(false)}} theme={styles} />
                    </div>
                </div>
            </div>
        )
    }
}

MultiSelect.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    theme: PropTypes.object,
    option: PropTypes.array,
    onChange: PropTypes.func,
    onDropDownItemChange: PropTypes.func,
    placeholder: PropTypes.string,
    displayString: PropTypes.string,
    disabled: PropTypes.bool,
    column:PropTypes.number,
    selectAll:PropTypes.string,
    confirm: PropTypes.string,
    clear: PropTypes.string,
    selectData: PropTypes.array.isRequired
};

MultiSelect.defaultProps = {
    option: [],
    selectData: [],
    theme: {},
    disabled: false,
    placeholder: "Please Select",
    displayString: "{{value}} Items",
    column:1,
    selectAll: "Select All",
    confirm: "Confirm",
    clear: "Clear"
};

export default MultiSelect;