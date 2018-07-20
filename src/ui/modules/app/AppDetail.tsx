import { Layout } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from 'redux/actions';
import * as sel from 'redux/selectors';

export interface IAppDetailProps {
	app: any;
	profiles: any[];
	loading: boolean;
	onLoad(): void;
}

class AppDetail extends React.PureComponent<IAppDetailProps> {
	public componentDidMount() {
		this.props.onLoad();
	}

	public render() {
		const { app, profiles, loading } = this.props;
		return (
			<Layout.Content style={{ padding: '20px 50px' }}>
				<Link to="/">&lt; Back</Link>
				{!loading && (
					<div
						style={{
							background: 'white',
							padding: 20,
							maxWidth: 1000,
							margin: '0 auto',
						}}
					>
						<h2>{app.name}</h2>

						{profiles.length && <div>{profiles[0].name}</div>}
					</div>
				)}
			</Layout.Content>
		);
	}
}

const mapStates = (state, props) => ({
	app: sel.getApp(state, props.match.params.id),
	profiles: sel.profileList(state),
	loading: sel.appLoading(state) || sel.profileLoading(state),
});

const mapActions = (dispatch, props) => ({
	onLoad() {
		dispatch(actions.apps.fetchStart({ id: props.match.params.id }));
		dispatch(actions.profiles.fetchStart({ appId: props.match.params.id }));
	},
});

export const AppDetailContainer = connect(
	mapStates,
	mapActions,
)(AppDetail);
