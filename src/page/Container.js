import {connect} from 'react-redux'

import Node from './Node'
import {getTopId} from './selectors'

const mapStateToProps = (state) => ({
    id: getTopId(state)
});

export default connect(mapStateToProps)(Node);
