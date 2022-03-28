import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenses } from '../../actions/profile';
import formatDate from '../../utils/formatDate';
import currency from '../../utils/currency';

// Table import
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

  let transactionTable;

  if (transactions) 
   transactionTable = transactions.map((tran) => (
    <TableRow
      key={tran._id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {tran.date}
      </TableCell>
      <TableCell align="right">{tran.name}</TableCell>
      <TableCell align="right">{tran.category}</TableCell>
      <TableCell align="right">{tran.amount}</TableCell>
    </TableRow>
  ));

  return (
    <Fragment>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionTable}
        </TableBody>
      </Table>
    </TableContainer>
    </Fragment>
  );
};

Transactions.propTypes = {
  //expense: PropTypes.array.isRequired,
};

export default connect(null, { })(Transactions);


  /* 
  
  
    let transactionTable;

  if (transactions) 
   transactionTable = transactions.map((tran) => (
    <tr key={tran._id}>
      <td>
        {formatDate(tran.date)}
      </td>
      <td>{tran.name}</td>
      <td>{tran.category}</td>
      <td>{currency.format(tran.amount)}</td>
    </tr>
  ));
  
  
  
  
  
  
  
  
  <h2 className="my-2">{title}</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">Date</th>
            <th className="hide-sm">Name</th>
            <th className="hide-sm">Category</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>{transactionTable}</tbody>
      </table> */