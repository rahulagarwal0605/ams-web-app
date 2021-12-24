import React, { useState, useEffect } from 'react'
import './css/CourseList.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import authContext from "../context/userContext";
import { Alert } from 'antd';

function CourseList({ list, page }) {

    const [courses, setCourses] = useState([]);
    const [data, setData] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [session, setSession] = useState();

    const { authenticated } = React.useContext(authContext);
    const history = useNavigate();

    //make a api call and get course list of loggedin teacher
    useEffect(() => {

        if (!authenticated) history("/");
        window.scrollTo(0, 0)
        const makeCall = async () => {
            const options = {
                url: 'http://localhost:3000/api/teacher/courses?courseType=NC',
                method: 'GET',
                withCredentials: true,
            }
            const resp = await axios(options);
            let unique_s = [];
            setData(resp.data.data);
            resp.data.data.forEach((obj) => {
                if (!unique_s.includes(obj.Session)) unique_s.push(obj.Session);
            });
            setSessions(unique_s);
            console.log(resp.data);
        }
        makeCall();
    }, [authenticated, history]);

    const findCourses = (e) => {
        setSession(e);
        let courses_ = [];
        data.forEach((d) => {
            if (d.Session === e) {
                courses_.push(d);
            }
        })
        setCourses(courses_);
    }

    return (
        <div>
            <Header />
            <div className="courseList">
                <Alert message="Upon selecting a Session, the Course List of the selected session will appear. " type="info" showIcon />
                <h4 className="heading">{list === "EvaluationScheme" ? "Set" : "Mark Entry - "} {list}</h4>
                <div className="main">
                    <div className="select">
                        <label htmlFor="session">Session:&nbsp;&nbsp;</label>
                        <select name="session" id="session" onChange={(e) => findCourses(e.target.value)}>
                            {sessions.map((s) => (
                                <option value={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="table">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Course ID&nbsp;</TableCell>
                                        <TableCell>Course Name&nbsp;</TableCell>
                                        <TableCell>&nbsp;&nbsp;&nbsp;Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        courses.map((c) => (
                                            <TableRow
                                                key={c}
                                            >
                                                <TableCell>{c.CourseId}&nbsp;</TableCell>
                                                <TableCell>{c.CourseName}</TableCell>
                                                <TableCell><Button variant='contained'><Link style={{ textDecoration: "none ", color: "white" }} to={`/MenuInstructor/CourseList${list}/${page}?session=${session}&course=${c.CourseName}&id=${c.CourseId}`}>Select</Link></Button></TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default CourseList
