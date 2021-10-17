import React, { Component } from 'react'
import UserService from '../Service/UserService'
import ReactToExcel from 'react-html-table-to-excel'

class ListAllUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            const filteredUsers = res.data.filter(x => x.paymentSuccess == null);
            console.log("payment status.data => ", filteredUsers);
            this.setState({ users: res.data });
        });
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }

    deleteUser(id) {
        UserService.deleteUserById(id).then((res) => {
            if (res.status == 200) {
                this.setState({ users: this.state.users.filter(user => user.id !== id) });
            }
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center"> All Users List</h2>
                <br />
                <ReactToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="allUsersData"
                    filename="excelFile"
                    sheet="tablexls"
                    buttonText="Export data to Excel" />
                <div className="row">
                    <table className="table table-striped table-bordered" id="allUsersData">
                        <thead>
                            <tr>
                                <th> Name</th>
                                <th> Email Id</th>
                                <th> Bill amount</th>
                                <th> Total paid</th>
                                <th> Status</th>
                                <th> Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td> {user.firstName} {user.lastName}</td>
                                            <td> {user.emailId}</td>
                                            <td> {user.amount}</td>
                                            <td> {user.paidAmount}</td>
                                            <td> {user.paymentSuccess == 1 ? "Settled" : "Pending"}</td>
                                            <td>
                                                <button onClick={() => this.viewUser(user.id)} className={user.paymentSuccess == 1 ? "btn btn-info" : "btn btn-primary"} style={{ marginLeft: "10px" }}>View</button>
                                                <button onClick={() => this.deleteUser(user.id)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
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
export default ListAllUsers;