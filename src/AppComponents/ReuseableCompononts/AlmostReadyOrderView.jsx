import React from 'react';
import {GiCancel} from 'react-icons/gi';
import {IoMdCheckmarkCircle} from 'react-icons/io';
import {MdShoppingCart} from 'react-icons/md';
import {FaRegUserCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Naira from 'react-naira';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Moment from "react-moment";

export default function AlmostReasyOrderView(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [openUser, setOpenUser] = React.useState(false);

    const handleClickOpenUser = () => {
        setOpenUser(true);
    };

    const handleCloseUser = () => {
        setOpenUser(false);
    };
    //======USER GLOBAL STATE FROM REDUX
    const userSignin = useSelector(state => state.userSignin);
    const {user} = userSignin;

    const order = () => {
        // setLoading(true);
        axios
            .post(`https://server.wakafoods.com/api/chef/order/set_status/prepare_completed`,{
                order_code: props.data.code
            } ,{
                headers: {
                    Authorization: `Bearer ${user}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            .then(res => {
                props.loadUOrderData();
            })
            .catch(error => {
                console.log(error);
                // setLoading(false);
            });
    };

    

    return (
        <tr key={props.data.id}>
            <td>{props.data.code}</td>
            <td><Moment format="D MMM YYYY" withTitle>{props.data.created_at}</Moment></td>
            <td>
                <span class="badge badge-success">{props.data.status}</span>
            </td>
            <td>{props.data.delivery_type}</td>
            <td>
                <div class="btn-group btn-group-sm" role="group" aria-label="...">
                    <button
                        type="button"
                        className="btn btn-success"
                        data-toggle="tooltip"
                        data-placement="top"
                        onClick={() =>  order()}>
                        <IoMdCheckmarkCircle />
                    </button>
                    
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-toggle="modal"
                        data-tooltip="tooltip"
                        onClick={() =>  handleClickOpen()}
                        data-target="#viewOrderModal"
                        data-placement="top"
                       
                        title="View Order">
                        <MdShoppingCart style={{color: 'white'}} />
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-tooltip="tooltip"
                        data-target="#userProfileModal"
                        data-placement="top"
                        onClick={() =>  handleClickOpenUser()}
                        title="View User">
                        <FaRegUserCircle />
                    </button>
                </div>
            </td>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{props.data.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="container-lg ">
                            {props.data.ordered_meals.map(data => (
                                <div key={data.id}>
                                     <h5 className="mt-3 mb-3" style={{fontWeight: "bolder",  color: "#ff7417"}}><u>Person: {data.name}</u></h5>
                                    <h6 className="mt-3 mb-3" style={{fontWeight: "bolder",  color: "#ff7417"}}> Meal</h6>
                                    <div className="block mb-3">
                                        <img src={data.meal.image} style={{height: '100%', width: '100%'}} />
                                    </div>
                                    <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                        <b>Meal Name</b>:<span className="ml-2">{data.meal.name}</span>
                                    </p>
                                    <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                        <b>Measurement Quantity</b>:<span className="ml-2">{data.meal.measurement_quantity}</span>
                                    </p>
                                    <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                        <b>Measurement Type</b>:<span className="ml-2">{data.meal.measurement_type}</span>
                                    </p>
                                    <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                        <b>Price</b>:<span className="ml-2">
                                            <Naira>{data.meal.price}</Naira>
                                        </span>
                                    </p>
                                   
                                    <h6 className="mt-3 mb-3"   className="mt-3 mb-3" style={{fontWeight: "bolder",  color: "#ff7417"}}>Ordered Meals Extras</h6>
                                    {data.ordered_meal_extra_items.map(data => (
                                        <div key={data.id}>
                                            <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                                <b>Price</b>:<span className="ml-2">{data.cost}</span>
                                            </p>
                                            <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                                <b>Quantity</b>:<span className="ml-2">{data.quantity}</span>
                                            </p>
                                            <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                                <b>Meal Name</b>:<span className="ml-2">{data.meal_extra_item.name}</span>
                                            </p>
                                            <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                                <b>Measurement Quantity</b>:<span className="ml-2">{data.meal_extra_item.measurement_quantity}</span>
                                            </p>
                                            <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                                <b>Measurement Type</b>:<span className="ml-2">{data.meal_extra_item.measurement_type}</span>
                                            </p>
                                            <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                                <b>Price</b>:<span className="ml-2">
                                                    <Naira>{data.meal_extra_item.price}</Naira>
                                                </span>
                                            </p>
                                            <hr/>
                                        </div>
                                    ))}
                                   
                                </div>
                            ))}
                            <h6 className="mt-3 mb-3"  className="mt-3 mb-3" style={{fontWeight: "bolder",  color: "#ff7417"}}>Ordered Summery</h6>
                            <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                <b>Delivery Type</b>
                                <span className="ml-2">{props.data.delivery_type}</span>
                            </p>
                            <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                <b>Order Type</b>
                                <span className="ml-2">{props.data.type}</span>
                            </p>
                            <p  style={{fontSize: "0.7em" ,color: "black"}}>
                                <b>Address</b>
                                <span className="ml-2">{props.data.address}</span>
                            </p>
                            <p  style={{fontWeight: "bolder",  color: "black"}}>
                                <b>Total Price</b> =
                                <span className="ml-2">
                                    <Naira>{props.data.total}</Naira>
                                </span>
                            </p>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{color: 'white', backgroundColor: '#ff7417'}}
                        onClick={handleClose}
                        color="primary"
                        autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>





            <Dialog
                open={openUser}
                onClose={handleCloseUser}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className="container-lg ">
                            <div className="block text-center mb-5">
                            <p className="mt-3" style={{color: 'black', fontSize: "0.9" }}><span>{props.data.user.last_name}</span><span className="m-2">{props.data.user.first_name}</span></p>
                            <p style={{color: 'black', fontSize: "0.7em" }}>{props.data.user.email}</p>
                            <p style={{color: 'black', fontSize: "0.7em" }}>{props.data.user.phone}</p>
                            </div>
                        
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{color: 'white', backgroundColor: '#ff7417'}}
                        onClick={handleCloseUser}
                        color="primary"
                        autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </tr>
    );
}
