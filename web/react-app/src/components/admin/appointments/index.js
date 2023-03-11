import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { appointmentService } from "../../../services/appointment.service";
import EditAppointment from "./EditAppointment";

const Appointments = () => {
  const [appointments, setAppointments] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const fetchedAppointments = await appointmentService.getAllAppointments();
    const appointments = await fetchedAppointments;

    setAppointments(appointments);
  };

  const appointmentToEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const onSave = async () => {
    setShowModal(false);
    await fetchAppointments();
  };

  const onDelete = async (appointment) => {
    await appointmentService.deleteAppointment(appointment.id);
    await fetchAppointments();
  };

  return (
    <table className="container my-4 table table-bordered">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Appointment Type</th>
          <th scope="col">Appointment Status</th>
          <th scope="col">Schedule</th>
          <th scope="col">Description</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {appointments?.map((appointment) => (
          <tr key={appointment.id}>
            <th scope="row">{appointment.id}</th>
            <td>{appointment.appointmentType}</td>
            <td>{appointment.appointmentStatus}</td>
            <td>{appointment.schedule}</td>
            <td>{appointment.description}</td>
            <td>
              <button
                className="btn btn-warning mx-3"
                onClick={() => appointmentToEdit(appointment)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  window.confirm(
                    "Are you sure you want to delete appointment" +
                      appointment.id +
                      "?"
                  ) && onDelete(appointment);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAppointment appointment={selectedAppointment} onSave={onSave} />
        </Modal.Body>
      </Modal>
    </table>
  );
};

export default Appointments;
