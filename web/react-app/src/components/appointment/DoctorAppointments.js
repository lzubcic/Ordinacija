import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { appointmentService } from "../../services/appointment.service";
import { userService } from "../../services/user.service";
import { appointmentTypes } from "../../util/consts";
import { formatDateString } from "../../util/helper";

const DoctorAppointments = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState(null);
  const [patient, setPatient] = useState(null);
  const status = [
    { value: "PENDING", name: "Pending" },
    { value: "SCHEDULED", name: "Scheduled" },
    { value: "CANCELED", name: "Canceled" },
    { value: "PASSED", name: "Past" },
  ];

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const fetchUser = () => {
    userService.getUser().then((user) => setUser(user));
  };

  const fetchAppointments = () => {
    if (user) {
      appointmentService
        .getByDoctorId(user.id)
        .then((apps) => setAppointments(apps));
    }
  };

  const handleAccept = (id) => {
    appointmentService.acceptAppointment(id).then((res) => {
      fetchAppointments();
      console.log(res);
    });
  };

  const handleCancel = (id) => {
    appointmentService.cancelAppointment(id).then((res) => {
      fetchAppointments();
      console.log(res);
    });
  };

  return (
    <div className="container my-4">
      <h2>Your appointments</h2>
      {status.map((s, i) => (
        <div key={i}>
          <h4 className="my-4">{s.name}</h4>
          {appointments?.map((appointment) => {
            if (appointment.appointmentStatus === s.value) {
              return (
                <Card key={appointment.id} style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{`${
                      appointmentTypes.find(
                        (at) => at.value === appointment.appointmentType
                      ).name
                    } at ${formatDateString(
                      appointment.schedule
                    )}`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{`Patient: ${patient?.firstName} ${patient?.lastName}`}</Card.Subtitle>
                    <Card.Text>{appointment.description}</Card.Text>
                    {appointment.appointmentStatus === "PENDING" && (
                      <Card.Footer>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAccept(appointment.id)}
                        >
                          Accept
                        </button>
                      </Card.Footer>
                    )}
                    {appointment.appointmentStatus === "SCHEDULED" && (
                      <Card.Footer>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          Cancel
                        </button>
                      </Card.Footer>
                    )}
                  </Card.Body>
                </Card>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default DoctorAppointments;
