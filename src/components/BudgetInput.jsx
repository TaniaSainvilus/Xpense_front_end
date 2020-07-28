import React, { Component } from 'react'

class BudgetInput extends Component {
    state = {
        budget: this.props.budget.budget,
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    render() {
        return (
            <input 
                className="budget-input form-control input-sm text-right"
                type="number" id="budget" 
                min="0"
                value={this.state.budget}
                onChange={(evt) => this.handleChange(evt)}
                onBlur={(evt) => this.props.handleBudgetValueChange(evt, this.props.budget._id, this.state.budget)}
            />
        )
    }
}

export default BudgetInput