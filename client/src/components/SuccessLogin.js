import React from 'react'
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import 'antd/dist/antd.css';


function SuccessLogin() {
    const history = useNavigate();

    React.useEffect(() => {
        setTimeout(() => history('/menuInstructor'), 1600);
    }, [history])

    return (
        <div style={{ textAlign: 'center', marginTop: '280px' }}>
            <Spin style={{ 'fontSize': '30px' }} tip="Logging in Securely..." size="large" />
        </div>
    )
}

export default SuccessLogin
