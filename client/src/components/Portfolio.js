import React, { Component } from 'react';
import StockList from "../containers/StockList.js";
//import TransactionForm from "../containers/TransactionForm.js";

// // stocklist looks like coming in 
// const  stockList = {
//     "AAPL": 20,
//     "TSLA": 50,
//     "GOOG": 100,
//     "NKE": 440
// }


class Portfolio extends Component {
    componentDidMount() {
        //this.props.fetchTransaction();
        // this.props.fetchWalletBalance();
    }

    componentWillUpdate() {
        // this.props.fetchTransaction();
    }
    onChange = (e) => {

    }
    onSubmit = (e) => {

    }

    render() {
        // let convertToUsdCurrency = new Intl.NumberFormat('en-US', {
        //     style: 'currency',
        //     currency: 'USD',
        //   });
        let stockList = {
            "AAPL": 20,
            "TSLA": 50,
            "GOOG": 100,
            "NKE": 440
        }

        console.log("stockList:", stockList)
        if (stockList === {}) {
            return (
                <p className="empty-message">
                    You haven't bought any stocks! Start investing!
                </p>
            )
        }
        // let portfolioRows = Object.entries(stockList).forEach(([key, value]) => {
        //      return <tr key={`${key} - 1`}><td className="portfolio-table-data symbol">key</td> <td className="portfolio-table-data quantity ">value</td>
        //         <td className="portfolio-table-data price-per-share"> current price</td>
        //         <td className="portfolio-table-data price-delta"> price delta </td>
        //     </tr>
        // })
        // let portfolioRows = function (key) {
        //     console.log(key)
        //     return (( <tr key={`${key[0]} - 1`}> <td className="portfolio-table-data symbol">key[0]</td><td className="portfolio-table-data quantity ">key[1]</td><td className="portfolio-table-data price-per-share"> current price</td><td className="portfolio-table-data price-delta"> price delta </td> </tr>))
        // })


        //console.log(portfolioRows)

        let portfolioBalance = 5000;
        return (
            <div className="portfolio-container">
                <div className="stocklist-outer-container">
                    <h1 className="page-header"> Portfolio - ${portfolioBalance}  </h1>
                    <table className="stocklist-table">
                        {Object.entries(stockList).map(elem => <tr key={elem[0]}> <td>{elem[0]} </td><td> {elem[1]} shares </td> <td> $500.00 </td><td style={{ color: "green" }}> +5.00%</td></tr>)}
                    </table>
                </div>
                <div>
                    <form className="make-purchases-form" onSubmit="">
                        <input
                            type="text"
                            className="make-purchases-form-input"
                            //value={tickerSymbol}
                            //onChange={this.handleChange("tickerSymbol")}
                            placeholder="Ticker"
                        />

                        <input
                            type="number"
                            className="make-purchases-form-input"
                            //value={(qty === -1 || qty === "0") ? "" : qty}
                           // onChange={this.handleChange("qty")}
                            placeholder="Qty"
                        />

                        <button className="">
                           BUY
                        </button>
                    </form>
                </div>
            </div>

        );
    }
}

export default Portfolio;