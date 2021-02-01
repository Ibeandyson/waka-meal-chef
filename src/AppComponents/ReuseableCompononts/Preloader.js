import React from 'react';
import PreloaderImg from '../../images/preloader1.gif';

export default function Preloader() {
    return (
        <div>
            <div className="overlay">
                <div className="spinner">
                <img style={{width: "50px" , height: "50px"}} src={PreloaderImg} />
                </div>
            </div>
           
        </div>
    );
}
