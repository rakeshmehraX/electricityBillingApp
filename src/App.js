import logo from './logo.svg';
import './App.css';
import ListUsers from './Components/ListUsers';
import ListAllUsers from './Components/ListAllUsers';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateUser from './Components/CreateUser';
import ViewUser from './Components/ViewUser';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import UserPage from './Components/UserPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={SignIn}></Route>
            <Route path="/users" component={ListUsers}></Route>
            <Route path="/allUsers" component={ListAllUsers}></Route>
            <Route path="/add-user/:id" component={CreateUser}></Route>
            <Route path="/view-user/:id" component={ViewUser}></Route>
            <Route path="/signIn" component={SignIn}></Route>
            <Route path="/signUp" component={SignUp}></Route>
            <Route path="/me/:id" component={UserPage}></Route>
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
