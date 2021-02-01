import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import HeaderNav from "./AppComponents/Navigation/HeaderNav"
import Dashboard from "./AppComponents/User/Dashboard"
import  OpenedOrderList from "./AppComponents/User/OpenedOrderList"
import  ProcessingOrderList from "./AppComponents/User/ProcessingOrderList"
import  CompeletedOrderList from "./AppComponents/User/CompeletedOrderList"
import Login from "./AppComponents/Auth/Login"
import Signup from "./AppComponents/Auth/Signup"
import PasswordChange from "./AppComponents/User/PasswordChange"


import PrivateRoute from "./PrivateRoute"
import {
	BrowserRouter as Router,
	Route,
	Switch,

} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store"




function App(props) {
  return (
    <div className="App">
         <Provider store={store}>
    

     <Router>
     <HeaderNav/>
	<Switch>
    <Route exact path="/" component={Login}/>
    <Route exact path="/signup" component={Signup}/>
    <PrivateRoute {...props} exact path="/dashboard" component={Dashboard}/>
    <PrivateRoute {...props} exact path="/open-order-list" component={OpenedOrderList}/>
    <PrivateRoute {...props} exact path="/processing-order-list" component={ProcessingOrderList }/>
    <PrivateRoute {...props} exact path="/change-password" component={PasswordChange}/>
    <PrivateRoute {...props} exact path="/compeleted-order-list" component={CompeletedOrderList}/>
   
  </Switch>
  </Router>
  </Provider>
    </div>
  );
}

export default App;
