import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Transactions from './Transactions';
import PlaidLinkToken from './PlaidLinkToken';
import ErrorBoundary from '../../utils/ErrorBoundary'

//Actions
import { createLinkToken  } from "../../actions/plaid";
import { getCurrentProfile, getTransactions } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  getTransactions,
  auth: { user },
  profile: { profile },
  plaid: { linkToken },
  createLinkToken
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, getCurrentProfile);
  useEffect(() => {
		createLinkToken();
	}, createLinkToken);
  useEffect(() => {
    getTransactions();
  }, getTransactions)

  return (
    <section className="container">
      {/* <PlaidLinkToken linkToken={linkToken} /> */}
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
        <ErrorBoundary>
          <Transactions title={'Recent Transactions'} transactions={profile.transactions} />
          </ErrorBoundary>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  plaid: PropTypes.object.isRequired,
  createLinkToken: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  plaid: state.plaid
});

export default connect(mapStateToProps, { getCurrentProfile, getTransactions, createLinkToken })(
  Dashboard
);
