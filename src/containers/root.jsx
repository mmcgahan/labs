import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

/**
 * @module Root
 */
class Root extends React.Component {
	render() {
		const {
			children,
		} = this.props;

		return (
			<div>
				Wrap it up
				{children}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

