import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from "../store/actions/transactions";
//import StockItem from "../components/StockItem"



class StockList extends Component {
    componentDidMount() {
        this.props.fetchStocks();
    }
    render() {
        const { transactions } = this.props;
        if (transactions.length === 0) {
            return (
                <p className="empty-message">
                    You haven't bought any stocks! Start investing!
                </p>
            )
        } else {
            let stockList =
                transactions.map(t => {
                    let stocksAccumalator = {}
                    if (stocksAccumalator.has(t.symbol)) {
                        stocksAccumalator[t.symbol] += t.quantity;
                    } else {
                        stocksAccumalator[t.symbol] = t.quantity;
                    }
                    return stocksAccumalator
                });
            return stockList;
        }
    }
}

StockList.defaultProps = {    
    stockList: {}
}

function mapStateToProps(state) {
    return {
        stockList: state.stockList
    };
}


export default connect(mapStateToProps, { fetchTransactions })(StockList);
