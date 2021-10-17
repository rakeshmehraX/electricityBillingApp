import React, { Component } from 'react';
import UserService from '../Service/UserService';

class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            userDetails: {}
        }
    }

    componentDidMount() {
        UserService.getUserById(this.state.id).then((res) => {
            this.setState({ userDetails: res.data });
        });

    }

    render() {
        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center"> User Details </h3>
                    <div className="card-body">
                        <div className="row">
                            <label>User Name: </label>
                            <div>{this.state.userDetails.firstName + " " + this.state.userDetails.lastName}</div>
                        </div>
                        <br />
                        <div className="row">
                            <label>Email ID: </label>
                            <div>{this.state.userDetails.emailId}</div>
                        </div>
                        <br />
                        <div className="row">
                            <label>Phone Number: </label>
                            <div>{this.state.userDetails.phoneNo}</div>
                        </div>
                        <br />
                        <div className="row">
                            <label>Bill Amount: </label>
                            <div>{this.state.userDetails.amount}</div>
                        </div>
                        <br />
                        <div className="row">
                            <label>Paid Amount: </label>
                            <div>{this.state.userDetails.paidAmount}</div>
                        </div>
                        <br />
                        <div className="row">
                            <label>Payment Status: </label>
                            <div>{this.state.userDetails.paymentSuccess == true ? "Settled" : "Pending"}</div>
                        </div>
                        <br />
                        <div className="row">
                            <label>Remarks: </label>
                            <div>{this.state.userDetails.remarks}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewUser;