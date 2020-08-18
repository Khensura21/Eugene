import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from "react"


class TransactionItem extends Component {
   constructor(props){
       super(props);
   }
    render() {
        const { symbol, quantity, key, price} = this.props
        let sharesText = quantity > 1 ? "shares" : "share";
        let transactionPrice = (quantity * price) / 10000;
        let convertToUsdCurrency = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          });
        return (
            <tr key= {key}>
            <td className="transactions-table-data type">BUY</td>
            <td className="transactions-table-data ticker-symbol">({symbol})</td>
            <td className="transactions-table-data num-shares">{quantity} {sharesText} @</td>
            <td className="transactions-table-data price">{convertToUsdCurrency.format(transactionPrice)} </td>
            </tr>
        );
    }
}


export default TransactionItem;
  
