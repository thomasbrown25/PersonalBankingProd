import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Transactions from './Transactions';
import Education from './Education';
import PlaidLinkToken from './PlaidLinkToken';

//Actions
import { createLinkToken } from "../../actions/plaid";
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
  plaid: { linkToken, publicToken },
  createLinkToken
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  useEffect(() => {
		createLinkToken();
	}, [createLinkToken]);

  return (
    <section className="container">
      <PlaidLinkToken linkToken={linkToken} />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Transactions title={'Recent Transactions'} transactions={profile.transactions} />
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
  deleteAccount: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, createLinkToken })(
  Dashboard
);
