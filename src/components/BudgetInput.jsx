import React, { Component } from 'react'

class BudgetInput extends Component {
    render() {
        return (
            <input 
                className="budget-input"
                type="number" 
                value={this.props.budget}
            />
        )
    }
}

export default BudgetInput