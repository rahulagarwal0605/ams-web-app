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

function MarkEntryEndterm() {
    const auto = [{ 'Grade': 'A', 'min': '45', 'max': '60', 'points': '10' }, { 'Grade': 'A', 'min': '45', 'max': '60', 'points': '10' }, { 'Grade': 'A', 'min': '45', 'max': '60', 'points': '10' }];
    const manual = [{ 'Grade': 'A', 'min': '45', 'max': '60', 'points': '10' }, { 'Grade': 'A', 'min': '45', 'max': '60', 'points': '10' }, { 'Grade': 'A', 'min': '45', 'max': '60', 'points': '10' }];
    const students = [{ 'Roll Number': '19UCS262', 'Name': 'Jaskaran Singh', 'ev1': '9', 'ev2': '8', 'midsem': '23' },
    { 'Roll Number': '19UCS247', 'Name': 'Apurv mundhra', 'ev1': '10', 'ev2': '7', 'midsem': '29' }];

    let ser = 1;
    return (
        <div><Header />
            <div className="mark_entry_endterm">
                <h4 className="heading">Mark Entry - Endterm</h4>
                <div className="main">
                    <div className="select">
                        <h5>Session:&nbsp; </h5>
                        <h6 className="fixed">Odd Sem 2020-2021 II</h6>
                    </div>
                    <div className="select">
                        <h5>Course: &nbsp;</h5>
                        <h6 className="fixed">Computer Networks</h6>
                    </div>
                    <h5>Import Student Marks: &nbsp;</h5>
                    <div className="select">
                        <input type="file" id="myfile" name="myfile"></input>
                    </div>
                    <div className="select">
                        <h5>Export Student List:&nbsp;&nbsp;&nbsp;</h5>
                        <button style={{ 'border': '1px solid black' }}>Export</button>
                    </div>

                    <div className="table_area">
                        <div className="table">
                            <h5>Automated grade Range</h5>
                            <TableContainer component={Paper}>
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
                                            auto.map((x) => (
                                                <TableRow>
                                                    <TableCell>{x.Grade}&nbsp;</TableCell>
                                                    <TableCell>{x.min}&nbsp;</TableCell>
                                                    <TableCell>{x.max}&nbsp;</TableCell>
                                                    <TableCell>{x.points}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <div className="table">
                            <h5>Manual grade Range</h5>
                            <TableContainer component={Paper}>
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
                                            manual.map((x) => (
                                                <TableRow>
                                                    <TableCell>{x.Grade}&nbsp;</TableCell>
                                                    <TableCell><input style={{ 'width': '3vw' }} type="text" placeholder={x.min} />&nbsp;</TableCell>
                                                    <TableCell><input style={{ 'width': '3vw' }} type="text" placeholder={x.max} />&nbsp;</TableCell>
                                                    <TableCell>{x.points}</TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <button className="submit-btn">Save Manual Grade Range</button>

                        </div>

                    </div>
                    <div className="table">
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Serial No.&nbsp;</TableCell>
                                        {
                                            Object.keys(students[0]).map((i) => (
                                                <TableCell>{i}&nbsp;</TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        students.map((s) => (
                                            <TableRow
                                                key={s}
                                            >
                                                <TableCell>{ser++}</TableCell>
                                                {
                                                    Object.values(s).map((i, ind) => (
                                                        ind >= 2 ? <TableCell><input type="number" step="0.01" placeholder={i} /></TableCell> : <TableCell>{i}</TableCell>
                                                    ))

                                                }
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
        </div>
    )
}

export default MarkEntryEndterm
