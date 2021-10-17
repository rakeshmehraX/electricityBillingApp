import React, { Component } from 'react';
import UserService from '../Service/UserService';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            emailId: "",
            paymentStatus: "",
            remarks: ""
        }
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleEmailId = this.handleEmailId.bind(this);
        this.handlePaymentStatus = this.handlePaymentStatus.bind(this);
        this.handleRemarks = this.handleRemarks.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id === 'add') {
            return;
        } else {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data;
                console.log('User received: ', user);
                this.setState({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailId: user.emailId,
                    paymentStatus: user.paymentSuccess == true ? "completed" : "pending",
                    remarks: user.remarks
                }, () => {console.log("User state callback: ", this.state.user)});
            })
        }
    }

    handleFirstName(event) {
        this.setState({ firstName: event.target.value });
    }

    handleLastName(event) {
        this.setState({ lastName: event.target.value });
    }

    handleEmailId(event) {
        this.setState({ emailId: event.target.value });
    }

    handlePaymentStatus(event) {
        this.setState({ paymentStatus: event.target.value });
    }

    handleRemarks(event) {
        this.setState({ remarks: event.target.value });
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, paymentSuccess: this.state.paymentStatus == "completed" ? 1 : 0, remarks: this.state.remarks };
        if (this.state.id === 'add') {
            UserService.createUser(user).then((res) => {
                this.props.history.push('/users');
            })
        } else {
            let user = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId, paymentSuccess: this.state.paymentStatus == "completed" ? 1 : 0, remarks: this.state.remarks };
            UserService.updateUser(this.state.id, user).then((res) => {
                this.props.history.push('/users');
            })
        }
    }

    cancel() {
        this.props.history.push('/users');
    }

    render() {
        const values = ['hi', '3'];
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">{this.state.id === 'add' ? "Add User" : "Update User"}</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> First Name: </label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                        value={this.state.firstName} onChange={this.handleFirstName} />
                                </div>
                                <div className="form-group">
                                    <label> Last Name: </label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                        value={this.state.lastName} onChange={this.handleLastName} />
                                </div>
                                <div className="form-group">
                                    <label> Email ID: </label>
                                    <input placeholder="Email Address" name="emailId" className="form-control"
                                        value={this.state.emailId} onChange={this.handleEmailId} />
                                </div>
                                <div className="form-group">
                                    <label> Payment Status: </label>
                                    <select className="form-control" value={this.state.paymentStatus}
                                        onChange={this.handlePaymentStatus}>
                                        <option value="pending">Pending</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label> Remarks: </label>
                                    <input placeholder="Remarks" name="remarks" className="form-control"
                                        value={this.state.remarks} onChange={this.handleRemarks} />
                                </div>
                                <button className="btn btn-success" style={{ marginTop: "10px" }} onClick={this.saveUser}>Save</button>
                                <button className="btn btn-danger" style={{ marginTop: "10px", marginLeft: "10px" }} onClick={this.cancel}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default CreateUser;