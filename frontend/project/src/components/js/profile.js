import "../css/profile.css";
import React from "react";
import axios from "axios";
import Navbar from "./navbar";
import EachCard from "./eachCard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faPhone, faBirthdayCake, faEnvelope, faVenusMars, faDroplet, faHouse, faGraduationCap, faMedal } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react";
import { DateTodayTomm } from "../utils/dateTomm";

function Profile() {
    let type = localStorage.getItem("type");
    let email = localStorage.getItem("email");
    
    let dateToday = DateTodayTomm();
    const [appointments, setAppointments] = React.useState([])

    const [details, setDetails] = React.useState([])

    const getDetails = async (e) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/userlogin`, {
                "email": email,
                "type": type
            });
            setDetails(response.data[0]);
        }
        catch (err) {
        }
    };

    const getAppointments = async (e) => {
        try {
            const resp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/appointmentslist/${type}/${email}`)
            setAppointments(resp.data);
        }
        catch (err) {
        }
    };

    useEffect(() => {
        getAppointments();
        getDetails();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="outer-profile">
                <div className="profile-left">
                    <div className="card">
                        <div className="card-header" id="card-left">
                            <div className="img-placeholder">
                                <img alt="profile pic" src="https://static.vecteezy.com/system/resources/previews/008/420/425/original/cute-penguin-wearing-earmuff-cartoon-icon-illustration-animal-winter-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg" />
                            </div>
                            <div className="details">
                                <h3>Profile</h3>
                                {details["name"] && <div className="detail-item"><FontAwesomeIcon icon={faUser} /> <b>Name :</b> {details["name"]} </div>}
                                {details["email"] && <div className="detail-item"><FontAwesomeIcon icon={faEnvelope} /> <b>Email :</b> {details["email"]} </div>}
                                {details["phone_num"] && <div className="detail-item"><FontAwesomeIcon icon={faPhone} /> <b>Phone :</b> {details["phone_num"]} </div>}
                                {details["dob"] && <div className="detail-item"><FontAwesomeIcon icon={faBirthdayCake} /> <b>DOB</b> {details["dob"]} </div>}
                                {details["gender"] && <div className="detail-item"><FontAwesomeIcon icon={faVenusMars} /> <b>Gender :</b> {details["gender"]} </div>}
                                {details["bloodgroup"] && <div className="detail-item"><FontAwesomeIcon icon={faDroplet} /> <b>Bloodgroup :</b> {details["bloodgroup"]} </div>}
                                {details["address"] && <div className="detail-item"><FontAwesomeIcon icon={faHouse} /> <b>Address :</b> {details["address"]} </div>}
                                {details["degree"] && <div className="detail-item"><FontAwesomeIcon icon={faGraduationCap} /> <b>Degree :</b> {details["degree"]} </div>}
                                {details["specialisation"] && <div className="detail-item"><FontAwesomeIcon icon={faMedal} /> <b>Specialisation :</b> {details["specialisation"]} </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-right">
                    <div className="past-appointments">
                        <h2 className="upcoming-title">Past Appointments</h2>
                        <div className="for-scroll">
                            {appointments.map((appointment) => (appointment.appointment_date < dateToday) &&

                                <EachCard
                                    id={appointment.id}
                                    doctor_email={appointment.doctor_email}
                                    patient_email={appointment.patient_email}
                                    appointment_date={appointment.appointment_date}
                                    appointment_time={appointment.appointment_time}
                                    // start = 
                                    symptoms={appointment.symptoms}
                                    status={appointment.status}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;