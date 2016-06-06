import React from 'react';
import Helmet from 'react-helmet';


function getInnerHTML(__html) {
	return {
		__html,
	};
}

/**
 * Module that builds html, head, and body elements
 * And inserts app markup in the body
 *
 * Elements should only be added inside head via Helmet
 * @see {@link https://github.com/nfl/react-helmet}
 *
 * @module DOM
 */
const DOM = (props) => {
	// format browser required runtime values
	const CONFIG_JSON = JSON.stringify(props.CONFIG);
	// format the intialState provided by rendering function
	const INITIAL_STATE_JSON = JSON.stringify(props.initialState);
	// Extract the `<head>` information from any page-specific `<Helmet>` components
	const head = Helmet.rewind();

	return (
		<html>
			<head>
				{head.title.toComponent()}
				{head.meta.toComponent()}
				{head.link.toComponent()}
			</head>
			<body style={{ margin: 0, fontFamily:'sans-serif' }}>
				<div id='outlet' dangerouslySetInnerHTML={getInnerHTML(props.appMarkup)} />
				<script dangerouslySetInnerHTML={getInnerHTML(`window.INITIAL_STATE=${INITIAL_STATE_JSON};`)} />
				<script src='//localhost:1338/client.js' />
			</body>
		</html>
	);
};

DOM.propTypes = {
	initialState: React.PropTypes.object.isRequired
};

export default DOM;

