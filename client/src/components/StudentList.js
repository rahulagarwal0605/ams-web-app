import React from 'react'
import Dropdown from "./Dropdown.js";
import "./css/StudentList.css"

function StudentList() {
    return (
        <div>
            <h4 className="head">Students registered in Course - Computer Networks</h4>
            <ul className="list-group table">
                <li className="list-group-item list-group-item-dark d-flex justify-content-around align-items-center"><span>Roll number</span> <span>Batch</span> <span>Student Name</span><span> Record Marks </span></li>
                <li className="list-group-item d-flex justify-content-around align-items-center"><span>19UCS565</span> <span>Y19</span> <span>Apurv Mundhra</span> <Dropdown /></li>
                <li className="list-group-item d-flex justify-content-around align-items-center"><span>19UCS565</span> <span>Y19</span> <span>Apurv Mundhra</span> <Dropdown /></li>
                <li className="list-group-item d-flex justify-content-around align-items-center"><span>19UCS565</span> <span>Y19</span> <span>Apurv Mundhra</span> <Dropdown /></li>
                <li className="list-group-item d-flex justify-content-around align-items-center"><span>19UCS565</span> <span>Y19</span> <span>Apurv Mundhra</span> <Dropdown /></li>
                <li className="list-group-item d-flex justify-content-around align-items-center"><span>19UCS565</span> <span>Y19</span> <span>Apurv Mundhra</span> <Dropdown /></li>
                <li className="list-group-item d-flex justify-content-around align-items-center"><span>19UCS565</span> <span>Y19</span> <span>Apurv Mundhra</span> <Dropdown /></li>
                <li className="list-group-item d-flex justify-content-around align-items-center"><span>19UCS565</span> <span>Y19</span> <span>Apurv Mundhra</span> <Dropdown /></li>
                <li className="list-group-item d-flex justify-content-around align-items-center"><span>19UCS565</span> <span>Y19</span> <span>Apurv Mundhra</span> <Dropdown /></li>
                <li className="list-group-item d-flex justify-content-around align-items-center"><span>19UCS565</span> <span>Y19</span> <span>Apurv Mundhra</span> <Dropdown /></li>

            </ul>
        </div>


    )
}

export default StudentList
