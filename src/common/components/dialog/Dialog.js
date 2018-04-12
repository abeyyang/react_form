import React, { Component, PropTypes } from 'react';
// import ReactDOM from 'react-dom';
import styles from './style.scss';
class Dialog extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        };
        this.setFormPosition = this.setFormPosition.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.isOpen !== this.state.isOpen) {
            this.setState({
                isOpen: nextProps.isOpen
            });
        }
    }
    componentDidMount () {
        this.setFormPosition();
    }
    componentDidUpdate () {
        this.setFormPosition();
    }
    setFormPosition () {
        const sender = this.form;
        if (sender) {
            const width = sender.clientWidth;
            const height = sender.clientHeight;
            const styleStr = ['margin-left: -', (width / 2), 'px; margin-top: -', (height / 2), 'px'].join('');
            sender.setAttribute('style', styleStr);
        }
    }
    handleOnClick () {
        typeof this.props.onClose === 'function' && this.props.onClose();
    }
    render () {
        const maskStyle = {
            display: this.state.isOpen ? 'block' : 'none'
        };
        return (
            <div className={styles.dialog} style={maskStyle}>
                <div>
                    <div className={styles.dialogForm}
                        ref={(self) => {
                            this.form = self;
                        }}
                    >
                        <button onClick={this.handleOnClick} className={styles.dialogClose}>×</button>
                        <div className={styles.dialogContext}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.element,
        PropTypes.node
    ]),
    onClose: PropTypes.func
};
Dialog.defaultProps = {
    isOpen: false
};

export default Dialog;
