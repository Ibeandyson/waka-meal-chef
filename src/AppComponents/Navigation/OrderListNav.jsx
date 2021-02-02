import React from 'react';
import {Link} from 'react-router-dom';

export default function OrderListNav(props) {
    return (
        <div>
            <div
                className="modal fade"
                id="orderListNavModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="orderListNav"
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
                                type="button"
                                className="btn btn-block"
                                onClick={() => props.history.push('/open-order-list')}
                                data-dismiss="modal"
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                                Open Orders
                            </button>

                            <hr />

                            <button
                                className="btn btn-block"
                                onClick={() => props.history.push('/inkitchen-order-list')}
                                data-dismiss="modal"
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                                In Kitchen Orders
                            </button>

                            <hr />

                            <button
                                className="btn btn-block"
                                onClick={() => props.history.push('/almostready-order-list')}
                                data-dismiss="modal"
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                                Almost Ready Orders
                            </button>
                            <hr />

                            <button
                                className="btn btn-block"
                                onClick={() => props.history.push('/compeleted-order-list')}
                                data-dismiss="modal"
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                                Compeleted Orders
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
