import "../css/signUp.css";

import React from "react";
import axios from "axios";
import crypto from "crypto-js";

import Alert from "react-bootstrap/Alert";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function SignUp() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [message1, setMessage1] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [dob, setDob] = React.useState("");
    const [bloodgroup, setBloodgroup] = React.useState("");
    const [degree, setDegree] = React.useState("");
    const [specialisation, setSpecialisation] = React.useState("");
    const [type, setType] = React.useState("Patient");

    const trySignUpPatient = async (e) => {
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.")
        }
        else if (phone.length !== 10) {
            setMessage("Phone number should be 10 digits.")
        }
        else {
            console.log("successful")

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patientlist`, {
                "name": username,
                "email": email,
                "password": password,
                "gender": gender,
                "address": address,
                "dob": dob,
                "phone_num": phone,
                "bloodgroup": bloodgroup,
            });

            if (response.status === 200) {
                localStorage.setItem("email", email);
                localStorage.setItem("type", type);
                window.location = "/dashboard";
            } else {
                setMessage("User not created.")
                console.log(response);
            }
        }
    };

    const trySignUpDoctor = async (e) => {
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.")
        }
        else if (phone.length !== 10) {
            setMessage("Phone number should be 10 digits.")
        }
        else {
            console.log("successful")

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/doctorlist`, {
                "name": username,
                "email": email,
                "password": password,
                "gender": gender,
                "phone_num": phone,
                "degree": degree,
                "specialisation": specialisation
            });

            if (response.status === 200) {
                localStorage.setItem("email", email);
                localStorage.setItem("type", type);
                window.location = "/dashboard";
            } else {
                setMessage1("User not created.")
                console.log(response);
            }
        }
    };

    const tryLogin = async (e) => {
        console.log(email, password, type);
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/userlogin`, {
            "email": email,
            "password": password,
            "type": type
        });

        if (response.data.length != 0) {
            localStorage.setItem("email", email);
            localStorage.setItem("type", type);
            window.location = "/dashboard";
        } else {
            setMessage1("Invalid credentials.")
            console.log(response);
        }
    };

    return (
        <div className="first-outer">
            {/* <Navbar /> */}
            <div className="first-container" id="first-container">
                <div className="first-left">
                    <h1><center>Log In</center></h1>

                    <Tabs
                        className="tabs"
                        defaultActiveKey="Patient"
                        fill
                    >
                        <Tab tabClassName="coloredTab" eventKey="Patient" title="Patient">

                            <form className="form-left" action="#">
                                <input className="signup-iinput" placeholder="email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                                <input className="signup-iinput" placeholder="password" type="password" onChange={(e) => { setPassword(crypto.SHA256(e.target.value).toString()) }} />
                                {message1 && <Alert className="signup-iinput" key="danger" variant="danger">{message1}</Alert>}
                                <button className="first-button" onClick={(e) => { setType("Patient"); tryLogin() }}>Login</button>
                            </form>
                        </Tab>
                        <Tab tabClassName="coloredTab" eventKey="Doctor" title="Doctor">

                            <form className="form-left" action="#">
                                <input className="signup-iinput" placeholder="email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                                <input className="signup-iinput" placeholder="password" type="password" onChange={(e) => { setPassword(crypto.SHA256(e.target.value).toString()) }} />
                                {message1 && <Alert className="signup-iinput" key="danger" variant="danger">{message1}</Alert>}
                                <button className="first-button" onClick={(e) => { setType("Doctor"); tryLogin() }}>Login</button>
                            </form>
                        </Tab>
                    </Tabs>
                </div>

                <div className="first-right">
                    <h1><center>Sign Up</center></h1>
                    <Tabs
                        className="tabs"
                        defaultActiveKey="Patient"
                        fill
                    >
                        <Tab tabClassName="coloredTab" eventKey="Patient" title="Patient">
                            <form className="form-right" action="#">
                                <input className="signup-iinput" placeholder="name" onChange={(e) => { setUsername(e.target.value) }} />
                                <input className="signup-iinput" placeholder="email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                                <input className="signup-iinput" placeholder="password" type="password" onChange={(e) => { setPassword(crypto.SHA256(e.target.value).toString()) }} />
                                <input className="signup-iinput" placeholder="confirm password" type="password" onChange={(e) => { setConfirmPassword(crypto.SHA256(e.target.value).toString()) }} />
                                <select className="signup-iinput" placeholder="gender" onChange={(e) => { setGender(e.target.value) }}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input className="signup-iinput" placeholder="address" onChange={(e) => { setAddress(e.target.value) }} />
                                <input className="signup-iinput" placeholder="DOB (YYYY-MM-DD)" onChange={(e) => { setDob(e.target.value) }} />
                                <input className="signup-iinput" placeholder="phone number" maxLength={10} minLength={10} onChange={(e) => { setPhone(e.target.value) }} />
                                <select className="signup-iinput" placeholder="bloodgroup" onChange={(e) => { setBloodgroup(e.target.value) }}>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                                {message && <Alert className="signup-iinput" key="danger" variant="danger">{message}</Alert>}
                                <button className="first-button" onClick={(e) => { setType("Patient"); trySignUpPatient() }}>Sign Up</button>
                            </form>
                        </Tab>
                        <Tab eventKey="Doctor" title="Doctor">
                            <form className="form-right" action="#">
                                <input className="signup-iinput" placeholder="name" onChange={(e) => { setUsername(e.target.value) }} />
                                <input className="signup-iinput" placeholder="email" type="email" onChange={(e) => { setEmail(e.target.value) }} />
                                <input className="signup-iinput" placeholder="password" type="password" onChange={(e) => { setPassword(crypto.SHA256(e.target.value).toString()) }} />
                                <input className="signup-iinput" placeholder="confirm password" type="password" onChange={(e) => { setConfirmPassword(crypto.SHA256(e.target.value).toString()) }} />
                                <select className="signup-iinput" placeholder="gender" onChange={(e) => { setGender(e.target.value) }}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <input className="signup-iinput" placeholder="phone number" type="number" maxLength={10} minLength={10} onChange={(e) => { setPhone(e.target.value) }} />
                                <input className="signup-iinput" placeholder="degree" onChange={(e) => { setDegree(e.target.value) }} />
                                <input className="signup-iinput" placeholder="specialisation" onChange={(e) => { setSpecialisation(e.target.value) }} />
                                {message && <Alert className="signup-iinput" key="danger" variant="danger">{message}</Alert>}
                                <button className="first-button" onClick={(e) => { setType("Docotr"); trySignUpDoctor() }}>Sign Up</button>
                            </form>
                        </Tab>
                    </Tabs>

                </div>

                <div className="overlay-first-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Already have an account?</h1>
                            <p>Please login with your personal info.</p>
                            <button className="ghost" id="signIn" onClick={() => { document.getElementById('first-container').classList.remove("right-panel-active") }}>Log In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Dont have an account?</h1>
                            <p>Enter your personal details and start journey with us!</p>
                            <button className="ghost" id="signUp" onClick={() => { document.getElementById('first-container').classList.add("right-panel-active") }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SignUp;