import axios from "axios";

class UserService {

    userLogin(emailId, pass) {
        console.log('userlogin service invoked');
        console.log('EmailId received: ', emailId, ' and password: ', pass);
        return axios.get("http://localhost:8080/api/v1/userLogin/", { params: { emailId: emailId, password: pass } })
    }

    payBill(user) {
        return axios.put("http://localhost:8080/api/v1/payBill/", user);
    }

    confirmPayment(id, amount) {
        console.log('payBill service invoked');
        return axios.put("http://localhost:8080/api/v1/payBill/" + id + amount);
    }

    userSignUp(user) {
        console.log('userlogin service invoked');
        console.log('User received: ', user);
        return axios.post("http://localhost:8080/api/v1/registerUser/", user)
    }

    getUsers() {
        return axios.get("http://localhost:8080/api/v1/users");
    }

    createUser(user) {
        console.log('Create user called with user details: ', user);
        return axios.post("http://localhost:8080/api/v1/users", user);
    }

    getUserById(id) {
        return axios.get("http://localhost:8080/api/v1/users/" + id);
    }

    updateUser(id, user) {
        return axios.put("http://localhost:8080/api/v1/users/" + id, user);
    }

    deleteUserById(id) {
        return axios.delete("http://localhost:8080/api/v1/users/" + id);
    }
}

export default new UserService()