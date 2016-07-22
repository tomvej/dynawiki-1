import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import store from './store'
import page from './page'

render(
    (<Provider store={store}>
        <page.Container/>
    </Provider>),
    document.getElementById('content')
);
