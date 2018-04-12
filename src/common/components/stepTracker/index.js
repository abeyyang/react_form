import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from './style.scss';
import StepTrackerItem from './StepTrackerItem';

/* eslint-disable no-console */
class StepTracker extends Component {
    constructor (props) {
        super(props);
        this.state = {
            currentStep: props.currentStep
        };
        this.perWidth = '';
        this.getItemWidth = this.getItemWidth.bind(this);
        this.setItemWidth = this.setItemWidth.bind(this);
        this.windowResize = this.windowResize.bind(this);
        this.bindAndUnBindEvent = this.bindAndUnBindEvent.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    componentDidMount () {
        this.setItemWidth();
        this.bindAndUnBindEvent(true);
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.currentStep !== this.state.currentStep) {
            this.setState({
                currentStep: nextProps.currentStep
            });
            typeof this.props.onChange === 'function' && this.props.onChange(nextProps.currentStep,nextProps.data[nextProps.currentStep]);
        }
    }
    componentDidUpdate () {
        this.setItemWidth();
    }
    componentWillUnMount () {
        this.bindAndUnBindEvent(false);
    }
    bindAndUnBindEvent (isBind) {
        if (this.tracker) {
            if (window.addEventListener) {
                if (isBind) {
                    window.addEventListener('resize', this.windowResize);
                } else {
                    window.removeEventListener('resize', this.windowResize);
                }
            } else if (window.attachEvent) {
                if (isBind) {
                    window.attachEvent('onresize', this.windowResize);
                } else {
                    window.dettachEvent('onresize', this.windowResize);
                }
            }
        }
    }
    getItemWidth (onRender) {
        const sender = ReactDOM.findDOMNode(this);
        const dom = sender.querySelector("div");
        const itemLength = this.props.data && this.props.data.length ? this.props.data.length : 1;
        let pWidth = dom && dom.clientWidth > 0 ? dom.clientWidth : 840;
        // pWidth = pWidth <= 840 ? pWidth : 840;
        const perWidth = parseInt(pWidth / itemLength, 10);
        let result = '';
        this.width = dom.clientWidth;
        if (dom.clientWidth >= 960 || dom.clientWidth <= 480) {
            result = perWidth;
        } else {
            const ulDOM = dom.querySelector("ul");
            result = "80px";
            if(ulDOM) {
                let eleWidth = 0;
                for(var ele of ulDOM.children){
                    eleWidth += ele.clientWidth;
                }
                if(eleWidth>this.width) {
                    result = itemLength - 1 > 0 ? ((this.width - 25) / (itemLength - 1)) + "px" : "80px";
                }
            }
        }
        return result;
    }
    setItemWidth () {
        const perWidth = this.getItemWidth();
        this.perWidth = perWidth;
    }
    windowResize () {
        this.setItemWidth();
        this.setState({});
    }
    handleOnClick(index,item,title){
        if(this.props.clickChange) {
            this.setState({
                currentStep: index
            });
            typeof this.props.onChange === 'function' && this.props.onChange(index,item);
        }
    }
    render () {
        const { currentStep } = this.state;
        const { data } = this.props;
        const perItemWidth = this.perWidth;
        const currentTitle = currentStep >0 && currentStep<=data.length ? data[currentStep-1]['value'] : 'none';
        const percent = this.props.data && this.props.data.length>0 ? ((1/this.props.data.length) * 100) + "%" : '';
        const getSizeStyle = (()=>{
            // this.width === undefined && this.setItemWidth();
            // console.log(this.width, '*****');
            if(this.width<480) {
                return styles.minSize;
            }else if(this.width>=480 && this.width<960) {
                return styles.mediumSize;
            }else {
                return styles.largeSize;
            }
        })();
        
        return (
            <div className={styles.stepTrackerContainer}>
                <div className={getSizeStyle} ref={(self)=>{this.senderElement = self;}}>
                    <ul className={classNames([styles.stepTracker, this.props.className])}
                        ref={(self) => {
                            this.tracker = self;
                        }}
                    >
                        {
                            this.props.data && this.props.data.map && this.props.data.map((item, key) => {
                                const title = item.value || item.title || item;
                                const isActive = key < currentStep;
                                
                                let perWidth = key === 0 && this.width <= 480 ? '' : perItemWidth;
                                perWidth = perWidth === undefined || perWidth === null || perWidth.toString().length<=0 ? percent : perWidth;
                                if ((this.width < 960 ) && key===0) {
                                    perWidth="25px";
                                }
                                return (<StepTrackerItem data={item} onClick={this.handleOnClick} index={key + 1} isActive={isActive} key={key} title={title} width={perWidth} />);
                            })
                        }
                    </ul>
                    <h5>{currentTitle}</h5>
                </div>
            </div>
        );
    }
}

StepTracker.propTypes = {
    currentStep: PropTypes.number.isRequired,
    data: PropTypes.array.isRequired,
    clickChange: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func
};

StepTracker.defaultProps = {
    className: '',
    data: [],
    currentStep: 0,
    clickChange: true
};

export default StepTracker;
