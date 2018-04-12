import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fonticon';
import amountEditorPanel from './AmountEditorPanel.scss';
import {
    toEditModeNumberStyle,
    eq,
    add,
    subtract
} from './numberUtils';
import withCommonEditorPanelBehavior from './withCommonEditorPanelBehavior';
import EditorPanelButtonBar from './EditorPanelButtonBar';
import OrderInputConfig from './OrderInputConfig';
import SpinnerInput from './SpinnerInput';
import {FormattedMessage, injectIntl} from "react-intl";
import formatHelper from "lib/formatHelper";

class AmountEditorPanel extends Component {
    static propTypes = {
        EditorPanel: React.PropTypes.func.isRequired,
        amount: React.PropTypes.string.isRequired,
        editorPanelButtonBarProps: React.PropTypes.func,
        goToNextStep: React.PropTypes.func,
        registerOrderInputFieldGetter: React.PropTypes.func,
        syncInputData: React.PropTypes.func,
        value: React.PropTypes.number
    };

    constructor (props) {
        super(props);
        this.state = {
            value: props.value
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.buttonBarRef = null;
        this.inputRef = null;
        this.cautionMsgRef = null;
        this.amountDecimals = OrderInputConfig.formatting.HK.amountDecimals;
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            value: nextProps.value
        });
        this.onInputChange(nextProps.value);
        console.log('AmountEditorPanel.componentWillReceiveProps------------');
    }

    componentDidUpdate (prevProps, prevState) {
        console.log('AmountEditorPanel.componentDidUpdate------------');
    }

    componentDidMount () {
        this.onInputChange(this.state.value);
    }

    shouldComponentUpdate (nextProps, nextState) {
        console.log('AmountEditorPanel.shouldComponentUpdate!');
        const isRequiredToRerender = !eq(nextState.value, this.inputRef.value());
        console.log(
            `AmountEditorPanel.shouldComponentUpdate() isRequiredToRerender = ${isRequiredToRerender}`
        );
        return isRequiredToRerender;
    }

    onInputChange (newPrice) {
        const currentValue = this.inputRef.value();
        if (
            currentValue > 0 && 
            (currentValue - this.props.productDetails.minimunInvestmentAmount) >= 0 &&
            (currentValue - this.props.productDetails.minimunInvestmentAmount) % this.props.productDetails.nominalAmount == 0 || !currentValue) {
            this.cautionMsgRef.className = classNames(amountEditorPanel['caution-panel'], amountEditorPanel.hidden);
        } else {
            this.cautionMsgRef.className = amountEditorPanel['caution-panel'];
        }
        this.buttonBarRef && this.buttonBarRef.isReadyToPreview();
    }

    render () {
        const {
            productDetails,
            EditorPanel,
            intl
        } = this.props;
        const currency = formatHelper.getNLS(intl.formatMessage, productDetails.currency);
        const amount = toEditModeNumberStyle(this.state.value);
        const formattingConfig = OrderInputConfig.formatting.HK;
        const lowestAmount = 0.01;
        const highestAmount = formattingConfig.amountMaxValue - productDetails.nominalAmount;
        const amountDecimals = this.amountDecimals;
        this.props.registerOrderInputFieldGetter(
            () => {
                return this.inputRef.value();
            },
            () => {
                const value = this.inputRef.value();
                if (
                    value > 0 &&
                    (value - productDetails.minimunInvestmentAmount) >= 0 &&
                    (value - productDetails.minimunInvestmentAmount) % productDetails.nominalAmount == 0 ) {
                    this.cautionMsgRef.className = classNames(amountEditorPanel['caution-panel'], amountEditorPanel.hidden);
                    return true;
                } else {
                    this.cautionMsgRef.className = amountEditorPanel['caution-panel'];
                    return false;
                }
            }
        );

        class PriceSpinnerInput extends SpinnerInput {
            plus () {
                let newValue = null;
                const inputValue = this.value();
                if (inputValue === null || inputValue === '') {
                    newValue = null;
                } else {
                    if (highestAmount <= inputValue) {
                        newValue = highestAmount;
                        return;
                    } else {
                        const spread = productDetails.nominalAmount;
                        newValue = add(inputValue, spread);
                        newValue = this.handlePrecision(newValue);
                    }
                }
                this.handleInputValueChange(newValue, (newState) => {
                    this.inputRef.value = newState.displayValue;
                });
            }

            minus () {
                let newValue = null;
                const inputValue = this.value();
                if (inputValue <= lowestAmount) {
                    return;
                } else {
                    const spread = productDetails.nominalAmount;                   
                    newValue = subtract(inputValue, spread);
                    newValue = this.handlePrecision(newValue);

                    this.handleInputValueChange(newValue, (newState) => {
                        this.inputRef.value = newState.displayValue;
                    });
                }
            }
            
            adjustMinusClassName () {
                if (this.value() > lowestAmount) {
                    this.minusBtnRef.classList.remove(amountEditorPanel.disableBtn);
                } else {
                    this.minusBtnRef.classList.add(amountEditorPanel.disableBtn);
                }

                if (this.value() < highestAmount) {
                    this.plusBtnRef.classList.remove(amountEditorPanel.disableBtn);
                } else {
                    this.plusBtnRef.classList.add(amountEditorPanel.disableBtn);
                }
            }            
        }

        return (

         
            
            <EditorPanel fieldLabel="Amount" underlyingNum={this.props.underlyingNum} >
                <div className={amountEditorPanel.fieldDescriptionSection}>
                    <p className={amountEditorPanel.padt}><FormattedMessage id="amounteditorpanel.amount"/></p>
                    <p className={amountEditorPanel.padb}>
                        impotance of digital technology ....
                    </p>
                </div>
                <div className={amountEditorPanel.schedule}>
                    <p><FormattedMessage id="amounteditorpanel.inputamount"/></p>
                    <PriceSpinnerInput
                        maxIntegerLength={formattingConfig.amountMaxLength}
                        currencyLeft
                        value={amount}
                        decimals={amountDecimals}
                        currency
                        currency={currency}
                        ref={(ref) => { this.inputRef = ref; }}
                        onChange={() => {
                            this.props.syncInputData();
                        }}
                        exchangeErrorMsg={this.exchangeErrorMsg}
                    />
                    <div className={amountEditorPanel.detail}>
                        <div className={amountEditorPanel.average}>
                            <div>
                                <div className={amountEditorPanel.left}><FormattedMessage id="amounteditorpanel.minimuninvesamount"/></div>
                                <div className={amountEditorPanel.right}> {currency}{' '}{productDetails.minimunInvestmentAmount_format}</div>
                            </div>
                            <div>
                                <div className={amountEditorPanel.left}><FormattedMessage id="amounteditorpanel.nomialamount"/></div>
                                <div className={amountEditorPanel.right}>{currency}{' '}{productDetails.nominalAmount_format}</div>
                            </div>
                        </div>                      
                        <div className={classNames(amountEditorPanel['caution-panel'], amountEditorPanel.hidden)} ref={(ref) => { this.cautionMsgRef = ref; }}>
                            <h4>
                                <FontIcon icon="circle-error-solid" className={amountEditorPanel.caution} />
                                <FormattedMessage id="amounteditorpanel.warning_1"/> <br/>
                            </h4>
                             <FormattedMessage id="amounteditorpanel.warning_2"/> 
                        </div>
                    </div>
                </div>
                <EditorPanelButtonBar
                    ref={(ref) => { this.buttonBarRef = ref; }}
                    {...this.props.editorPanelButtonBarProps}
                />
            </EditorPanel>
        );
    }
}

AmountEditorPanel.propTypes = {
    value: React.PropTypes.number
};
export default withCommonEditorPanelBehavior(injectIntl(AmountEditorPanel));
