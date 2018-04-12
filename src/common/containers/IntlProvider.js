import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

const mapStateToProps = (state) => {
    const { locale, messages, language } = state.intl;
    return { locale, messages, language };
};

export default connect(mapStateToProps)(IntlProvider);
