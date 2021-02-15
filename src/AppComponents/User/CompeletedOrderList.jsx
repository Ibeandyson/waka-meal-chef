import {useEffect, useState} from 'react';
import axios from "axios"
import {useSelector} from 'react-redux';
import Preloader from '../ReuseableCompononts/Preloader';
import InfiniteScroll from 'react-infinite-scroll-component';
import CompeletedOrderView from "../ReuseableCompononts/CompeletedOrderView"

export default function CompeletedOrderList(props) {
    const [oderData, setOderData] = useState([]);
    const [oders, setOders] = useState([]);
    const [loading, setLoading] = useState();
    const [nextPageUrl, setNextPageUrl] = useState('');

    //======USER GLOBAL STATE FROM REDUX
    const userSignin = useSelector(state => state.userSignin);
    const {user} = userSignin;

    const nextData = () => {
        setLoading(false);
        axios
            .get(nextPageUrl, {
                headers: {
                    Authorization: `Bearer ${user}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            .then(res => {
                setOders(res.data);
                setNextPageUrl(res.data.orders.next_page_url);
                console.log('called next page: ', nextPageUrl);
                setOderData(oderData.concat(...res.data.orders.data));
            });
    };

    const loadUOrderData = () => {
        setLoading(true);
        axios
            .get('https://server.wakafoods.com/api/chef/order/list/prepared', {
                headers: {
                    Authorization: `Bearer ${user}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            .then(res => {
                setOders(res.data.orders.data);
                console.log(res.data.orders.data);
                setOderData(res.data.orders.data);
                setNextPageUrl(res.data.orders.next_page_url);
                setLoading(false);
                // if(res.data.products.data.length < 1){
                // 	setStatus('No Ad')
                // }
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        setInterval(() => {
            loadUOrderData();
        }, 180000);
        loadUOrderData();
    }, []);

    return (
        <div>
             {loading && (
                <div style={{height: '100vh', width: '100%'}}>
                    <Preloader />
               <div className="mt-5 text-center">
                   <h5><b>checking for new oders</b></h5>
               </div>
                </div>
            )}
            {oderData.length < 1 ? (
                <div style={{marginTop: '10%'}}>
                    <p className="text-center">
                        <b>No New Order Found</b>
                    </p>
                </div>
            ) : (
            <div class="table-responsive" >
                <table class="table">
                    <thead class="thead-light"  style={{fontSize: '0.7em', width: '50px'}}>
                        <tr>
                            <th>Order Code</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody  style={{fontSize: '0.7em', width: '50px'}}>
                    {oderData.map(data =>  <CompeletedOrderView data={data}  loadUOrderData={loadUOrderData} {...props}/> )}
                    </tbody>
                    <InfiniteScroll
                            dataLength={oderData.length}
                            next={nextData}
                            hasMore={oders.current_page !== oders.last_page ? true : false}
                            loader={<h4 style={{textAlign: 'center', color: 'gray'}}>Loading...</h4>}
                            endMessage={<p style={{textAlign: 'center'}} />}
                        />
                </table>
            </div>
            )}

           
        </div>
    );
}
