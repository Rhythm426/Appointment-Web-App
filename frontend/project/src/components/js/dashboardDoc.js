import "../css/dashboard.css"
import axios from "axios";
import React from "react";
import Card from "react-bootstrap/Card"
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Navbar from './navbar';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect } from "react";
import { DateTodayTomm } from "../utils/dateTomm";

function DashboardDoc() {

    let email = localStorage.getItem("email");
    let type = localStorage.getItem("type");
    let dateToday = DateTodayTomm();

    const [appointments, setAppointments] = React.useState([])

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
    }, [])

    return (
        <div>
            <Navbar />
            <div className="dashboard-container">
                <div className='calender'>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        events={appointments}
                        eventContent={renderEventContent}
                        height={500}
                        contentHeight={20}
                    />
                </div>
                <div className="upcoming-appointments">
                    <h2 className="upcoming-title">Upcoming Appointments</h2>
                    <div className="for-scroll">
                        {appointments.map((appointment) => (appointment.appointment_date >= dateToday) &&

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
    )
}

const EachCard = (props) => {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const postCancel = async () => {
        try {
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/appointmentslist/change/${props.id}/Cancelled`, {
                "id": props.id,
                "patient_email": props.patient_email,
                "doctor_email": props.doctor_email,
                "appointment_date": props.appointment_date,
                "appointment_time": props.appointment_time,
                "symptoms": props.symptoms,
                "status": "Cancelled"
            }).then(
                window.location.reload()
            )
            // setTimeout(props.fetchData(),500);
        }
        catch (err) {
        }
    };

    const postCompleted = async () => {
        try {
            let new_data = {};
            // new_data["doctors_name"] = props.doctors_name;
            axios.put(`${process.env.REACT_APP_BACKEND_URL}/appointmentslist/change/${props.id}/Completed`, {
                "id": props.id,
                "patient_email": props.patient_email,
                "doctor_email": props.doctor_email,
                "appointment_date": props.appointment_date,
                "appointment_time": props.appointment_time,
                "symptoms": props.symptoms,
                "status": "Completed"
            }).then(
                window.location.reload()
            )
            // setTimeout(props.fetchData(),500);
        }
        catch (err) {
        }
    };

    return (
        <Card className="today-card">
            <Card.Body>
                <Card.Title>{props.patient_email}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {props.appointment_date} | {props.appointment_time}
                </Card.Subtitle>
                <hr />
                <Card.Text>
                    <b>Symptoms :</b>  {props.symptoms} <br />
                    <b>Status : </b> {props.status}
                </Card.Text>
                <Button id='completeButton' className='buttons' variant="success" onClick={postCompleted} disabled={(props.status==="Completed")||(props.status === "Cancelled")}>Completed</Button>
                <Button id='deleteButton' className='buttons' variant="danger" onClick={handleShow} disabled={(props.status==="Completed")||(props.status === "Cancelled")}>Cancel</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.patient_email} | {props.appointment_date} | {props.appointment_time} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to cancel?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={() => { postCancel(props.id); handleClose() }}>Confirm Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </Card.Body>
        </Card>
    )
}

// a custom render function
function renderEventContent(eventInfo) {
    return (
        <div className={"calender-event " + eventInfo.event.extendedProps.status}>
            <span className="dot"></span>
            <b> {eventInfo.event.extendedProps.appointment_time}</b>
            <br></br>
            <i>{eventInfo.event.extendedProps.patient_email}</i>
        </div>
    )
}


export default DashboardDoc;