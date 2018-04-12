export const DEFAULT_API_MAX_RECORDS = 100;
// Order Processing Status
export const ORDER_STATUS_FULLY_CANCELLED = 'FLCN';
export const ORDER_STATUS_FULLY_EXECUTED = 'FLEX';
export const ORDER_STATUS_PENDING_CANCELLATION = 'PDCN';
export const ORDER_STATUS_PENDING_CAPTURE = 'PDCP';
export const ORDER_STATUS_PENDING_DEALING = 'PDDL';
export const ORDER_STATUS_PARTIALLY_CANCELLED = 'PTCN';
export const ORDER_STATUS_PARTIALLY_EXECUTED = 'PTEX';
export const ORDER_STATUS_UNEXECUTED = 'UNEX';
export const ORDER_STATUS_PENDING_AMENDMENT = 'PDAM';
export const ORDER_STATUS_PENDING_TRANSFORM = 'PTSF';
export const ORDER_STATUS_PENDING_EFFECTIVE = 'PDEF';
export const ORDER_STATUS_PENDING_APPROVAL = 'PAPP';
export const ORDER_STATUS_CANCELLED = 'CANC';
export const ORDER_STATUS_EXPIRED = 'EXPR';
export const ORDER_STATUS_TWILIGHT_CANCEL = 'TWCN';
export const ORDER_STATUS_DEAL = 'DEAL';
export const ORDER_STATUS_PENDING = 'PDDL,PDCN,PAPP,DEAL,CANC';
export const ORDER_STATUS_EXECUTED = 'FLEX';
export const ORDER_STATUS_EXECUTED_OR_CANCELLED = 'UNEX,FLCN';

// Order Instruction Type
export const ORDER_INSTRUCTION_TYPE_BUY = 'P';
export const ORDER_INSTRUCTION_TYPE_SELL = 'S';

// Order Type
export const ORDER_TYPE_LIMIT_PRICE_ORDER = 'L';
export const ORDER_TYPE_MARKET_ORDER = 'M';
export const ORDER_TYPE_AT_AUCTION_ORDER = 'A';
export const ORDER_TYPE_AT_AUCTION_LIMIT_ORDER = 'I';
export const ORDER_TYPE_STOP_LOSS = 'T';
export const ORDER_TYPE_TWO_WAY_LIMIT = 'W';
export const ORDER_TYPE_TARGET_BUY_SELL_ORDER = 'X';

// Order Source
export const ORDER_SOURCE_INTERNET_BANKING_3 = 'NET';
export const ORDER_SOURCE_BRANCH = 'BBC';

// Timezone

// Formatting
export const GENERAL_PRECISION = 2;
export const NOT_AVAILABLE_STRING = '--';
export const FORMAT_DATE = 'DD MMM YYYY';
export const EMPTY = '';

export const LAUNCH_PARAM_STR = 'LAUNCH_PARAM_STR'
