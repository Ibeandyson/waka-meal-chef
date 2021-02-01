import React, {useEffect, useState} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Preloader from '../ReuseableCompononts/Preloader';
import {Link} from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';

export default function SetNewPassword(props) {
    const [isValid, setIsValid] = useState(false);
    const [loading, setloading] = useState(true);
    const [show, setShow] = useState(true);
    const [errorMessage, setErrorMessage] = useState();
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [resetSuccess, setResetSuccess] = useState({
        status: false,
        message: ''
    });
    const [resetError, setResetError] = useState();
    const [data, setData] = useState({
        new_password: '',
        re_password: ''
    });

    useEffect(() => {
        setloading(true);
        let params = queryString.parse(props.location.search);
        let id = params.id;
        let token = params.token;
        axios
            .post('https://server.wakameals.validprofits.xyz/api/chef/auth/password/reset/validate_token', {id, token})
            .then(res => {
                console.log(res);
                setIsValid(true);
                setloading(false);
                setCode(res.data.code);
                setEmail(res.data.email);
            })
            .catch(e => {
                console.log(e);
                setErrorMessage(e.response.data.message);

                setloading(false);
            });
    }, []);

    const { re_password, new_password} = data;
    const onChangeHandler = e => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const onSubmitHandle = e => {
        e.preventDefault();
        const payload = new FormData();
        payload.append('new_password', data.new_password);
        payload.append('re_password', data.re_password);
        payload.append('code', code);
        payload.append('email', email);
        setloading(true);
        axios
            .post('https://server.wakameals.validprofits.xyz/api/chef/auth/password/reset/new_password', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            .then(res => {
                setResetSuccess({
                    status: true,
                    message: res.data.message
                });
                setloading(false);
                setTimeout(() => {
                    props.history.push('/');
                }, 2500);
            })
            .catch(error => {
                setResetError(error.response.data.errors);
                setloading(false);
            });
    };

    return (
        <div className="login container">
            {resetSuccess.status ? (
                <SweetAlert
                    show={() =>
                        setResetSuccess({
                            ...resetSuccess,
                            status: true
                        })}
                    title="Success message"
                    text={resetSuccess.message}
                    onConfirm={() =>
                        setResetSuccess({
                            ...resetSuccess,
                            status: false
                        })}
                />
            ) : null}
            {loading ? (
                // preloader
                <div style={{height: '100vh', width: '100%'}}>
                    <Preloader />
                </div>
            ) : !loading && !isValid ? (
                // expired
                <div style={{marginTop: '30%'}}>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <p>{errorMessage}</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <Link to="/forgot-password" style={{color: 'black'}}>
                        <button
                            type="submit"
                            className="btn  btn-block"
                            style={{
                                color: 'white',
                                backgroundColor: 'black',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.7em'
                            }}>
                            click here to go back and Request for a token
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="card border-0 shadow " style={{backgroundColor: '#ff7417', marginTop: '20%'}}>
                    <div className="card-body">
                        <from onSubmit={onSubmitHandle}>
                            <div className="from-row">
                                <div class="form-group col-md-12">
                                    <label style={styles.label} for="inputCity">
                                      New Password
                                    </label>
                                    <input
                                        value={new_password}
                                        name="new_password"
                                        onChange={e => onChangeHandler(e)}
                                        type="password"
                                        placeholder="Enter  New Password"
                                        class="form-control"
                                    />
                                    <p style={styles.formError}>{resetError && resetError.password}</p>
                                </div>
                                <div class="form-group col-md-12">
                                    <label style={styles.label} for="inputCity">
                                    Confirm New Password
                                    </label>
                                    <input
                                        value={re_password}
                                        name="re_password"
                                        onChange={e => onChangeHandler(e)}
                                        type="password"
                                        placeholder="Enter  Confirm New Password"
                                        class="form-control"
                                    />
                                    <p style={styles.formError}>{resetError && resetError.c_password}</p>
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
                                    <p className="text-center" style={{fontSize: '0.9em', fontWeight: 'bold'}}>
                                        GO BACK
                                    </p>
                                </Link>
                            </div>
                        </from>
                    </div>
                </div>
            )}
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
