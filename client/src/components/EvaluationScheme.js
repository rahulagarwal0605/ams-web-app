import React, { useState } from 'react'
import "./css/EvaluationScheme.css";
import Button from "@mui/material/Button"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Header from "./Header.js";
import Footer from "./Footer.js";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import authContext from "../context/userContext";
import { message, Popconfirm } from 'antd';
import 'antd/dist/antd.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import url from './constants.js';

function EvaluationScheme() {
    const [rows, setRows] = useState(0);

    const addRow = () => {
        if (rows === 0)
            setRows(rows + 1);
    }


    const deleteRow = () => {
        rows === 1 ? setRows(rows - 1) : setRows(rows);
    }

    const search = useLocation().search;
    const course = new URLSearchParams(search).get('course');
    const session = new URLSearchParams(search).get('session');
    const id = new URLSearchParams(search).get('id');

    const { authenticated } = React.useContext(authContext);
    const history = useNavigate();

    const [evalu, setEvalu] = React.useState([]);

    const makeCallAgain = async () => {
        const options = {
            url: `${url}/api/teacher/courses/${id}/EvalutaionScheme`,
            method: 'GET',
            withCredentials: true
        }
        let resp = await axios(options);
        resp = resp.data.data;
        setEvalu([]);
        setEvalu(resp);
    }

    React.useEffect(() => {

        if (!authenticated) history("/");

        const makeCall = async () => {

            const options = {
                url: `${url}/api/teacher/courses/${id}/EvalutaionScheme`,
                method: 'GET',
                withCredentials: true
            }
            let resp = await axios(options);
            console.log(resp.data.data);
            resp = resp.data.data;
            setEvalu(resp);
        }
        makeCall();
    }, [id, authenticated, history])

    const updateScheme = async (Examid) => {
        let prev = {};
        for (let i = 0; i < evalu.length; i++) {
            if (evalu[i].ExamId === Examid) {
                prev = evalu[i];
                break;
            }
        }

        let name_ = document.getElementById(`${Examid}EN`).value;
        let TM_ = document.getElementById(`${Examid}TM`).value;
        let W_ = document.getElementById(`${Examid}W`).value
        if (!name_) {
            name_ = prev.ExamName;
        }
        if (!TM_) TM_ = prev.TotalMarks;
        if (!W_) W_ = prev.Weightage;

        const options = {
            url: `${url}/api/teacher/courses/${id}/EvalutaionScheme`,
            method: 'PUT',
            withCredentials: true,
            data: {
                "ExamName": name_,
                "MaximumMarks": TM_,
                "Weightage": W_,
                "ExamID": Examid
            }
        }
        let resp = await axios(options);
        if (resp.data.status === 'success') message.success("Component Updated!");
        makeCallAgain();
    }

    const AddScheme = async (Examid) => {
        let name_ = document.getElementById(`${Examid}EN`).value;
        let TM_ = document.getElementById(`${Examid}TM`).value;
        let W_ = document.getElementById(`${Examid}W`).value
        const options = {
            url: `${url}/api/teacher/courses/${id}/EvalutaionScheme`,
            method: 'POST',
            withCredentials: true,
            data: {
                "ExamName": name_,
                "MaximumMarks": TM_,
                "Weightage": W_,
            }
        }
        let resp = await axios(options);
        if (resp.data.status === 'success') message.success("New Component Added");
        deleteRow();
        makeCallAgain();
    }

    const deleteScheme = async (Examid) => {
        const options = {
            url: `${url}/api/teacher/courses/${id}/EvalutaionScheme`,
            method: 'Delete',
            withCredentials: true,
            data: {
                "ExamId": Examid
            }
        }
        let resp = await axios(options);
        if (resp.data.status === 'success') message.success("Component Deleted Successfully!");
        makeCallAgain();
    }

    return (
        <div>
            <Header />
            <div className="evaluation">
                <h4 className="heading-evaluation">Update Evaluation Scheme</h4>
                <div className="main">
                    <div className="select">
                        <h5>Session:&nbsp; </h5>
                        <h6 className="fixed">{session}</h6>
                    </div>
                    <div className="select">
                        <h5>Course: &nbsp;</h5>
                        <h6 className="fixed">{course}</h6>
                    </div>
                    <Button color="success" variant="contained">Mark Scheme for Individual Exam Component</Button>


                    <div className="table">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className="table-heading">
                                        <TableCell>Exam Id&nbsp;</TableCell>
                                        <TableCell>Exam Name&nbsp;</TableCell>

                                        <TableCell>Maximum Marks&nbsp;</TableCell>
                                        <TableCell>Weightage&nbsp;</TableCell>
                                        <TableCell>Action-1&nbsp;</TableCell>
                                        <TableCell>Action-2&nbsp;</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        evalu.map((e) => (
                                            <TableRow
                                                key={e.ExamId}
                                            >
                                                <TableCell><input value={e.ExamId} readOnly></input></TableCell>
                                                <TableCell><input placeholder={e.ExamName} id={`${e.ExamId}EN`}></input></TableCell>

                                                <TableCell><input placeholder={e.TotalMarks} id={`${e.ExamId}TM`}></input></TableCell>
                                                <TableCell><input placeholder={e.Weightage} id={`${e.ExamId}W`}></input></TableCell>
                                                <TableCell><Button variant="outlined" onClick={() => updateScheme(e.ExamId)}>Save</Button></TableCell>
                                                <TableCell><Popconfirm
                                                    title="Are you sure to delete this component?"
                                                    onConfirm={() => deleteScheme(e.ExamId)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                ><Button>Delete</Button></Popconfirm></TableCell>


                                            </TableRow>

                                        ))
                                    }
                                    {
                                        [...Array(rows)].map((e) => (
                                            <TableRow
                                                key={e}
                                            >
                                                <TableCell></TableCell>
                                                <TableCell><input id={`${e}EN`}></input></TableCell>
                                                <TableCell><input id={`${e}TM`}></input></TableCell>
                                                <TableCell><input id={`${e}W`}></input></TableCell>
                                                <TableCell><Button variant="outlined" onClick={() => AddScheme(e)}>Add</Button></TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div style={{ display: 'flex', 'justify-content': 'center' }}>
                        <div className="icons">
                            <IconButton>
                                <AddCircleIcon sx={{ color: 'green', fontSize: '32px' }} onClick={addRow} />
                            </IconButton>

                            <IconButton>
                                <IndeterminateCheckBoxIcon sx={{ color: 'red', fontSize: '32px' }} onClick={deleteRow} />
                            </IconButton>
                        </div>

                    </div>
                    <Link to='/MenuInstructor/CourseListEvaluationScheme'><KeyboardBackspaceIcon />  Go back to Course Selection</Link>
                </div >
            </div >
            <Footer />
        </div >
    )
}

export default EvaluationScheme
