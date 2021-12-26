import React from 'react'
import "./css/MarkEntryEndterm.css";
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
import authContext from "../context/userContext";
import { message } from 'antd';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Divider from '@mui/material/Divider';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import url from './constants.js';

function MarkEntryEndterm() {
    const [auto_, setAuto_] = React.useState({});
    const [auto, setAuto] = React.useState([]);
    const [manual_, setManual_] = React.useState({});
    const [manual, setManual] = React.useState([]);
    const [marks, setMarks] = React.useState([]);
    const [components, setComponents] = React.useState([]);

    const search = useLocation().search;
    const course = new URLSearchParams(search).get('course');
    const session = new URLSearchParams(search).get('session');
    const id = new URLSearchParams(search).get("id");

    const { authenticated } = React.useContext(authContext);
    const history = useNavigate();

    React.useEffect(() => {
        if (!authenticated) history("/");

        const getGrades = async (s) => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/GetGradeDetails`,
                method: 'GET',
                withCredentials: true,
            }
            let m = await axios(options);
            m = m.data.data;
            setAuto_(m);
            setManual_(m);
            let gradePoints = 10;
            let temp = [];
            for (const x in m) {
                temp.push(<TableRow>
                    <TableCell>{x}&nbsp;</TableCell>
                    <TableCell>{m[x][0]}&nbsp;</TableCell>
                    <TableCell>{m[x][1]}&nbsp;</TableCell>
                    <TableCell>{x === 'F' ? 0 : gradePoints--}</TableCell>
                </TableRow>)
            }
            setAuto(temp);

            temp = [];
            gradePoints = 10;
            for (const x in m) {
                temp.push(<TableRow className="tableRow">
                    <TableCell>{x}&nbsp;</TableCell>
                    <TableCell><input style={{ 'width': '60px' }} id={`${x}0`} placeholder={m[x][0]}></input>&nbsp;</TableCell>
                    <TableCell><input style={{ 'width': '60px' }} id={`${x}1`} placeholder={m[x][1]}></input>&nbsp;</TableCell>
                    <TableCell>{x === 'F' ? 0 : gradePoints--}</TableCell>
                </TableRow>)
            }
            setManual(temp);
        }

        const getMarksandGrades = async (s) => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/students/${s.RollNo}/getMarks?examType=endterm`,
                method: 'GET',
                withCredentials: true,
            }
            let m = await axios(options);
            m = m.data.data;

            options = {
                url: `${url}/api/teacher/courses/${id}/students/${s.RollNo}/getGrades`,
                method: 'GET',
                withCredentials: true,
            }
            let g = await axios(options);
            g = g.data.data;
            return { Roll: s.RollNo, Name: s.Name, comp: m, grade: g };
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
                let temp = await getMarksandGrades(resp[i]);
                students.push(temp);
            }

            if (students.length) {
                let compo = [];
                students[0].comp.forEach((c) => compo.push(c));
                setComponents(compo);
            }
            setMarks(students);
        }

        getGrades();
        makeCall();
    }, [id, authenticated, history]);



    const sendAuto = async () => {
        console.log(auto_);
        let options = {
            url: `${url}/api/teacher/courses/${id}/SetGrades`,
            method: 'POST',
            withCredentials: true,
            data: auto_
        }
        let m = await axios(options);
        if (m.data.status === 'success') message.success("Automatic Grade Range will be used!")
    }

    const sendManual = async () => {
        let temp = manual_;
        console.log(temp);
        for (const x in temp) {
            let f = document.getElementById(`${x}0`).value;
            let s = document.getElementById(`${x}1`).value;

            if (f) temp[x][0] = f;
            if (s) temp[x][1] = s;
        }
        let options = {
            url: `${url}/api/teacher/courses/${id}/SetGrades`,
            method: 'POST',
            withCredentials: true,
            data: temp
        }
        let m = await axios(options);
        if (m.data.status === 'success') message.success("Manual Grade Range will be used!")
        setManual_(temp);
    }

    return (
        <div><Header />
            <div className="mark_entry_endterm">
                <h4 className="heading">Mark Entry - Endterm</h4>
                <div className="main">
                    <div className="select">
                        <h5>Session:&nbsp; </h5>
                        <h6 className="fixed">{session}</h6>
                    </div>
                    <div className="select">
                        <h5>Course: &nbsp;</h5>
                        <h6 className="fixed">{course}</h6>
                    </div>

                    <div className="table_area">
                        <div className="table">
                            <h5>Automated grade Range</h5>
                            <TableContainer component={Paper} style={{ 'height': '483px' }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Grade&nbsp;</TableCell>
                                            <TableCell>Min&nbsp;</TableCell>
                                            <TableCell>Max&nbsp;</TableCell>
                                            <TableCell>Points</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            auto
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <button className="submit-btn" onClick={() => sendAuto()}>Use Automated Grade Range</button>
                        </div>
                        <div className="table">
                            <h5>Manual grade Range</h5>
                            <TableContainer component={Paper} style={{ 'height': '483px' }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Grade&nbsp;</TableCell>
                                            <TableCell>Min&nbsp;</TableCell>
                                            <TableCell>Max&nbsp;</TableCell>
                                            <TableCell>Points</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            manual
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <button className="submit-btn" onClick={() => sendManual()}>Use Manual Grade Range</button>

                        </div>

                    </div>

                    <h4 style={{ 'marginTop': '20px', 'textAlign': 'center' }}>Locked Marks and Grades</h4>
                    <Divider variant="fullWidth" />
                    <div className="table">
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Roll&nbsp;</TableCell>
                                        <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Name&nbsp;</TableCell>

                                        {
                                            components.map((i) => (
                                                <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>{i.ExamName}&nbsp;</TableCell>
                                            ))
                                        }

                                        {/* <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Action</TableCell> */}
                                        <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Grade</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        marks.map((s) => (
                                            <TableRow
                                                key={s}
                                            >
                                                <TableCell>{s.Roll}</TableCell>
                                                <TableCell>{s.Name}</TableCell>
                                                {
                                                    s.comp.map((c) => (
                                                        <TableCell><input readOnly style={{ 'width': '40px' }} value={c.MarksObtained}></input></TableCell>
                                                    ))
                                                }
                                                {/* <TableCell><Button variant="outlined" onClick={(e) => updateMarks(s.Roll)}>Save</Button></TableCell> */}
                                                <TableCell><input readOnly style={{ 'width': '40px' }} value={s.grade}></input></TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TableContainer component={Paper} style={{ 'display': 'none' }} >
                            <table sx={{ minWidth: 650 }} aria-label="simple table" id="emp">
                                <thead>
                                    <tr>
                                        <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Roll&nbsp;</th>
                                        <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Name&nbsp;</th>

                                        {
                                            components.map((i) => (
                                                <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>{i.ExamName}&nbsp;</th>
                                            ))
                                        }

                                        {/* <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Action</th> */}
                                        <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Grade</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        marks.map((s) => (
                                            <tr
                                                key={s}
                                            >
                                                <td>{s.Roll}</td>
                                                <td>{s.Name}</td>
                                                {
                                                    s.comp.map((c) => (
                                                        <td><input readOnly style={{ 'width': '40px' }} value={c.MarksObtained}></input></td>
                                                    ))
                                                }
                                                {/* <td><Button variant="outlined" onClick={(e) => updateMarks(s.Roll)}>Save</Button></td> */}
                                                <td><input readOnly style={{ 'width': '40px' }} value={s.grade}></input></td>
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
                                filename={`Grades_${id}`}
                                sheet="Sheet"
                                buttonText="Export to excel" />
                        </button>
                    </div>
                    <Link to='/MenuInstructor/CourseListEndterm'><KeyboardBackspaceIcon />  Go back to Course Selection</Link>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default MarkEntryEndterm
