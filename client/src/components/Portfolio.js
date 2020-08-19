import React, { Component } from 'react';
import StockList from "../containers/StockList.js";
//import TransactionForm from "../containers/TransactionForm.js";

// stocklist looks like coming in 
// stockList = {
//     "AAPL": 20,
//     "TSLA": 50,
//     "GOOG": 100,
//     "NKE": 440
// }


class Portfolio extends Component {
    componentDidMount () {
        this.props.fetchTransaction();
    }

    componentWillUpdate () {
       // this.props.fetchTransaction();
    }
    render() {
        // let convertToUsdCurrency = new Intl.NumberFormat('en-US', {
        //     style: 'currency',
        //     currency: 'USD',
        //   });
        const { stockList } = StockList;
        console.log("stockList:", stockList )
        if (stockList === {}) {
            return (
                <p className="empty-message">
                    You haven't bought any stocks! Start investing!
                </p>
            )
        }
        let portfolioRows = stockList.map((s, key) => (
            <tr key= {key}>
            <td className="portfolio-table-data symbol">s.symbol</td>
            <td className="portfolio-table-data quantity ">s.quantity</td>
            <td className="portfolio-table-data price-per-share"> current price</td>
            <td className="portfolio-table-data price-delta"> price delta </td>
            </tr>
        ));

        let portfolioBalance = 5000;

        return (
            <div className="portfolio-container">
                <div className="stocklist-outer-container">
                    <h1 className="page-header">` Portfolio - $${portfolioBalance} ` </h1>
                    <table className="stocklist-table">
                        {portfolioRows}
                    </table>
                </div>
                <div>transaction form here please! </div>
            </div>

        );
    }
}

export default Portfolio;