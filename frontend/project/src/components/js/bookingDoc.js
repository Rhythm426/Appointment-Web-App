import "../css/booking.css";
import React from "react";
import axios from "axios";
import Lottie from "react-lottie"

import animationData from "../../static/lotties/animation_llxohijf.json"
import Navbar from "./navbar";
import Alert from "react-bootstrap/Alert";
import { useEffect } from "react";
import { DateTodayTomm } from "../utils/dateTomm";

function BookingDoc() {

    let type = localStorage.getItem("type");
    let email = localStorage.getItem("email");

    let dateTomm = DateTodayTomm("tomm")

    const [patientEmail, setPatientEmail] = React.useState("default");
    const [doctorEmail, setDoctorEmail] = React.useState(email);
    const [date, setDate] = React.useState(dateTomm);
    const [time, setTime] = React.useState("09:00");
    const [symptoms, setSymptoms] = React.useState("None");
    const [message, setMessage] = React.useState("");
    const [patientsList, setPatientsList] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patientlist`);
                setPatientsList(resp.data);
            }
            catch (err) {
                // console.log(process.env.REACT_APP_API_URL}');
            }
        }
        fetchData();
    }, [])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const tryBooking = async (e) => {
        if(patientEmail==="default"){
            setMessage("Please select a patient.")
        }
        else{
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/appointmentslist/${type}/${email}`, {
                "patient_email" : patientEmail,
                "doctor_email" : doctorEmail,
                "appointment_date" : date,
                "appointment_time" : time,
                "symptoms" : symptoms,
                "status" : "Scheduled"
            });

            if (response.status === 200) {
                window.location = "/dashboard";
                console.log("successful")
            } else {
                console.log(response);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="booking-container">
                <div className="booking-left">
                    <div className="textt">
                        Want to book an appointment?
                        <Lottie
                            options={defaultOptions}
                            height={350}
                            width={350}
                        />
                    </div>
                </div>
                <div className="booking-right">
                    <div className="booking-form">
                        <h1>Book an appointment</h1>
                        <input className="booking-input" placeholder="patient email" type="email" value={email} />

                        <select className="booking-input" placeholder="doctor info" onChange={(e) => { setPatientEmail(e.target.value) }}>
                        <option value="default">Select Patient</option>
                            {patientsList.map((patient) => (patient &&
                                <option value={patient.email}>{patient.name} - {patient.email}</option>
                            ))}
                        </select>

                        <div className="appointment-date-time">
                            <input className="booking-input booking-input-datetime" placeholder="date" type="date" min={dateTomm} value={date} onChange={(e) => { setDate(e.target.value) }} />
                            <select className="booking-input booking-input-datetime" placeholder="time" onChange={(e) => { setTime(e.target.value) }}>
                                <option value="09:00">09:00</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <option value="12:00">12:00</option>
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                                <option value="17:00">17:00</option>
                            </select>
                        </div>
                        {/* <small>Clinic is open only between 9:00 am and 6:00pm.</small> */}
                        <input className="booking-input" placeholder="symptoms" type="text" maxLength={200} onChange={(e) => { setSymptoms(e.target.value) }} />
                        {message && <Alert className="booking-input" key="danger" variant="danger">{message}</Alert>}
                        <button className="first-button" onClick={tryBooking}>Book</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default BookingDoc;