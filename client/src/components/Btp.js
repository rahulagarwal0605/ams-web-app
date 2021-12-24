import React, { useEffect } from 'react'
import Header from './Header';
import Footer from "./Footer";

function Btp() {


    useEffect(() => {

    })

    return (
        <div>
            <Header />
            <div className="btp">
                <h4 className="heading-evaluation">Update Evaluation Scheme</h4>
                <div className="main">
                    <div className="select">
                        <label htmlFor="session">Session:&nbsp;&nbsp;</label>
                        <select name="session" id="session">

                        </select>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Btp
