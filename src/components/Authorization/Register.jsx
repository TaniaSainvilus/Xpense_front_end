
import React, { Component } from 'react'
// import { useHistory } from 'react-router-dom'

export default class Register extends Component {
//  history = () => this.history.push("/register")
    
//     handleOnSubmit = () => {
//         event.preventDefault()
//         const user = {
//             username,
//             email,
//             password,
//         }
//     }
    render() {
        return (
        <div>
            <button id="register" onClick={Register}>Register</button>
        </div>

        // <Modal>
        //     <ModalHeader></ModalHeader>
        //     <ModalBody>
        //         <Form onSubmit={(event) => { this.props.handleSubmit(event) }}>
        //             <label htmlFor="username">Username:
        //             <input
        //                     onChange={(event) => this.props.handleChange(event)}
        //                     type="username"
        //                     id="username"
        //                     name="username"
        //                     value={this.props.username}
        //                 />
        //             </label>

        //             <label htmlFor="email">Email:
        //             <input
        //                     onChange={(event) => this.props.handleChange(event)}
        //                     type="email"
        //                     id="email"
        //                     name="email"
        //                     value={this.props.email}
        //                 />
        //             </label>

        //             <label htmlFor="password">Password:
        //             <input
        //                     onChange={(event) => this.props.handleChange(event)}
        //                     type="password"
        //                     id="password"
        //                     name="password"
        //                     value={this.props.password}
        //                 />
        //             </label>
        //             <input type="submit" value="Register" />
        //             <button onClick={() => this.props.toggleRegistrationForm()}>Register</button>
        //         </Form>
        //     </ModalBody>
        // </Modal>
        )
}
}
