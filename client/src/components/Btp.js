import React, { useEffect } from 'react'
import "./css/MarkEntryInternal.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from "./Header.js";
import Footer from "./Footer.js";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Button from '@mui/material/Button';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import authContext from "../context/userContext";
import { message } from 'antd';
import 'antd/dist/antd.css';
import url from './constants.js';

function Btp() {

    const search = useLocation().search;
    const course = new URLSearchParams(search).get('course');
    const session = new URLSearchParams(search).get('session');
    const id = new URLSearchParams(search).get('id');

    const [marks, setMarks] = React.useState([]);
    const { authenticated } = React.useContext(authContext);
    const history = useNavigate();

    useEffect(() => {
        if (!authenticated) history("/");

        const getGrades = async (s) => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/students/${s.RollNo}/getGrades`,
                method: 'GET',
                withCredentials: true,
            }
            let m = await axios(options);
            m = m.data.data;
            return m;
        }

        const makeCall = async () => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/students`,
                method: 'GET',
                withCredentials: true,
            }
            let resp = await axios(options);
            resp = resp.data.data;

            let students = [];
            for (let i = 0; i < resp.length; i++) {
                let temp = await getGrades(resp[i]);
                students.push({ roll: resp[i].RollNo, name: resp[i].Name, grade: temp });
            }
            setMarks(students);
        }
        makeCall();
    }, [authenticated, history, id])

    const updateGrades = async (roll) => {
        let options = {
            url: `${url}/api/teacher/courses/${id}/students/${roll}/setGrade`,
            method: 'GET',
            withCredentials: true,
            body: {
                'grade': document.getElementById(`${roll}`).value,
            }
        }
        let m = await axios(options);
        if (m.data.status === 'success')
            message.success("Grade Successfuly Updated!")
    }

    return (
        <div>
            <Header />
            <div className="btp">
                <h4 className="heading-evaluation">BTP Grades</h4>
                <div className="main">
                    <div className="select">
                        <h5>Session:&nbsp; </h5>
                        <h6 className="fixed">{session}</h6>
                    </div>
                    <div className="select">
                        <h5>Project: &nbsp;</h5>
                        <h6 className="fixed">{course}</h6>
                    </div>

                    <div className="table_area">
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Roll Number&nbsp;</TableCell>
                                        <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Student Name&nbsp;</TableCell>
                                        <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Project Grade</TableCell>
                                        <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        marks.map((s) => (
                                            <TableRow
                                                key={s}
                                            >
                                                <TableCell>{s.roll}</TableCell>
                                                <TableCell>{s.name}</TableCell>
                                                <TableCell><input style={{ 'width': '40px' }} id={`${s.roll}`} placeholder={s.grade}></input></TableCell>
                                                <TableCell><Button variant="outlined" onClick={(e) => updateGrades(s.roll)}>Save</Button></TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer component={Paper} style={{ display: 'none' }} >
                            <table sx={{ minWidth: 650 }} aria-label="simple table" id="emp">
                                <thead>
                                    <tr>
                                        <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Roll Number&nbsp;</th>
                                        <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Student Name&nbsp;</th>
                                        <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Project Grade</th>
                                        <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        marks.map((s) => (
                                            <tr
                                                key={s}
                                            >
                                                <td>{s.roll}</td>
                                                <td>{s.name}</td>
                                                <td>{s.grade}</td>
                                                <td><Button variant="outlined" onClick={(e) => updateGrades(s.roll)}>Save</Button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </TableContainer>
                    </div>
                    <div className="select">
                        <h5>Export Student List:&nbsp;&nbsp;&nbsp;</h5>
                        <button onClick={() => {
                            message.info("Downloading...", 0.6);
                            setTimeout(() => message.success("File Downloaded!", 1), 1000)
                        }} style={{ 'border': 'none' }}>
                            <ReactHTMLTableToExcel
                                className="btn btn-info"
                                table="emp"
                                filename={`Marks_${id}`}
                                sheet="Sheet"
                                buttonText="Export excel" />
                        </button>
                    </div>
                    <Link to='/MenuInstructor/CourseListBtp'><KeyboardBackspaceIcon />  Go back to Course Selection</Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Btp
