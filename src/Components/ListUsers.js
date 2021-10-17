import React, { Component } from 'react'
import UserService from '../Service/UserService'

class ListUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            const filteredUsers = res.data.filter(x => x.paymentSuccess != 1 && x.userType !== "Clerk" && x.userType !== "SuperUser");
            console.log("payment status.data => ", filteredUsers);
            this.setState({ users: filteredUsers });
        });
    }

    editUser(id) {
        this.props.history.push(`/add-user/${id}`);
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }

    addUser() {
        this.props.history.push('/add-user/add');
    }

    deleteUser(id) {
        UserService.deleteUserById(id).then((res) => {
            if (res.status == 200) {
                this.setState({ users: this.state.users.filter(user => user.id !== id) });
            }
        });
    }

    confirmPayment(id) {
        UserService.updateUser(id).then((res) => {
            if (res.status == 200) {
                this.setState({ users: this.state.users.filter(user => user.id !== id) });
            }
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> Users List</h2>
                <div className="row">
                    <button style={{ width: 100, marginBottom: "10px" }} className="btn btn-primary" onClick={this.addUser}>Add User</button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th> First Name</th>
                                <th> Last Name</th>
                                <th> Email Id</th>
                                <th> Bill amount</th>
                                <th> Total paid</th>
                                <th> Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td> {user.firstName}</td>
                                            <td> {user.lastName}</td>
                                            <td> {user.emailId}</td>
                                            <td> {user.amount}</td>
                                            <td> {user.paidAmount}</td>
                                            <td>
                                                <button onClick={() => this.editUser(user.id)} className="btn btn-info">Update</button>
                                                <button onClick={() => this.deleteUser(user.id)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                                <button onClick={() => this.viewUser(user.id)} className="btn btn-light" style={{ marginLeft: "10px" }}>View</button>
                                              {/*   <button onClick={() => this.confirmPayment(user.id)} className="btn btn-primary" style={{ marginLeft: "10px" }} >Confirm</button>
                                                <button onClick={() => this.confirm(user.id)} className="btn btn-warning" style={{ marginLeft: "10px" }} >Add Remark</button> */}
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ListUsers;