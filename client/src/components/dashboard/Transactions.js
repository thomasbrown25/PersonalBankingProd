import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const dummyData = [
    {
        _id: "600497873ab74747a0bea832",
        amount: "$107.20",
        description: "Amazon",
        category: "Shopping",
        date: "03-20-2020"
    }
]

const Transactions = ({ transactions, title }) => {
  transactions = dummyData;

  const transactionTable = transactions.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.amount}</td>
      <td>{exp.description}</td>
      <td>{exp.category}</td>
      <td>
        {exp.date}
        {/* {formatDate(exp.date)} */}
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">{title}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Amount</th>
            <th className="hide-sm">Description</th>
            <th className="hide-sm">Category</th>
            <th className="hide-sm">Date</th>
            <th />
          </tr>
        </thead>
        <tbody>{transactionTable}</tbody>
      </table>
    </Fragment>
  );
};

Transactions.propTypes = {
  //expense: PropTypes.array.isRequired,
};

export default connect(null, { })(Transactions);
