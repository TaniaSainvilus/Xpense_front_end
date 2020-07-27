import React, { Component } from 'react'

export default class TransactionModal extends Component {
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Payee</th>
                        <th>Spent</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.transactions.map((transaction, index) => { return (
                        <tr key={index}>
                            <td>{transaction.date}</td>
                            <td>{transaction.payee}</td>
                            <td>{transaction.spent}</td>
                            <td onClick={(event) => this.props.deleteTransaction(event, index, this.props.budget.title)}>X</td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        )
    }
}
