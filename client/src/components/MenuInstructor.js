import React from 'react'
import Button from "@mui/material/Button";
import "./css/MenuInstructor.css"
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Link } from "react-router-dom";
import userContext from "../context/userContext";

function MenuInstructor() {
    const { teacherId } = React.useContext(userContext);
    React.useEffect(() => {
        console.log(teacherId);
    })
    return (
        <div>
            <Header />
            <div className="menu">
                <Link to="/MenuInstructor/CourseListEvaluationScheme"><Button className="links-btn" variant='contained'>Evaluation Scheme</Button></Link>
                <Link to="/MenuInstructor/CourseListInternal"><Button className="links-btn" variant='contained'>Mark Entry Internal</Button></Link>
                <Link to="/MenuInstructor/CourseListEndterm"><Button className="links-btn" variant='contained'>Mark Entry Endtem</Button></Link>
                <Link to="/MenuInstructor/EvaluationScheme"><Button className="links-btn" variant='contained'>BTP Mark Entry</Button></Link>
                <Link to="/MenuInstructor/EvaluationScheme"><Button className="links-btn" variant='contained'>Extra Curriculum Grade Entry</Button></Link>
                <Link to="/MenuInstructor/EvaluationScheme"><Button className="links-btn" variant='contained'>Zero Credit Project Grade Entry</Button></Link>
            </div>
            <Footer />
        </div>
    )
}

export default MenuInstructor
