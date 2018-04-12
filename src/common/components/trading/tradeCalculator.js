import _ from 'lodash';

/**
 *
 *
 * @param {any} price
 * @param {any} amountValue
 * @returns
 */
function getQuantity (price, amountValue) {
    return (price > 0 && _.floor(amountValue / price)) || null;
}

/**
 *
 *
 * @param {any} price
 * @param {any} quantityValue
 * @returns
 */
function getAmount (price, quantityValue, precision = 3) {
    return price === null || quantityValue === null
        ? null
        : _.round(price * quantityValue, precision);
}

export default {
    getQuantity,
    getAmount
};
