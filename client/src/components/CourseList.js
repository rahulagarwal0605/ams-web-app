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
import { Link } from "react-router-dom";

function CourseList({ list, page }) {

    const [course, setCourse] = useState([]);

    //make a api call and get course list of loggedin teacher
    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         const response = await fetch(
        //             ""
        //         );
        //         const json = await response.json();
        //         setCourse(json.data.children.map(it => it.data));
        //     } catch (e) {
        //         console.error(e);
        //     }
        // };
        // fetchData();
    }, []);

    return (
        <div>
            <Header />
            <div className="courseList">
                <h4 className="heading">{list === "EvaluationScheme" ? "Set" : "Mark Entry - "} {list}</h4>
                <div className="main">
                    <div className="select">
                        <label htmlFor="session">Session:&nbsp;&nbsp;</label>
                        <select name="session" id="session">
                            <option value="Odd Sem 2020-2021 I">Odd Sem 2020-2021 I</option>
                            <option value="Even Sem 2020-2021 II">Even Sem 2020-2021 II</option>
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
                                        course.map((c) => (
                                            <TableRow
                                                key={c}
                                            >
                                                <TableCell>{c.CID}&nbsp;</TableCell>
                                                <TableCell>{c.Name}</TableCell>
                                                <TableCell><Button variant='contained'><Link style={{ textDecoration: "none ", color: "white" }} to={`/MenuInstructor/CourseList${list}/${page}`}>Select</Link></Button></TableCell>
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
