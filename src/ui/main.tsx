import { App } from 'modules/App';
import * as React from 'react';
import { render } from 'react-dom';

render(<App />, document.getElementById('root'));

if ((module as any).hot) {
	(module as any).hot.accept();
}
