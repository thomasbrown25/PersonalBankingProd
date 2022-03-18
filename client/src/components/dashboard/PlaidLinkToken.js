import React from "react";
import { connect } from "react-redux";
import { PlaidLink } from "react-plaid-link";
import PropTypes from "prop-types";
import { publicTokenExchange } from "../../actions/plaid";

const PlaidLinkToken = ({  auth: { user }, linkToken, publicTokenExchange }) => {
	const onExit = (error, metadata) => console.log("onExit", error, metadata);

	const onEvent = (eventName, metadata) =>
		console.log("onEvent", eventName, metadata);

	const onSuccess = (publicToken, metadata) => {
		console.log("onSuccess", publicToken, metadata);
		publicTokenExchange(publicToken);
	};

	return (
		<>
			<PlaidLink
				className="btn black f-red center-btn btn-large waves-effect waves-light hoverable accent-3 main-btn"
				style={{ marginTop: "200px", padding: "0px", fontSize: "16px", cursor: "pointer" }}
				token={linkToken}
				onExit={onExit}
				onSuccess={onSuccess}
				onEvent={onEvent}>
				Link Account
			</PlaidLink>
		</>
	);
};

PlaidLinkToken.propTypes = {
	auth: PropTypes.object.isRequired,
	publicTokenExchange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
  });

export default connect(mapStateToProps, {
	publicTokenExchange,
})(PlaidLinkToken);
