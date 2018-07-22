import { Application } from 'modules/layout';
import * as React from 'react';
import { render } from 'react-dom';
import { routes } from 'routes';
import { store } from 'stores';

render(
	<Application store={store} routes={routes} />,
	document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production') {
	// tslint:disable-next-line:no-var-requires
	const {whyDidYouUpdate} = require('why-did-you-update');
	whyDidYouUpdate(React);
  }

if ((module as any).hot) {
	(module as any).hot.accept();
}
