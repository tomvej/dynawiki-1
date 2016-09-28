import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import './index.less';

import store from './store';
import popup from './popup';
import page from './page';

render(
    (<Provider store={store}>
        <div>
            <popup.Container />
            <page.Container />
        </div>
    </Provider>),
    document.getElementById('content')
);
