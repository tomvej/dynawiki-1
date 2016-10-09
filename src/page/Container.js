import {connect} from 'react-redux';

import Node from './Node';
import {getRootId} from './selectors';

const mapStateToProps = (state) => ({
    id: getRootId(state),
});

export default connect(mapStateToProps)(Node);
