import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return { state };
}

const Error404 = (props) => {
	return (
		<div>
			<h1>Oh nooooo!</h1>
			<p>There is no route defined for {props.location.pathname}</p>
		</div>
	);
};

export default connect(mapStateToProps)(Error404);

