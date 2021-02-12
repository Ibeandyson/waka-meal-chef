import React, {useState} from 'react';
import Preloader from '../ReuseableCompononts/Preloader';
import axios from 'axios';
import {Link} from "react-router-dom"
import SweetAlert from 'sweetalert2-react';


export default function ForgotPassword() {
    const [data, setData] = useState({
        email: ''
    });

    const [loading, setLoading] = useState();
    const [Successmessage, setSuccessmessage] = useState({
        status: false, 
        message: ""
    });
    const [errorMessage, setErrorMessage] = useState();
    const [ErrorEmail, setErrorEmail] = useState();
    const [show, setShow] = useState(false);

    const {email} = data;
    const onChangeHandler = e => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const onSubmitHandle = e => {
        e.preventDefault();
        const payload = new FormData();
        payload.append('email', data.email);
        setLoading(true);
        axios
            .post('https://server.wakafoods.com/api/chef/auth/password/reset/request', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            .then(res => {
                setSuccessmessage({
                    status: true,
                    message: res.data.message
                });
                setLoading(false);
            })
            .catch(error => {
                setErrorMessage(error.response.data.message);
                setErrorEmail(error.response.data.errors.email);
                setLoading(false);
            });
    };
    return (
        <div className="login container">
             {Successmessage.status ? (
                <SweetAlert
                    show={() => setSuccessmessage({
                        ...Successmessage,
                        status: true,
                    })}
                    title="Success message"
                    text={Successmessage.message}
                    onConfirm={() => setSuccessmessage({
                        ...Successmessage,
                        status: false,
                    })}
                />
            ) : null}
        {loading ? <Preloader /> : null}
        <div className="card border-0 shadow " style={{backgroundColor: '#ff7417', marginTop: '20%'}}>
            <div className="card-body">
                <from onSubmit={onSubmitHandle}>
                    <div className="from-row">
                        <div class="form-group col-md-12">
                            <label style={styles.label} for="inputCity">
                                Email
                            </label>
                            <input
                                value={email}
                                name="email"
                                onChange={e => onChangeHandler(e)}
                                type="email"
                                placeholder="Enter Email"
                                class="form-control"
                            />
                            <p style={styles.formError}>{ErrorEmail}</p>
                            <p style={styles.formError}>{errorMessage}</p>
                        </div>
                      

                        <div class="form-group col-md-12">
                            <button
                                type="submit"
                                onClick={onSubmitHandle}
                                className="btn  btn-block"
                                style={{color: 'white', backgroundColor: 'black'}}>
                                Send
                            </button>
                        </div>
                        <Link style={{color: 'inherit', textDecoration: 'inherit'}} to="/">
                            <p className="text-center" style={{fontSize: '0.9em', fontWeight: "bold"}}>
                              GO BACK
                            </p>
                        </Link>
                    </div>
                </from>
            </div>
        </div>
    </div>

      
    );
}

const styles = {
    iconForm: {
        color: '#ffa500'
    },
    btnRegister: {
        backgroundColor: '#ffa500',
        border: 'none',
        color: 'white'
    },
    formError: {
        fontSize: '0.7em',
        color: 'red',
        marginTop: '10px'
    },
    label: {
        fontSize: '0.9em',
        fontWeight: 'bold',
        color: 'black'
    }
};
