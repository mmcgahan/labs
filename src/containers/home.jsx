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
 * @module Home
 */
class Home extends React.Component {
	render() {
		const {
			children,
		} = this.props;

		return (
			<div>Home</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

