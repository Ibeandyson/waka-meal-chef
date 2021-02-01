import {useEffect, useState} from 'react';
import {signin} from '../../Redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Preloader from '../ReuseableCompononts/Preloader';
import {Link} from 'react-router-dom';

export default function Login(props) {
    const dispatch = useDispatch();

    const userSignin = useSelector(state => state.userSignin);
    const {loading, user, error} = userSignin;
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const {identifier, password} = formData;
    const onChangeHandler = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmitHandle = e => {
        e.preventDefault();
        dispatch(signin(identifier, password)).then(() => {}).then(() => {
            props.history.push('/dashboard');
            // window.location.reload();
        });
    };

    return (
        <div className="login container">
            {loading ? <Preloader /> : null}
            <div className="card border-0 shadow " style={{backgroundColor: '#ff7417', marginTop: '20%'}}>
                <div className="card-body">
                    <from>
                        <div className="from-row">
                            <div class="form-group col-md-12">
                                <label style={styles.label} for="inputCity">
                                    Email
                                </label>
                                <input
                                    value={identifier}
                                    name="identifier"
                                    onChange={e => onChangeHandler(e)}
                                    type="email"
                                    placeholder="Enter Email"
                                    class="form-control"
                                />
                                {error && <p style={styles.formError}>{error.errors.identifier}</p>}
                                {error && <p style={styles.formError}>{error.errors.email}</p>}
                                {error && <p style={styles.formError}>{error.errors.phone}</p>}
                                {error && <p style={styles.formError}>{error.errors.username}</p>}
                            </div>
                            <div class="form-group col-md-12">
                                <label style={styles.label} for="inputCity">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    name="password"
                                    onChange={e => onChangeHandler(e)}
                                    type="password"
                                    placeholder="Enter Password"
                                    class="form-control"
                                />
                                {error && <p style={styles.formError}>{error.errors.password}</p>}
                            </div>

                            <div class="form-group col-md-12">
                                <button
                                    type="submit"
                                    onClick={onSubmitHandle}
                                    className="btn  btn-block"
                                    style={{color: 'white', backgroundColor: 'black'}}>
                                    SignIn
                                </button>
                            </div>

                            <div class="form-group col-md-12">
                                <Link style={{color: 'inherit', textDecoration: 'inherit'}} to="/forgot-password">
                                    <p className="btn" style={{color: 'black', fontWeight: 'bold', fontSize: '0.7em'}}>
                                        Forget Password
                                    </p>
                                </Link>
                                <p className="text-center" style={{fontSize: '0.7em'}}>
                                    Don't Have an account{' '}
                                    <Link style={{color: 'inherit', textDecoration: 'inherit'}} to="/signup">
                                        <b>Sign up here</b>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </from>
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
        marginTop: '10px',
        fontWeight: 'bold'
    }
};
