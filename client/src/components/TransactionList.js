import React, { Component } from 'react';
import Transactions from "../containers/Transactions.js";

const TransactionList = (props) => {
    return (
        <div className="row">
            <Transactions />
        </div>
    );
};

export default Transactions;