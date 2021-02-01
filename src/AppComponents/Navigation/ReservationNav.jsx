import React from 'react';

export default function ReservationNav(props) {
    return (
        <div>
            <div
                className="modal fade"
                id="reservationNavModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="deliveryManListNav"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <button
                                className="btn btn-block"
                                data-dismiss="modal"
                                onClick={() => props.history.push('/pending-reservation')}
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                               Pending Reservation
                            </button>
                            <hr />
                            <button
                                className="btn btn-block"
                                data-dismiss="modal"
                                onClick={() => props.history.push('/approved-reservation')}
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                               Approved Reservation
                            </button>
                            <hr />
                            <button
                                className="btn btn-block"
                                data-dismiss="modal"
                                onClick={() => props.history.push('/cancelled-reservation')}
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                               Cancelled Reservation
                            </button>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
