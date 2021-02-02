import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {signup} from '../../Redux/actions';
import Preloader from '../ReuseableCompononts/Preloader';
import axios from "axios"



function Signup(props) {
    const [formData, setFormData] = useState({
        name: '',
        place: '',
        phone: '',
        email: '',
        password: '',
        dispatcher_code: ''
    });

    const dispatch = useDispatch();
    const userSignup = useSelector(state => state.userSignup);
    const {loading, user, error} = userSignup;
    const [show, setShow] = useState(false);
    const [placeData, setPlaceData] = useState([]);
 
    

    const {name, place, phone, email, password, dispatcher_code} = formData;
    const onChangeHandler= e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onSubmitHandle = e => {
        e.preventDefault();
        dispatch(signup(name, place, phone, email, password, dispatcher_code));
    };

useEffect(() => {
    if (user) {
        props.history.push('/');
    }
}, [user])


const loadplace = () => {
    axios
        .get('https://server.wakameals.validprofits.xyz/api/place/list', {
            headers: {
                Authorization: `Bearer ${user}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then(res => {
            setPlaceData(res.data.places);
        })
        .catch(error => {
            console.log(error);
        });
};

useEffect(() => {
    loadplace();
}, [])

    return (
        <div className="login container">
              {loading ? <Preloader /> : null}
           
              <div className="card border-0 shadow mb-5 " style={{backgroundColor: '#ff7417', marginTop: '20%'}}>
                <div className="card-body">
                    <form onSubmit={onSubmitHandle} className="uk-grid-small" uk-grid>
                        <div class="form-group col-md-12">
                            <label style={styles.label} for="inputCity">
                                Name
                            </label>
                            <input
                                value={name}
                                name="name"
                                onChange={e => onChangeHandler(e)}
                                type="text"
                                placeholder="Enter Name"
                                class="form-control"
                            />
                            {error && <p style={styles.formError}>{error.errors.name}</p>}
                        </div>
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
                            {error && <p style={styles.formError}>{error.errors.email}</p>}
                        </div>
                        <div class="form-group col-md-12">
                            <label style={styles.label} for="inputCity">
                                Phone
                            </label>
                            <input
                                value={phone}
                                name="phone"
                                onChange={e => onChangeHandler(e)}
                                type="text"
                                placeholder="Enter Phone"
                                class="form-control"
                            />
                            {error && <p style={styles.formError}>{error.errors.phone}</p>}
                        </div>
                        <div class="form-group col-md-12">
                            <label style={styles.label} for="inputCity">
                                Place
                            </label>
                            <select
                            name="place"
                            onChange={e => onChangeHandler(e)}
                            id="inputState"
                            class="form-control"
                            style={{fontSize: '0.7em'}}>
                            <option hidden>
                                {'>>>>'} Choose Place {'<<<<'}
                            </option>
                            {placeData.map(data => (
                                <option
                                    className="cursor"
                                    key={data.slug}
                                    value={data.id}
                                    selected={place === data.id ? true : false}>
                                    {data.name}
                                </option>
                            ))}
                        </select>
                           
                            {error && <p style={styles.formError}>{error.errors.place}</p>}
                        </div>
                        <div class="form-group col-md-12">
                            <label style={styles.label} for="inputCity">
                                Dispatcher Code
                            </label>
                            <input
                                value={dispatcher_code}
                                name="dispatcher_code"
                                onChange={e => onChangeHandler(e)}
                                type="text"
                                placeholder="Enter Dispatcher Code"
                                class="form-control"
                            />
                            {error && <p style={styles.formError}>{error.errors.dispatcher_code}</p>}
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
                                placeholder="Enter Passsword"
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
                        <Link style={{color: 'inherit', textDecoration: 'inherit'}} to="/">
                                <p className="text-center" style={{fontSize: '0.7em'}}>
                                    Already Have an account <b>Sign in here</b>
                                </p>
                            </Link>
                    </form>
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

export default withRouter(Signup);
