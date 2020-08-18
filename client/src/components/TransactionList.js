import React, { Component } from 'react';
import Transactions from "../containers/Transactions.js";

const TransactionList = (props) => {
    let isEmpty = this.props.fetchTransaction().length < 1
    if (isEmpty) {
        return(
            <p className="empty-message">
              You haven't made any transactions! Click Buy Stock to start investing!
            </p>
        )
    } else {
        return (
            <table className="transaction-table">
                <Transactions />
            </table>
        );
    }
};

export default TransactionList;