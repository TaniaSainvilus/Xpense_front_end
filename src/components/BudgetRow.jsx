import React, { Component } from 'react'
import BudgetInput from './BudgetInput'
import TransactionModal from './TransactionModal'


class BudgetRow extends Component {
  state = {
    transactionModalOn: false,
  }
  toggleTransactionModal = () => {
    this.setState({
      transactionModalOn: !this.state.transactionModalOn,
    })
  }
  sumTransactions = (array) => {
    let sum = 0;
    array.map(transaction => sum += Number(transaction.spent));
    return sum;
  }
  render () {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td><BudgetInput budget={this.props.budget}/></td>
        <td onClick={() => this.toggleTransactionModal()}>
          {this.sumTransactions(this.props.transactions)}
          {this.state.transactionModalOn ? (
            <TransactionModal transactions={this.props.transactions}/>
          ) : (
            ""
          )}
        </td>
        <td>{this.props.budget-this.sumTransactions(this.props.transactions)}</td>
      </tr>
    )
  }
}

export default BudgetRow