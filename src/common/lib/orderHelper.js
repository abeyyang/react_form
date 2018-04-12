import moment from 'moment-timezone';
import {
    ORDER_STATUS_FULLY_CANCELLED,
    ORDER_STATUS_FULLY_EXECUTED,
    ORDER_STATUS_PENDING_CANCELLATION,
    ORDER_STATUS_PENDING_CAPTURE,
    ORDER_STATUS_PENDING_DEALING,
    ORDER_STATUS_PARTIALLY_CANCELLED,
    ORDER_STATUS_PARTIALLY_EXECUTED,
    ORDER_STATUS_UNEXECUTED,
    ORDER_STATUS_PENDING_AMENDMENT,
    ORDER_STATUS_PENDING_TRANSFORM,
    ORDER_STATUS_PENDING_EFFECTIVE,
    ORDER_STATUS_PENDING_APPROVAL,
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_EXPIRED,
    ORDER_STATUS_TWILIGHT_CANCEL,
    ORDER_STATUS_DEAL,
    ORDER_INSTRUCTION_TYPE_BUY,
    ORDER_INSTRUCTION_TYPE_SELL,
    ORDER_TYPE_LIMIT_PRICE_ORDER,
    ORDER_TYPE_MARKET_ORDER,
    ORDER_TYPE_AT_AUCTION_ORDER,
    ORDER_TYPE_AT_AUCTION_LIMIT_ORDER,
    ORDER_TYPE_STOP_LOSS,
    ORDER_TYPE_TWO_WAY_LIMIT,
    ORDER_TYPE_TARGET_BUY_SELL_ORDER,
    ORDER_SOURCE_INTERNET_BANKING_3,
    ORDER_SOURCE_BRANCH,
    ORDER_STATUS_PENDING,
    ORDER_STATUS_EXECUTED,
    ORDER_STATUS_EXECUTED_OR_CANCELLED
} from  'constant';

export default class OrderHelper {
    static getProcessingStatusDisplay (orderProcessingStatusCode) {
        switch (orderProcessingStatusCode) {
            case ORDER_STATUS_FULLY_CANCELLED:
                return 'Fully Cancelled';
            case ORDER_STATUS_FULLY_EXECUTED:
                return 'Fully Executed';
            case ORDER_STATUS_PENDING_CANCELLATION:
                return 'Pending Cancellation';
            case ORDER_STATUS_PENDING_CAPTURE:
                return 'Pending Capture';
            case ORDER_STATUS_PENDING_DEALING:
                return 'Pending Dealing';
            case ORDER_STATUS_PARTIALLY_CANCELLED:
                return 'Partially Cancelled';
            case ORDER_STATUS_PARTIALLY_EXECUTED:
                return 'Partially Executed';
            case ORDER_STATUS_UNEXECUTED:
                return 'Unexecuted';
            case ORDER_STATUS_PENDING_AMENDMENT:
                return 'Pending Amendment';
            case ORDER_STATUS_PENDING_TRANSFORM:
                return 'Pending Transform';
            case ORDER_STATUS_PENDING_EFFECTIVE:
                return 'Pending Effective';
            case ORDER_STATUS_PENDING_APPROVAL:
                return 'Order Submitted';
            case ORDER_STATUS_CANCELLED:
                return 'Order Submitted';
            case ORDER_STATUS_EXPIRED:
                return 'Expired';
            case ORDER_STATUS_TWILIGHT_CANCEL:
                return 'Twilight cancel';
            case ORDER_STATUS_DEAL:
                return 'Order Submitted';
            case ORDER_STATUS_PENDING:
                return 'Pending';
            case ORDER_STATUS_EXECUTED_OR_CANCELLED:
                return 'Expired/Cancelled';
        }
    }
    static getProcessingStatusFilterDisplay (orderProcessingStatusCode) {
        switch (orderProcessingStatusCode) {
            case ORDER_STATUS_PENDING:
                return 'Pending';
            case ORDER_STATUS_EXECUTED:
                return 'Executed';
            case ORDER_STATUS_EXECUTED_OR_CANCELLED:
                return 'Expired/Cancelled';
        }
    }

    static getInstructionTypeDisplay (portfolioOrderReferenceTypeCode) {
        return (portfolioOrderReferenceTypeCode === ORDER_INSTRUCTION_TYPE_BUY) ? 'Buy' : 'Sell';
    }

    static getOrderTypeDisplay (portfolioOrderTypeCode) {
        switch (portfolioOrderTypeCode) {
            case ORDER_TYPE_LIMIT_PRICE_ORDER:
                // return 'Limit Price Order';
                return 'Buy';
            case ORDER_TYPE_MARKET_ORDER:
                return 'Market Order';
            case ORDER_TYPE_AT_AUCTION_ORDER:
                return 'At-Auction Order';
            case ORDER_TYPE_AT_AUCTION_LIMIT_ORDER:
                return 'At-Auction Limit Order';
            case ORDER_TYPE_STOP_LOSS:
                return 'Stop loss';
            case ORDER_TYPE_TWO_WAY_LIMIT:
                return 'Two way limit';
            case ORDER_TYPE_TARGET_BUY_SELL_ORDER:
                return 'Target buy sell order';
        }
    }
    static getInstructionTypeFilters () {
        return [ORDER_INSTRUCTION_TYPE_BUY, ORDER_INSTRUCTION_TYPE_SELL].map((code) => {
            return {
                title: this.getInstructionTypeDisplay(code),
                value: code
            };
        });
    }

    static getProcessingStatusFilters () {
        return [
            ORDER_STATUS_PENDING,
			ORDER_STATUS_EXECUTED,
			ORDER_STATUS_EXECUTED_OR_CANCELLED
        ].map((code) => {
            return {
                title: this.getProcessingStatusFilterDisplay(code),
                value: code
            };
        });
    }

    static getReferenceNum (order) {
        const pad = (num, length) => {
            const zero = length - num.toString().length + 1;
            return new Array(+(zero > 0 && zero)).join('0') + num;
        };
        return `${order.portfolioOrderId.portfolioOrderReferenceTypeCode}-${pad(order.portfolioOrderId.portfolioOrderReferenceNumber, 6)}`;
    }

    static getOrderSource (sourceInstructionCode) {
        switch (sourceInstructionCode) {
            case ORDER_SOURCE_INTERNET_BANKING_3:
                return 'Internet Banking';
            case ORDER_SOURCE_BRANCH:
                return 'Branch';
            default:
                return '';
        }
    }
    static getPotentialCashDividendRate (order) {
        let rateValue = '';
        if (order && order.productDetail) {
            if (order.productDetail.fixCashDivRt) {
                rateValue = order.productDetail.fixCashDivRt;
            }else if (order.productDetail.dayInCashDivRt) {
                rateValue = order.productDetail.dayInCashDivRt;
            }else if (order.productDetail.dayOutCashDivRt) {
                rateValue = order.productDetail.dayOutCashDivRt;
            }
        }
        return rateValue;
    }
    static getpotentialCashDividendRateperAnnum (order) {
        let rateValue = '';
        if (order && order.productDetail) {
            if (order.productDetail.fixCashDivRtPa) {
                rateValue = order.productDetail.fixCashDivRtPa;
            }else if (order.productDetail.dayInCashDivRtPa) {
                rateValue = order.productDetail.dayInCashDivRtPa;
            }else if (order.productDetail.dayOutCashDivRtPa) {
                rateValue = order.productDetail.dayOutCashDivRtPa;
            }
        }
        
        return rateValue;
    }
};
