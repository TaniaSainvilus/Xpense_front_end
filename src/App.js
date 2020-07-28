import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Axios from "axios";
import Header from "./components/Header";
import Home from './components/pages/Home';
import Login from './components/Authorization/Login';
import Register from './components/Authorization/Register';
import UserContext from './context/UserContext';




const baseUrl = 'http://localhost:3003';

//TODO setup env file for front end
// let baseUrl;
// if (process.env.NODE_ENV === 'development') {
//   baseUrl = 'http://localhost:3000';
// } else {
//   baseUrl = 'https://peaceful-stream-27012.herokuapp.com';
// }
console.log('current base URL:', baseUrl);
//???? All of this portion was written in hooks but the rest in not formatted this way...not sure how to integrate this UserContext to our App.js...???? Explanation of the function is https://youtu.be/sWfD20ortB4?t=1398

// Part 5 of MERN stack video...10:33
export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:3003/user/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:3003/user/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

//ran into error, had to hard code seed data 
// class App extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       budget: [{
//         title: "Gas",
//         budget: 10,
//         spent: 6,
//         transactions: [],
//       },
//       {
//         title: "Food",
//         budget: 0,
//         spent: 0,
//         transactions: [],
//       },
//       {
//         title: "Lodging",
//         budget: 0,
//         spent: 0,
//         transactions: [],
//       },
//       {
//         title: "Entertainment",
//         budget: 0,
//         spent: 0,
//         transactions: [],
//       },
//       {
//         title: "Shopping",
//         budget: 0,
//         spent: 0,
//         transactions: [],
//       },
//       {
//         title: "Car rental",
//         budget: 0,
//         spent: 0,
//         transactions: [],
//       },
//       {
//         title: "Misc.",
//         budget: 0,
//         spent: 0,
//         transactions: [],
//       }],
//       date: "",
//       payee: "",
//       category: "",
//       spent: 0,
//       transactionFormOn: false,
//     }
//   }

//   getBudget = () => {
//     fetch(baseUrl + '/').then(res => {
//       // console.log(baseUrl)
//       return res.json();
//     }).then(data => {
//       this.setState({
//         budget: data
//       });
//     });
//   }

//   addBudget = (newBudget) => {
//     const copyBudgets = [...this.state.budget];
//     copyBudgets.push(newBudget);
//     this.setState({
//       budgets: copyBudgets,
//     });
//   }

//   componentDidMount() {
//     this.getBudget();
//   }

//   handleChange = (event) => {
//     this.setState({
//       [event.target.id]: event.target.value
//     })
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();
//     fetch(baseUrl + "/budgets/" + this.state.category, {
//       method: "PUT",
//       body: JSON.stringify({
//         date: this.state.date,
//         payee: this.state.payee,
//         category: this.state.category,
//         spent: this.state.spent,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then(res => res.json(
//       )).then(data => {
//         const copyBudgets = [...this.state.budget];
//         const findIndex = this.state.budget.findIndex(budget => budget._id === data._id);
//         copyBudgets[findIndex] = data;
//         this.setState({
//           budget: copyBudgets,
//           date: "",
//           payee: "",
//           category: "",
//           spent: 0,
//           transactionFormOn: false,
//         });
//       }).catch(error => console.error({"Error": error}))
//     this.getBudget()
//   }

//   toggleTransactionForm = () => {
//     this.setState({
//       transactionFormOn: !this.state.transactionFormOn,
//       date: "",
//       payee: "",
//       category: "",
//       spent: 0,
//     })
//   }

    return (
      <>
      <BrowserRouter> 
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/> 
          </Switch>
          </UserContext.Provider>
          </BrowserRouter>
          
      {/* <div id='container'>
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
        <div className="container">
        <h1>Xpense App</h1>
        {this.state.transactionFormOn ? (
          <TransactionForm
          baseUrl={baseUrl}
          budget={this.state.budget}
          date={this.state.date}
          payee={this.state.payee}
          category={this.state.category}
          spent={this.state.spent}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
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
</div> */}
      
</>       
    )
}
