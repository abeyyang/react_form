import React, { Component, PropTypes, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classNames';
import styles from './style.scss';

class Dropdown extends Component {
    constructor (props) {
        super(props);
        const options = props.option || [];
        let initDisplay = null;
        let initImage = '';
        for(const op of options){
            if(op['value'] == props.initialValue){
                initDisplay = op['displayValue'];
                initImage = op['img'] && <img src={op['img']}/>;
            }
        }
        this.state = {
            optionData: options,
            boxOpened: false,
            initialValue: props.initialValue,
            displayValue: initDisplay || <i style={{fontStyle: 'normal',color:'#999'}}>{this.props.placeholder}</i>,
            img: initImage
        }
        this.handleDisplayOptionClicked = this.handleDisplayOptionClicked.bind(this);
        this.handleDropdownBoxDisplayValueClick = this.handleDropdownBoxDisplayValueClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.loadingSelect = this.loadingSelect.bind(this);
        this.handleDisplayChildClicked = this.handleDisplayChildClicked.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.initialValue != this.state.initialValue){
            const options = nextProps.option || [];
            let initDisplay = null;
            let initImage = '';
            for(const op of options){
                if(op['value'] == nextProps.initialValue){
                    initDisplay = op['displayValue'];
                    initImage = op['img'] && <img src={op['img']}/>;
                }
            }
            this.setState({
                optionData: nextProps.option,
                initialValue: nextProps.initialValue,
                displayValue:initDisplay,
                img: initImage
            });
        }
        if (this.props.option != nextProps.option) {
            this.setState({
                optionData: nextProps.option,
            });
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
    handleDropdownBoxDisplayValueClick () {
        if (this.props.disabled) {
            return;
        }
        this.setState({
            boxOpened: !this.state.boxOpened
        });
    }
    handleDisplayOptionClicked (item, index) {
        if (this.props.disabled) {
            return;
        }

        this.setState({
            boxOpened: false,
            img: item.img && <img src={item.img} />,
            displayValue: item.displayValue
        });
        typeof this.props.onChange === 'function' && this.props.onChange(item, index);
    }
    handleDisplayChildClicked  (value, displayValue, currIndex) {
        if (this.props.disabled) {
            return;
        }
        if (value !== undefined && displayValue !== undefined) {
            this.setState({
                displayValue,
                boxOpened: false
            });

            typeof this.props.onChange === 'function' && this.props.onChange({value, displayValue}, currIndex);
        }
    }
    loadingSelect (option) {
        const { theme } = this.props;
        if (option && option.length > 0) {
            return option.map((item, index) => {
                return (
                    <li className={classNames(styles.dropdownBoxItem, theme.dropdownBoxItem)} key={index} title={item.displayValue} onClick={(event) => this.handleDisplayOptionClicked(item, index)}>
                        {item.img && <span className={classNames(styles.img, theme.img)}><img src={item.img} /></span>}
                        <span className={classNames(styles.labelText, theme.labelText)}>{item.displayValue}</span>
                    </li>
                );
            })
        } else {
            const originalChildren = this.props.children;
            const children = originalChildren.map ? originalChildren : [originalChildren];

            return children && children.map((child, index) => cloneElement(child, {
                key: `${this.props.name}-${child.props.value}`,
                currIndex: index,
                children: child.props.children,
                displayValue: child.props.displayValue,
                value: child.props.value,
                selected: (child.props.value === this.state.value),
                theme: Object.assign(this.props.theme, child.props.theme),
                onClick: this.handleDisplayChildClicked
            }));
        }
    }
    render () {
        const { optionData, boxOpened, displayValue, img } = this.state;
        const { id, name, theme, disabled, width } = this.props;
        const mStyle = width !== undefined || width !== null ? { width } : {};
        return (
            <div style={mStyle} className={classNames(
                    styles.dropdownBox, theme.dropdownBox,
                    boxOpened && styles.opened, boxOpened && theme.opened,
                    disabled && styles.disabled, disabled && theme.disabled
                )}
            >
                <div className={classNames(styles.dropdownBoxDisplayValue, theme.dropdownBoxDisplayValue)}
                    onClick={this.handleDropdownBoxDisplayValueClick}
                >
                    {img}{displayValue}
                </div>
                <div className={classNames(styles.dropdownBoxValue, theme.dropdownBoxValue)}>
                    <ul>
                        {
                            this.loadingSelect(optionData)
                        }
                    </ul>
                </div>
                <input type="text" style={{display: 'none'}} id={id?id:null} value={this.state.displayValue} />
            </div>
        );
    }
}

Dropdown.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    id: PropTypes.string,
    initialValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    theme: PropTypes.object,
    option: PropTypes.array,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    width: PropTypes.string
};

Dropdown.defaultProps = {
    initialValue: '',
    option: [],
    theme: {},
    disabled: false,
    placeholder: "Please Enter"
};
export default Dropdown;
