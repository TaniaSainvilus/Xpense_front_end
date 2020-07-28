import React, { Component } from 'react'

export default class TransactionForm extends Component {
    render() {
        return (
            <form onSubmit={(event) => {this.props.handleNewTransaction(event)}}>
                <label htmlFor="date">Date: 
                    <input
                        onChange={(event) => this.props.handleChange(event)}
                        type="date"
                        id="date"
                        name="date"
                        value={this.props.date}
                    />
                </label>
                <label htmlFor="payee">Payee: 
                    <input onChange={(event) => this.props.handleChange(event)} type="text" id="payee" name="payee" value={this.props.payee}/>
                </label>
                <label htmlFor="category">Category: 
                    <select onChange={(event) => this.props.handleChange(event)} type="text" id="category" name="category" value={this.props.category}>
                        <option key="0" value="">Select one:</option>
                        {this.props.budget.map((budget, index) => {
                            return <option key={index + 1} value={budget.title}>{budget.title}</option>
                        })}
                    </select>
                </label>
                <label htmlFor="spent">Spent: 
                    <input onChange={(event) => this.props.handleChange(event)} type="number" id="spent" name="spent" value={this.props.spent}/>
                </label>
                <input type="submit" value="Add Transaction"/>
                <button className="form-button" onClick={() => this.props.toggleTransactionForm()}>Cancel</button>
            </form>
        )
    }
}
