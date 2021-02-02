import React from 'react';
import OrderListNav from '../Navigation/OrderListNav';

import {Link} from "react-router-dom"

export default function Dashboard(props) {

    return (
        <div className="user-dashboard mt-5">
            <div className="container text-center">
            <div >
               
                <h3 style={{color: 'black', fontWeight: 'bold', marginTop: '15%'}}>Chef</h3>
            </div>
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-6 col-12 mb-3 ">
                        <div
                            class="card shadow border-0 card-hover "
                            data-toggle="modal"
                            data-target="#orderListNavModal">
                            <div class="card-body text-center">
                                <p class="card-text" style={{fontWeight: 'bold', fontSize: '0.7em'}}>
                                    Order List
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-12 mb-3 ">
                    <Link to="/change-password" style={{color: 'inherit', textDecoration: 'inherit'}}>
                        <div class="card shadow border-0 card-hover" >
                            <div class="card-body text-center">
                                <p class="card-text" style={{fontWeight: 'bold', fontSize: '0.7em'}}>
                                    Change Password
                                </p>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ========ORDER LIST NAV ======= */}
            <OrderListNav {...props} />

        </div>
    );
}
