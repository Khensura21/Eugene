import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTransactions } from "../store/actions/transactions";
import TransactionItem from "../components/"

class Transactions extends Component {
    componentDidMount(){
        this.props.fetchTransactions();
    }
    render() {
        const { transactions } = this.props;
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
function mapStateToProps(state) {
    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps, {fetchTransactions})(TransactionList)