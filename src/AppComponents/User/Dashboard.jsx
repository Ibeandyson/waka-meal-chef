import React from 'react';
import OrderListNav from '../Navigation/OrderListNav';
import DeliveryManListNav from '../Navigation/DeliveryManListNav';
import UserListNav from "../Navigation/UserListNav"
import MealListNav from '../Navigation/MealListNav'
import CategoryNav from "../Navigation/CategoryNav"
import SubCategoryNav from "../Navigation/SubCategoryNav"
import  StateListNav from "../Navigation/StateListNav"
import ChefNav from "../Navigation/ChefNav"
import ReservationNav from "../Navigation/ReservationNav"
import {Link} from "react-router-dom"

export default function Dashboard(props) {
   
    return (
        <div className="user-dashboard mt-5">
            <div className="container">
            <div className="text-center">
               
                <h3 style={{color: 'black', fontWeight: 'bold', marginTop: '15%'}}>Chef</h3>
            </div>
                <div className="row">
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
            {/* ======DELIVERY MAN LIST NAV ======== */}
            < DeliveryManListNav {...props} />
            {/* =====USER LIST NAV ====== */}
            < UserListNav {...props} />
            {/* ========= MEALS NAV ========== */}
            <MealListNav {...props} />
            {/* =======CATEGORY NAV ====== */}
            <CategoryNav {...props}/>
            {/* ====== SUB CATEGORY NAV ===== */}
            <SubCategoryNav {...props}/>
            {/* ====== STATE NAV ===== */}
            <StateListNav {...props}/>
            {/* ===== CHEF NAV ==== */}
            <ChefNav {...props}/>
            {/* ===== RESERVATION NAV ==== */}
            <ReservationNav {...props}/>
        </div>
    );
}
