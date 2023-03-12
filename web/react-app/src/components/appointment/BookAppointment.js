import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { appointmentService } from "../../services/appointment.service";
import { useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import { appointmentTypes } from "../../util/consts";

const BookAppointment = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState(null);

  useEffect(() => {
    userService.getUser().then((user) => setUser(user));
    userService.getAllDoctors().then((doctors) => setDoctors(doctors));
  }, []);

  if (doctors == null) {
    <h1>Loading...</h1>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-3">
        Please fill in the form below to book an appointment
      </h2>
      <Formik
        initialValues={{
          appointmentType: appointmentTypes[0].value,
          appointmentStatus: "PENDING",
          schedule: "",
          description: "",
          doctorId: doctors ? doctors[0].id : "",
          patientId: user?.id,
        }}
        validationSchema={Yup.object().shape({
          appointmentType: Yup.string().required(
            "Appointment Type is required"
          ),
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
            .addAppointment(
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
                history.push("/profile");
              },
              () => {
                setSubmitting(false);
              }
            );
        }}
        enableReinitialize
      >
        {({ errors, status, touched, isSubmitting }) => (
          <Form style={{ width: "50%" }}>
            <div className="form-group">
              <label htmlFor="appointmentType">Appointment Type</label>
              <Field
                as="select"
                name="appointmentType"
                className={
                  "form-control" +
                  (errors.appointmentType && touched.appointmentType
                    ? " is-invalid"
                    : "")
                }
              >
                {appointmentTypes.map((at, i) => (
                  <option key={i} value={at.value}>
                    {at.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="appointmentType"
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
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field
                name="description"
                type="textarea"
                className={
                  "form-control" +
                  (errors.description && touched.description
                    ? " is-invalid"
                    : "")
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
            <div className="form-group my-2">
              <Link to="/news" className="btn btn-primary ml-2 me-2">
                Back
              </Link>
              <button
                type="submit"
                className="btn btn-success my-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <img
                    alt="loading"
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                  />
                ) : (
                  <span>Book</span>
                )}
              </button>
            </div>
            {status && <div className="alert alert-danger">{status}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookAppointment;
