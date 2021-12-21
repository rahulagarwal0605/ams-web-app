import React from 'react'
import './css/Footer.css'

function Footer() {
    return (
        <div className="footer">
            <footer className="site-footer" style={{ backgroundColor: "black" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>About</h6>
                            <p className="text-justify about-para">
                                This website is used for Marks and grade submission.It is a part of LNMIIT Academic Management System.
                                <br />
                                <br />
                                This website is made under the guidance of Mr.Mukesh Jadon sir.

                            </p>
                        </div>

                        <div className="col-xs-6 col-md-6">
                            <h6>Quick Links</h6>
                            <ul className="footer-links">
                                <li><a href="/">About Us</a></li>
                                <li><a href="/">Contact Us</a></li>
                                <li><a href="/">Contribute</a></li>
                                <li><a href="/">Privacy Policy</a></li>
                                <li><a href="/">Sitemap</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-sm-6 col-xs-12">
                            <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved by
                                <a href="https://www.lnmiit.ac.in/"> LNMIIT</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </footer >
        </div >
    )
}

export default Footer
