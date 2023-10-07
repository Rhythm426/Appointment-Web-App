import "../css/dashboard.css"
import axios from "axios";
import React from "react";
import Navbar from './navbar';
import EachCard from "./eachCard";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useEffect } from "react";
import { DateTodayTomm } from "../utils/dateTomm";

function Dashboard() {

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
                    {/* <AppointmentTable /> */}
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

// a custom render function
function renderEventContent(eventInfo) {
    return (
        <div className={"calender-event " + eventInfo.event.extendedProps.status}>
            <span className="dot"></span>
            <b> {eventInfo.event.extendedProps.appointment_time} </b>
            <br></br>
            <i>{eventInfo.event.extendedProps.doctor_email}</i>
        </div>
    )
}


export default Dashboard;