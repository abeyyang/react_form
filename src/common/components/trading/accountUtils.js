import _ from 'lodash';

export default {};

const findAccountByChecksum = (accountList, checksum) => {
    return _.find(accountList, {
        checksum
    });
};
export { findAccountByChecksum };
