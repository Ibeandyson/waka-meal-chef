import React from 'react'

export default function DeliveryManListNav(props) {
    return (
        <div>
            <div
                className="modal fade"
                id="deliveryManListNavModal"
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
                            <button className="btn btn-block"  data-dismiss="modal"
                                onClick={() => props.history.push('/active-delivery-man-list')} style={{backgroundColor: "black",color: "white", fontWeight: 'bold'}}>Active Delivery Men</button>
                          <hr/>
                          <button className="btn btn-block"  data-dismiss="modal"
                                onClick={() => props.history.push('/blocked-delivery-man-list')} style={{backgroundColor: "black",color: "white", fontWeight: 'bold'}}>Blocked Delivery Men</button>
                          <hr/>
                          <button className="btn btn-block"  data-dismiss="modal"
                                onClick={() => props.history.push('/pending-delivery-man-list')} style={{backgroundColor: "black",color: "white", fontWeight: 'bold'}}>Pending Delivery Men</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
