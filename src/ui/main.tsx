import { Application } from 'modules/layout';
import * as React from 'react';
import { render } from 'react-dom';
import { store } from 'redux/store';
import { routes } from 'routes';

render(
	<Application store={store} routes={routes} />,
	document.getElementById('root'),
);

if ((module as any).hot) {
	(module as any).hot.accept();
}
