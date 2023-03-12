import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { appointmentService } from "../../../services/appointment.service";
import { useEffect, useState } from "react";
import { userService } from "../../../services/user.service";
import { appointmentTypes, appStatus } from "../../../util/consts";

const EditAppointment = ({ appointment, onSave }) => {
  const [doctors, setDoctors] = useState(null);
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    userService.getAllDoctors().then((doctors) => setDoctors(doctors));
    userService.getAllPatients().then((patients) => setPatients(patients));
  }, []);

  return (
    <Formik
      initialValues={{
        appointmentType: appointment?.appointmentType || "",
        appointmentStatus: appointment?.appointmentStatus || "",
        schedule: appointment?.schedule || "",
        description: appointment?.description || "",
        doctorId: appointment?.doctorId || "",
        patientId: appointment?.patientId || "",
      }}
      validationSchema={Yup.object().shape({
        appointmentType: Yup.string().required("Appointment Type is required"),
        appointmentStatus: Yup.string().required(
          "Appointment Status is required"
        ),
        schedule: Yup.string().required("Schedule is required"),
        description: Yup.string().required("Description is required"),
        doctorId: Yup.string().required("Doctor ID is required"),
        patientId: Yup.string().required("Patient ID is required"),
      })}
      onSubmit={(
        {
          appointmentType,
          appointmentStatus,
          schedule,
          description,
          doctorId,
          patientId,
        },
        { setSubmitting }
      ) => {
        appointmentService
          .updateAppointment(
            appointment.id,
            appointmentType,
            appointmentStatus,
            schedule,
            description,
            doctorId,
            patientId
          )
          .then(
            () => {
              setSubmitting(false);
              onSave();
            },
            (error) => {
              setSubmitting(false);
              console.error(error);
            }
          );
      }}
      enableReinitialize
    >
      {({ errors, status, touched, isSubmitting }) => (
        <Form>
          <div className="form-group my-2">
            <label htmlFor="appointmentType">Appointment Type</label>
            <Field
              name="appointmentType"
              as="select"
              className={
                "form-control" +
                (errors.appointmentType && touched.appointmentType
                  ? " is-invalid"
                  : "")
              }
            >
              {appointmentTypes.map((ap) => (
                <option value={ap.value}>{ap.name}</option>
              ))}
            </Field>
            <ErrorMessage
              name="appointmentType"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="appointmentStatus">Appointment Status</label>
            <Field
              name="appointmentStatus"
              as="select"
              className={
                "form-control" +
                (errors.appointmentStatus && touched.appointmentStatus
                  ? " is-invalid"
                  : "")
              }
            >
              {appStatus.map((s) => (
                <option value={s.value}>{s.name}</option>
              ))}
            </Field>
            <ErrorMessage
              name="appointmentStatus"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <label htmlFor="schedule">Schedule</label>
            <Field
              name="schedule"
              type="datetime-local"
              className={
                "form-control" +
                (errors.schedule && touched.schedule ? " is-invalid" : "")
              }
            />
            <ErrorMessage
              name="schedule"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group my-2">
            <label htmlFor="description">Description</label>
            <Field
              name="description"
              type="text"
              className={
                "form-control" +
                (errors.description && touched.description ? " is-invalid" : "")
              }
            />
            <ErrorMessage
              name="description"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorId">Doctor</label>
            <Field
              name="doctorId"
              as="select"
              className={
                "form-control" +
                (errors.doctorId && touched.doctorId ? " is-invalid" : "")
              }
            >
              {doctors?.map((doctor) => {
                return (
                  <option key={doctor.id} value={doctor?.id}>
                    {doctor.firstName} {doctor.lastName}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage
              name="doctorId"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientId">Patient</label>
            <Field
              name="patientId"
              as="select"
              className={
                "form-control" +
                (errors.patientId && touched.patientId ? " is-invalid" : "")
              }
            >
              {patients?.map((patient) => {
                return (
                  <option key={patient.id} value={patient?.id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage
              name="patientId"
              component="div"
              className="invalid-feedback"
            />
          </div>
          <div className="form-group d-flex justify-content-end mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <img
                  alt="loading"
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                />
              ) : (
                <span>Update</span>
              )}
            </button>
          </div>
          {status && <div className={"alert alert-danger"}>{status}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default EditAppointment;
