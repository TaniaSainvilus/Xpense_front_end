import React from 'react';
//import {BrowserRouter, Switch, Route} from "react-router-dom"
import BudgetForm from './components/BudgetForm'
import BudgetTable from './components/BudgetTable'
import TransactionForm from './components/TransactionForm';
import Header from "./components/Header"
import { BrowserRouter } from 'react-router-dom';



//TODO setup env file for front end
let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003';
} else {
  baseUrl = 'https://quiet-retreat-43031.herokuapp.com/';
}
console.log('current base URL:', baseUrl);

//note: ran into error, had to hard code seed data- Tania 
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      budget:   [{
        title: "Gas",
        budget: 10,
        spent: 6,
        transactions: [],
    },
    {
        title: "Food",
        budget: 0,
        spent: 0,
        transactions: [],
    },
    {
        title: "Lodging",
        budget: 0,
        spent: 0,
        transactions: [],
    },
    {
        title: "Entertainment",
        budget: 0,
        spent: 0,
        transactions: [],
    },
    {
        title: "Shopping",
        budget: 0,
        spent: 0,
        transactions: [],
    },
    {
        title: "Car rental",
        budget: 0,
        spent: 0,
        transactions: [],
    },
    {
        title: "Misc.",
        budget: 0,
        spent: 0,
        transactions: [],
    }],
      date: "",
      payee: "",
      category: "",
      spent: 0,
      budgetValue: 0,
      budgetFormOn: false,
      transactionFormOn: false,
    }
  }

  getBudget = () => {
    fetch(baseUrl + '/budgets').then(res => {
      // console.log(baseUrl)
      return res.json();
    }).then(data => {
      this.setState({
        budget: data
      });
    });
  }

  addBudget = (newBudget) => {
    const copyBudgets = [...this.state.budget];
    copyBudgets.push(newBudget);
    this.setState({
      budgets: copyBudgets,
    });
    this.getBudget();
  }

  componentDidMount() {
    this.getBudget();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleNewTransaction = (event) => {
    event.preventDefault();
    fetch(baseUrl + "budgets/transaction/" + this.state.category, {
      method: "PUT",
      body: JSON.stringify({
        date: this.state.date,
        payee: this.state.payee,
        category: this.state.category,
        spent: this.state.spent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json(
      )).then(data => {
        const copyBudgets = [...this.state.budget];
        const findIndex = this.state.budget.findIndex(budget => budget._id === data._id);
        copyBudgets[findIndex] = data;
        this.setState({
          budget: copyBudgets,
          date: "",
          payee: "",
          category: "",
          spent: 0,
          transactionFormOn: false,
        });
      }).catch(error => console.error({"Error": error}))
    this.getBudget()
  }

  handleBudgetValueChange = (event, id, value) => {
    event.preventDefault();
    fetch(baseUrl + 'budgets/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        budget: value,
      }),
      headers: {
      'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data)
      let copyBudget = [...this.state.budget];
      let findIndex = this.state.budget.findIndex(budget => budget.id === id);
      copyBudget[findIndex] = data;
      this.setState({budget: copyBudget})
    });
    this.getBudget();
  }

  deleteCategory = (id) => {
    fetch(baseUrl + "budgets/" + id, {
      method: "DELETE",
    }).then(res => {
      const findIndex = this.state.budget.findIndex(budget => budget.id === id);
      const copyBudget = [...this.state.budget];
      copyBudget.splice(findIndex, 1);
      this.setState({budget: copyBudget});
    })
  }

  deleteTransaction = (event, index, category) => {
    event.stopPropagation()
    fetch(baseUrl + "budgets/" + category + "/" + index, {
      method: "PUT",
    }).then(res => res.json(
      )).then(data => {
        const copyBudgets = [...this.state.budget];
        const findIndex = this.state.budget.findIndex(budget => budget._id === data._id);
        console.log(findIndex)
        copyBudgets[findIndex].transactions.splice(index, 1)
        this.setState({
          budget: copyBudgets,
        });
      }).catch(error => console.error({"Error": error}))
    this.getBudget();
  }

  toggleBudgetForm = () => {
    this.setState({
      budgetFormOn: !this.state.budgetFormOn,
    })
  }

  toggleTransactionForm = () => {
    this.setState({
      transactionFormOn: !this.state.transactionFormOn,
      date: "",
      payee: "",
      category: "",
      spent: 0,
    })
  }

  render() {
    return (
      <>
      {/* <BrowserRouter> */}
        <Header />
        {/* <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>  */}
      <div id='container'>
        <h1>Xpense App</h1>
        {this.state.budgetFormOn ? (
          <BudgetForm
            baseUrl={baseUrl}
            addBudget={this.addBudget}
            toggleBudgetForm={this.toggleBudgetForm}
          />
        ) : (
          <button onClick={() => this.toggleBudgetForm()}>Add Budget Category</button>
        )}
        {this.state.transactionFormOn ? (
          <TransactionForm
            baseUrl={baseUrl}
            budget={this.state.budget}
            date={this.state.date}
            payee={this.state.payee}
            category={this.state.category}
            spent={this.state.spent}
            handleChange={this.handleChange}
            handleNewTransaction={this.handleNewTransaction}
            toggleTransactionForm={this.toggleTransactionForm}
          />
          ) : (
            <button onClick={() => this.toggleTransactionForm()}>Add New Transaction</button>
          )}
        <div className="container">
          <div className="panel-body">
            <div className="responsive-table">
            <BudgetTable
              budget={this.state.budget}
              baseUrl={baseUrl}
              handleBudgetValueChange={this.handleBudgetValueChange}
              deleteCategory={this.deleteCategory}
              deleteTransaction={this.deleteTransaction}
            />
            </div>
          </div>
        </div>
      </div>
      {/* </Switch> */}
      {/* <BrowserRouter/> */}
      </>
    )
  }
}

export default App;