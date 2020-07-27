import React, { Component } from 'react'
// const axios = require('axios');

export default class NewForm extends Component {
    state = {
        title: '',
        budget: 0,
        spent: 0,
        transactions: []
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch(this.props.baseUrl + "budgets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            this.props.addBudget(data);
            this.setState({
                title: '',
            });
        });
    }

    render() {
        return (
            <form onSubmit={ (evt) => this.handleSubmit(evt) }>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title"
                    onChange={ (evt) => this.handleChange(evt) }
                    value={ this.state.title }/>
                <input type="submit" value="Add Budget Category"/>
                <button onClick={() => this.props.toggleBudgetForm()}>Cancel</button>
            </form>
        )
    }
}