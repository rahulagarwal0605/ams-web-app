import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Spin } from 'antd';
import 'antd/dist/antd.css';

function InternalNotSet() {
    const history = useNavigate();
    const search = useLocation().search;
    const course = new URLSearchParams(search).get('course');
    const session = new URLSearchParams(search).get('session');
    const id = new URLSearchParams(search).get("id");


    React.useEffect(() => {
        setTimeout(() => history(`/MenuInstructor/CourseListInternal/MarkEntryInternal?session=${session}&course=${course}&id=${id}`), 2600);
    }, [history, id, session, course]);

    return (
        <div style={{ textAlign: 'center', marginTop: '280px' }}>
            <Spin style={{ 'fontSize': '30px' }} tip="Internal Marks are not Locked !" size="large" />
        </div>
    )
}

export default InternalNotSet
