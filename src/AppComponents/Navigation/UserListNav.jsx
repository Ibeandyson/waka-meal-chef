import React from 'react';

export default function UserListNav(props) {
    return (
        <div>
            <div
                className="modal fade"
                id="userListNavModal"
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
                                onClick={() => props.history.push('/active-user-list')}
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                                Active Users
                            </button>
                            <hr />
                            <button
                                className="btn btn-block"
                                data-dismiss="modal"
                                onClick={() => props.history.push('/blocked-user-list')}
                                style={{backgroundColor: 'black', color: 'white', fontWeight: 'bold'}}>
                                Blocked Users
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
