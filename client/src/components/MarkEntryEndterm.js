import React from 'react'
import "./css/MarkEntryEndterm.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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
import { Switch } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

function MarkEntryEndterm() {
    const [auto_, setAuto_] = React.useState({});
    const [auto, setAuto] = React.useState([]);
    const [manual_, setManual_] = React.useState({});
    const [manual, setManual] = React.useState([]);
    const [marks, setMarks] = React.useState([]);
    const [components, setComponents] = React.useState([]);
    const [lock, setLock] = React.useState(false);
    const [visual, setVisual] = React.useState(false);

    const search = useLocation().search;
    const course = new URLSearchParams(search).get('course');
    const session = new URLSearchParams(search).get('session');
    const id = new URLSearchParams(search).get("id");

    const { authenticated } = React.useContext(authContext);
    const history = useNavigate();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Grade vs #students',
            },
        },
    };


    const labels = ['A', 'AB', 'B', 'BC', 'C', 'CD', 'D', 'F'];
    const [data1, setData1] = React.useState({ 'A': null, 'AB': null, 'B': null, 'BC': null, 'C': null, 'CD': null, 'D': null, 'F': null });
    const [data2, setData2] = React.useState({ 'A': null, 'AB': null, 'B': null, 'BC': null, 'C': null, 'CD': null, 'D': null, 'F': null });

    const data = {
        labels,
        datasets: [
            {
                label: 'Automatic Grade',
                data: data1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Manual Grade',
                data: data2,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    React.useEffect(() => {
        if (!authenticated) history("/");

        const checkInternalLock = async () => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/getLock?examType=internals`,
                method: 'GET',
                withCredentials: true,
            }
            let m = await axios(options);
            if (m.data.message !== "Internal marks are locked") {
                history(`/InternalNotSet?session=${session}&course=${course}&id=${id}`);
            }

        }

        const getLock = async () => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/getLock?examType=endterm`,
                method: 'GET',
                withCredentials: true,
            }
            let m = await axios(options);
            if (m.data.message === "End-Term marks are locked") {
                setLock(true);
            }

        }

        const getGradeRanges = async (s) => {
            let options = {
                url: `${url}/api/teacher/courses/${id}/GetGradeDetails`,
                method: 'GET',
                withCredentials: true,
            }
            let m = await axios(options);
            m = m.data.data;
            console.log(m);
            setAuto_(m);
            await setManual_(m);
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

        checkInternalLock();
        getLock();
        makeCall();
        getGradeRanges();


    }, [id, authenticated, history, course, session]);



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
        for (const x in temp) {
            let f = document.getElementById(`${x}0`).value;
            let s = document.getElementById(`${x}1`).value;

            if (f) temp[x][0] = parseInt(f);
            if (s) temp[x][1] = parseInt(s);
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

    const changeLock = async () => {
        let options = {
            url: `${url}/api/teacher/courses/${id}/setLock?examType=endterm`,
            method: 'GET',
            withCredentials: true,
        }
        let m = await axios(options);
        if (m.data.status === 'success') {
            message.success("Internal Marks Locked Successfully");
            setLock(true);
        }
    }

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
            url: `${url}/api/teacher/courses/${id}/students/${roll}/setMarks?examType=endterm`,
            method: 'POST',
            withCredentials: true,
            data: {
                "marks": arr
            }
        }
        let resp = await axios(options);
        if (resp.data.status === 'success') message.success("Endterm Mark Successfully Updated");
    }

    const getVisual = async () => {

        let options = {
            url: `${url}/api/teacher/courses/${id}/getTotalStudents`,
            method: 'POST',
            withCredentials: true
        }
        let temp = { 'A': null, 'AB': null, 'B': null, 'BC': null, 'C': null, 'CD': null, 'D': null, 'F': null };

        if (data1.A === null) {
            let m = await axios({ ...options, data: auto_ });
            for (let i = 0; i < labels.length; i++) {
                temp[labels[i]] = m.data.data[i]
            }
            setData1(temp);
            m = await axios({ ...options, data: manual_ });
            for (let i = 0; i < labels.length; i++) {
                temp[labels[i]] = m.data.data[i]
            }
            setData2(temp);
        }
        else {
            let temp_ = { ...manual_ };
            for (const x in temp) {
                let f = document.getElementById(`${x}0`).value;
                let s = document.getElementById(`${x}1`).value;

                if (f) temp_[x][0] = parseInt(f);
                if (s) temp_[x][1] = parseInt(s);
            }

            let m = await axios({ ...options, data: temp_ });
            for (let i = 0; i < labels.length; i++) {
                temp[labels[i]] = m.data.data[i]
            }
            setData2(temp);
        }
    }

    return (
        <div><Header />
            <div className="mark_entry_endterm">
                <h4 className="heading">Mark Entry - Endterm</h4>
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
                        <Switch checked={lock} disabled={lock} checkedChildren="Endterm Marks are Locked" unCheckedChildren="Lock Endterm Marks" onChange={() => changeLock()} />
                    </div>
                    <div style={{ 'display': lock === true ? 'block' : 'none', 'textAlign': 'center', 'marginBottom': '30px' }} >

                        <Button variant="contained" type="primary" onClick={() => { getVisual(); setVisual(true) }}>Visualise Grade Distribution</Button>
                        <IconButton onClick={() => setVisual(false)} disabled={!visual}>
                            <CloseIcon />
                        </IconButton>
                        <div style={{ 'display': visual === true ? 'block' : 'none', width: '650px', marginLeft: '290px' }}><Line options={options} data={data} /></div>

                    </div>
                    <div className="table_area">

                        <div className="table" style={{ 'display': lock === true ? 'block' : 'none' }}>
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

                        <div className="table" style={{ 'display': lock === true ? 'block' : 'none' }}>
                            <h5>Manual grade Range</h5>
                            <TableContainer component={Paper} style={{ 'height': '483px' }} >
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

                            <button className="submit-btn" onClick={() => { sendManual(); getVisual(); }}>Use Manual Grade Range</button>

                        </div>

                    </div>

                    <h4 style={{ 'marginTop': '20px', 'textAlign': 'center' }}>Endterm Marks and Grades</h4>
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
                                        <TableCell style={{ 'fontWeight': 'bold', 'fontFamily': 'Courier New', 'fontSize': '18px' }}>{lock === true ? 'Grade' : 'Action'}</TableCell>

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
                                                        <TableCell><input id={`${s.Roll}${c.ExamName}`} readOnly={lock} style={{ 'width': '40px' }} placeholder={c.MarksObtained}></input></TableCell>
                                                    ))
                                                }
                                                {
                                                    lock === true ? <TableCell><input readOnly="true" style={{ 'width': '40px' }} value={s.grade}></input></TableCell> :
                                                        <TableCell><Button variant="outlined" disabled={lock} onClick={(e) => updateMarks(s.Roll)}>Save</Button></TableCell>
                                                }
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
            </div >
            <Footer />
        </div >
    )
}

export default MarkEntryEndterm
