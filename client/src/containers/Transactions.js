import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTransactions } from "../store/actions/transactions";
import TransactionItem from "../components/TransactionItem"

class Transactions extends Component {
    componentDidMount() {
        this.props.fetchTransactions();
    }
    render() {
        const { transactions } = this.props;
        if (transactions.length === 0) {
            return (
                <p className="empty-message">
                    You haven't made any transactions! Click Buy Stock to start investing!
                </p>
            )
        } else {
            let transactionList = transactions.map(t => (
                <TransactionItem
                    key={t._id}
                    symbol={t.symbol}
                    quantity={t.quantity}
                    price={t.price}
                />
            ));
            return transactionList;
        }
    }
}
Transactions.defaultProps = {
    transactions: [],
    // fetchTransactions(){ return [] }
}

function mapStateToProps(state) {
    return {
        transactions: state.transactions
    }
}

export default connect(mapStateToProps, { fetchTransactions })(Transactions)