import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import HeaderNav from "./AppComponents/Navigation/HeaderNav"
import Dashboard from "./AppComponents/User/Dashboard"
import  OpenedOrderList from "./AppComponents/User/OpenedOrderList"
import  CompeletedOrderList from "./AppComponents/User/CompeletedOrderList"
import Login from "./AppComponents/Auth/Login"
import ForgotPassword from "./AppComponents/Auth/ForgotPassword"
import SetNewPassword from "./AppComponents/Auth/SetNewPassword"
import Signup from "./AppComponents/Auth/Signup"
import PasswordChange from "./AppComponents/User/PasswordChange"
import  InKitchenOrderList from "./AppComponents/User/InKitchenOrderList"
import AlmostReadyOrderList from "./AppComponents/User/AlmostReadyOrderList"


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
    <Route  {...props}  exact path="/" component={Login}/>
    <Route exact path="/signup" component={Signup}/>
    <Route {...props} exact path="/forgot-password" component={ForgotPassword}/>
    <Route {...props} exact path="/set-password" component={SetNewPassword}/>
    <PrivateRoute {...props} exact path="/dashboard" component={Dashboard}/>
    <PrivateRoute {...props} exact path="/open-order-list" component={OpenedOrderList}/>
    <PrivateRoute {...props} exact path="/change-password" component={PasswordChange}/>
    <PrivateRoute {...props} exact path="/compeleted-order-list" component={CompeletedOrderList}/>
    <PrivateRoute {...props} exact path="/inkitchen-order-list" component={InKitchenOrderList}/>
    <PrivateRoute {...props} exact path="/almostready-order-list" component={AlmostReadyOrderList}/>
   
   
  </Switch>
  </Router>
  </Provider>
    </div>
  );
}

export default App;
