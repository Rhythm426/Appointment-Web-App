import axios from "axios";
import React from "react";
import Table from 'react-bootstrap/Table';
import Card from "react-bootstrap/Card"
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";

function EachCard(props) {
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

    return (
        <Card className="today-card">
            <Card.Body className={"card-body-" + props.status}>
                <Card.Title>{props.doctor_email}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {props.appointment_date} | {props.appointment_time}
                </Card.Subtitle>
                <hr />
                <Card.Text>
                    <b>Symptoms :</b>  {props.symptoms} <br />
                    <b>Status : </b> {props.status}
                </Card.Text>
                <Button id='deleteButton' className='buttons' variant="danger" onClick={handleShow} disabled={(props.status==="Completed")||(props.status === "Cancelled")}>Cancel</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.doctor_email} | {props.appointment_date} | {props.appointment_time} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to cancel {props.title}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={() => { postCancel(props.id); handleClose() }}>Confirm Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </Card.Body>
        </Card>
    )
}

export default EachCard;