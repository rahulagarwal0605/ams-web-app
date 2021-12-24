import React from 'react'
import Button from "@mui/material/Button";
import "./css/MenuInstructor.css"
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Link, useNavigate } from "react-router-dom";
import authContext from "../context/userContext";

function MenuInstructor() {

    const { authenticated } = React.useContext(authContext);
    const history = useNavigate();

    React.useEffect(() => {
        console.log(authenticated)
        if (!authenticated) history("/");
    }, [authenticated, history])

    return (
        <div>
            <Header />
            <div className="menu">
                <Link to="/MenuInstructor/CourseListEvaluationScheme"><Button className="links-btn" variant='contained'>Evaluation Scheme</Button></Link>
                <Link to="/MenuInstructor/CourseListInternal"><Button className="links-btn" variant='contained'>Mark Entry Internal</Button></Link>
                <Link to="/MenuInstructor/CourseListEndterm"><Button className="links-btn" variant='contained'>Mark Entry Endtem</Button></Link>
                <Link to="/MenuInstructor/Btp"><Button className="links-btn" variant='contained'>BTP Mark Entry</Button></Link>

            </div>
            <Footer />
        </div>
    )
}

export default MenuInstructor
