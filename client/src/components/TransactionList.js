import React, { Component } from 'react';
import Transactions from "../containers/Transactions.js";

const TransactionList = props => (
    <table className="transaction-table">
        <Transactions />
    </table>
);
    

export default TransactionList;