import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import SweetAlert from 'sweetalert2-react';
import Preloader from '../ReuseableCompononts/Preloader';

export default function PasswordChange(props) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        retype_new_password: ''
    });
    const [Successmessage, setSuccessmessage] = useState({
        status: false,
        message: ''
    });
    const [Errormessage, setErrorMessage] = useState();

    const onChangeHandler = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const [newPassword, setNewPassword] = useState();
    const [retypePassword, setRetypePassword] = useState();
    const [passwordcheck, setPasswordcheck] = useState();

    //======USER GLOBAL STATE FROM REDUX
    const userSignin = useSelector(state => state.userSignin);
    const {user} = userSignin;

    const onSubmitHandle = e => {
        e.preventDefault();
        setLoading(true);
        if (formData.new_password === formData.retype_new_password) {
            Axios.post('https://server.wakafoods.com//api/chef/profile/password/update', formData, {
                headers: {
                    Authorization: `Bearer ${user}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    setLoading(false);
                    setSuccessmessage({
                        status: true,
                        message: res.data.message
                    });
                })
                .catch(error => {
                    setLoading(false);

                    setErrorMessage(error.response.data.errors.current_password);
                    setNewPassword(error.response.data.errors.new_password)
                    setRetypePassword(error.response.data.errors.retype_new_password)
                    
                });
        } else {
            setLoading(false);
            setPasswordcheck('The confirm passwords do not match the new password');
        }
    };

    return (
        <div>
            {loading ? <Preloader /> : null}
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
            <div
                className="login container"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '90vh'
                }}>
                <div className="card border-0 shadow " style={{backgroundColor: '#ff7417',}}>
                    <div className="card-body">
                     
                        <from>
                            <div className="from-row">
                                <div className="form-group col-md-12">
                                    <label style={styles.label} for="current_password">
                                        Current Password
                                    </label>
                                    <input
                                        id="current_password"
                                        value={formData.current_password}
                                        name="current_password"
                                        onChange={e => onChangeHandler(e)}
                                        type="password"
                                        className="form-control"
                                    />
                                     <p style={styles.formError}>{Errormessage}</p>
                                </div>
                                <div className="form-group col-md-12">
                                    <label style={styles.label} for="new_password">
                                        New Password
                                    </label>
                                    <input
                                        id="new_password"
                                        value={formData.new_password}
                                        name="new_password"
                                        onChange={e => onChangeHandler(e)}
                                        type="password"
                                        className="form-control"
                                    />
                                     <p style={styles.formError}>{newPassword}</p>
                                    
                                </div>
                                <div className="form-group col-md-12">
                                    <label style={styles.label} for="retype_new_password">
                                        Confirm New Password
                                    </label>
                                    <input
                                        id="retype_new_password"
                                        value={formData.retype_new_password}
                                        name="retype_new_password"
                                        onChange={e => onChangeHandler(e)}
                                        type="password"
                                        className="form-control"
                                    />
                                     <p style={styles.formError}>{retypePassword}</p>
                                     <p style={styles.formError}>{passwordcheck}</p>
                                </div>
                               
                                    <div className="form-group col-md-12">
                                        <button
                                            type="submit"
                                            onClick={onSubmitHandle}
                                            className="btn  btn-block"
                                            style={{color: 'white', backgroundColor: 'black'}}>
                                            CHANGE PASSWORD
                                        </button>
                                    </div>
                            </div>
                        </from>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    label: {
        fontSize: '0.9em',
        fontWeight: 'bold',
        color: 'black'
    },
    formError: {
        fontSize: '0.7em',
        color: 'red',
        marginBottom: '10px',
        fontWeight: 'bold'
    }
};
