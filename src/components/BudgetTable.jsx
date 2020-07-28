import React, { Component } from 'react'
import BudgetRow from './BudgetRow'

class BudgetTable extends Component {
  render () {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Budget</th>
            <th>Spent</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
        {  this.props.budget.map((budget, index)=> {
            return (
                <BudgetRow key={index} title={budget.title} budget={budget.budget} spent={budget.spent} transactions={budget.transactions}/>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default BudgetTable
