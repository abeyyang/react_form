import { connect } from 'react-redux';

import { navigate } from 'SFP/common/actions/nav';

const mapStateToProps = (state) => ({
    navParams : state.nav.navParams,
    session : state.session
})

const mapDispatchToProps = {
    navigate
}

const Appconnect = (component) => ( connect(mapStateToProps, mapDispatchToProps)(component) )

export default Appconnect;
