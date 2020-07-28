import React, { Component } from 'react'
import BudgetRow from './BudgetRow'

class BudgetTable extends Component {
  render () {
    return (
      <table className="table table table-sm">
        <thead>
          <tr>
            <th >Category</th>
            <th className="text-right">Budget</th>
            <th className="text-right">Spent</th>
            <th className="text-right">Remaining</th>
            <th className="text-right">Delete</th>
          </tr>
        </thead>
        <tbody>
        {  this.props.budget.map((budget, index)=> {
            return (
              <BudgetRow
                key={index}
                index={index}
                title={budget.title}
                budget={budget}
                spent={budget.spent}
                transactions={budget.transactions}
                baseUrl={this.props.baseUrl}
                handleChange={this.props.handleChange}
                handleBudgetValueChange={this.props.handleBudgetValueChange}
                deleteCategory={this.props.deleteCategory}
                deleteTransaction={this.props.deleteTransaction}
              />
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default BudgetTable
