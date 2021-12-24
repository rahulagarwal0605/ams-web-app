import React, { useState } from 'react';
import axios from 'axios';
import './css/Main.css';
import { useNavigate } from "react-router-dom";
import authContext from "../context/userContext";
import { Button, message } from 'antd';
import 'antd/dist/antd.css';
import url from './constants.js';

function Main() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let history = useNavigate();

    const { setAuthenticated } = React.useContext(authContext);

    const login = async () => {
        if (verifyDetails()) {
            const options = {
                url: `${url}/api/login`,
                method: 'POST',
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    username: username,
                    password: password
                }
            }

            const resp = await axios(options);
            if (resp.data.status === 'success') {
                setAuthenticated(true);
                if (resp.data.data.type === 'Instructor') history("/successlogin");
            }
            else message.error("Wrong Username/password or both");
        }
    }


    const verifyDetails = () => {
        if (!username || !password) {
            alert("username or password cannot be empty!");
            return 0;
        }
        else return 1;
    }

    return (
        <div>
            <div className="outer" ></div>
            <div className="main__login">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-6 col-md-8 login-box">
                            <div className="col-lg-12 login-title">
                                LOGIN
                            </div>

                            <div className="col-lg-12 login-form">
                                <div className="col-lg-12 login-form">
                                    <form>
                                        <div className="form-group">
                                            <label className="form-control-label">USERNAME</label>
                                            <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control input_text" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label">PASSWORD</label>
                                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control input_text" />
                                        </div>

                                        <div className="col-lg-12 loginbttm">
                                            <div className="col-lg-6 login-btmm login-text">
                                                Forget Password ?
                                            </div>
                                            <div className="col-lg-6 login-btm ">
                                                <Button onClick={login} style={{ color: 'black', border: '1px solid #1A2226', padding: '5px 5px', fontWeight: "bold", backgroundColor: '#0DB8DE' }}>Login</Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;