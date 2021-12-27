import React from 'react'
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
import { Switch } from 'antd';

function MarkEntryInternal() {

    const search = useLocation().search;
    const course = new URLSearchParams(search).get('course');
    const session = new URLSearchParams(search).get('session');
    const id = new URLSearchParams(search).get('id');


    const [marks, setMarks] = React.useState([]);
    const [components, setComponents] = React.useState([]);
    const [lock, setLock] = React.useState(false);

    const { authenticated } = React.useContext(authContext);
    const history = useNavigate();

    React.useEffect(() => {

        if (!authenticated) history("/");

        const getMarks = async (s) => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/students/${s.RollNo}/getMarks?examType=internals`,
                method: 'GET',
                withCredentials: true,
            }
            let m = await axios(options);
            m = m.data.data;

            return { Roll: s.RollNo, Name: s.Name, comp: m };
        }

        const getLock = async () => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/getLock?examType=internals`,
                method: 'GET',
                withCredentials: true,
            }
            let m = await axios(options);
            if (m.data.message === "Internal marks are locked") {
                setLock(true);
            }

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
                let temp = await getMarks(resp[i]);
                students.push(temp);
            }

            if (students.length) {
                let compo = [];
                students[0].comp.forEach((c) => compo.push(c));
                setComponents(compo);
            }
            setMarks(students);
            getLock();
        }

        makeCall();

    }, [id, authenticated, history]);

    const updateMarks = async (roll) => {
        const arr = [];
        for (let i = 0; i < components.length; i++) {
            let val = document.getElementById(`${roll}${components[i].ExamName}`).value;
            arr.push(val);
        }
        let i = 0;
        for (i = 0; i < marks.length; i++) {
            if (marks[i].Roll === roll) {
                break;
            }
        }

        for (let j = 0; j < marks[i].comp.length; j++) {
            if (!arr[j]) {
                arr[j] = marks[i].comp[j].MarksObtained;
            }
        }

        const options = {
            url: `${url}/api/teacher/courses/${id}/students/${roll}/setMarks?examType=internals`,
            method: 'POST',
            withCredentials: true,
            data: {
                "marks": arr
            }
        }
        let resp = await axios(options);
        if (resp.data.status === 'success') message.success("Mark Successfully Updated");
    }

    const changeLock = async () => {
        let options = {
            url: `${url}/api/teacher/courses/${id}/setLock?examType=internals`,
            method: 'GET',
            withCredentials: true,
        }
        let m = await axios(options);
        if (m.data.status === 'success') {
            message.success("Internal Marks Locked Successfully");
            setLock(true);
        }
    }

    return (
        <div>
            <Header />
            <div class="marks_internal">
                <h4 className="heading">Mark Entry - Internal</h4>
                <div className="main">
                    <div className="d-flex align-items-around justify-content-between">
                        <div>
                            <div className="select">
                                <h5>Session:&nbsp; </h5>
                                <h6 className="fixed">{session}</h6>
                            </div>
                            <div className="select">
                                <h5>Course: &nbsp;</h5>
                                <h6 className="fixed">{course}</h6>
                            </div>
                        </div>
                        <Switch checked={lock} disabled={lock} checkedChildren="Internals are Locked" unCheckedChildren="Lock Internals" onChange={() => changeLock()} />
                    </div>

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

                                        <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Action</TableCell>

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
                                                        <TableCell><input id={`${s.Roll}${c.ExamName}`} style={{ 'width': '40px' }} placeholder={c.MarksObtained} readOnly={lock}></input></TableCell>
                                                    ))
                                                }
                                                <TableCell><Button variant="outlined" disabled={lock} onClick={(e) => updateMarks(s.Roll)}>Save</Button></TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TableContainer component={Paper} style={{ display: 'none' }}>
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

                                        <th style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>Action</th>

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
                                                        <td>{c.MarksObtained}</td>
                                                    ))
                                                }
                                                <td><Button variant="outlined" onClick={(e) => updateMarks(s.Roll)}>Save</Button></td>
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
                    <Link to='/MenuInstructor/CourseListInternal'><KeyboardBackspaceIcon />  Go back to Course Selection</Link>



                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MarkEntryInternal
