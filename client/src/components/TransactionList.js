import React, { Component } from 'react';
import Transactions from "../containers/Transactions.js";

const TransactionList = ({ props }) => {
    return (
        <div className="transaction-outer-container">
            <h1 className="page-header"> Transactions</h1>
            <table className="transaction-table">
                <Transactions />
            </table>
        </div>
    )
};


export default TransactionList;