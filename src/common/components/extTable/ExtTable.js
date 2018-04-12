import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { ExtTableHeader } from './ExtTableHeader';
import { ExtTableRow } from './ExtTableRow';
import styles from './style.scss';
export class ExtTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: this.props.header,
            fixHeader: {}
        };
        this.onContainerScroll = this.onContainerScroll.bind(this);
        this.handlerOnHeaderDataChange = this.handlerOnHeaderDataChange.bind(this);
        this.renderChildrenContext = this.renderChildrenContext.bind(this);
    }
    componentDidMount(){
        const dom = ReactDOM.findDOMNode(this).parentElement;
        this.attachEvent(window,"scroll",this.onContainerScroll);
        this.attachEvent(dom,"scroll",this.onContainerScroll);
        this.isRender = true;
    }
    componentWillUnMount(){
        const dom = ReactDOM.findDOMNode(this).parentElement;
        this.attachEvent(window,"scroll",this.onContainerScroll, true);
        this.attachEvent(dom,"scroll",this.onContainerScroll, true);
        this.isRender = false;
    }
    onContainerScroll(event) {
        if(this.isRender) {
            const  dom = ReactDOM.findDOMNode(this);
            const left = dom.offsetLeft;
            const top = dom.offsetTop;
            const scrollTop = window.scrollY;
            if(scrollTop>=top && scrollTop < top + dom.clientHeight) {
                this.setState({
                    fixHeader: {
                        position:"fixed",
                        left,
                        top:0,
                        zIndex: 10000
                    }
                });
            }else {
                if(this.state.fixHeader.position) {
                    this.setState({
                        fixHeader: {}
                    });
                }
            }
        }
    }
    attachEvent(sender,eventName,fn, isRemoveEvent) {
        if(window.addEventListener) {
            if(!isRemoveEvent) {
                sender.addEventListener(eventName,fn);
                console.log('addEventListener');
            } else {
                sender.removeEventListener(eventName,fn);
            }
        }else {
            if(!isRemoveEvent) {
                sender.attachEvent("on"+eventName,fn);
            }else {
                sender.dettachEvent("on"+eventName,fn); 
            }
        }
    }
    getHeaderData() {
        const mHeader = this.state.header || [];
        const firstData = this.props.data[0] || {};
        let index = 0;
        for(const key in firstData) {
            if(index >= mHeader.length){
                mHeader.push(key);
            }
            index++;
        }
        return mHeader;
    }
    handlerOnHeaderDataChange(hData){
        let isChanged = false;
        for(const key in this.state.header) {
            const tmpHeader = this.state.header[key];
            for(const subkey in hData) {
                if(hData[subkey]['width'] != tmpHeader['width']) {
                    isChanged = true;
                    break;
                }
            }
            if(isChanged) {
                break;
            }
        }
        if(isChanged) {
            this.setState({
                header: hData
            });
        }
        // console.log(hData,this.props.header);
    }
    renderChildrenContext () {
        const { children, header } = this.props;
        const type = Object.prototype.toString.call(children);
        const headerData = this.getHeaderData();
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
                    if(mTypeStr === 'ExtTableRow') {
                        result.push(React.cloneElement(item,{
                            key,
                            header: headerData,
                            onHeaderDataChange: this.handlerOnHeaderDataChange
                        }));
                    }
                }
            }
        });
        return result;
    }
    render() {
        const headerData = this.getHeaderData();
        const { data } = this.props;
        const fixHeader = this.state.fixHeader;
        const element = this.renderChildrenContext();
        return(
            <div className={styles.extTable}>
                <div className={styles.extTableHeader}>
                    <div style={fixHeader}>
                        <ExtTableHeader data={headerData} />
                    </div>
                </div>
                <div className={styles.extTableBody}>
                    <table>
                        <tbody>
                            {
                                data && data.map && data.map((item,index)=>{
                                    return <ExtTableRow onHeaderDataChange={this.handlerOnHeaderDataChange} data={item} header={headerData} key={index} />
                                })
                            }
                            {element}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ExtTable.propTypes = {
    data: PropTypes.array.isRequired,
    header: PropTypes.array.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node
    ])
};

ExtTable.defaultProps = {
    header: []
};