import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { appointmentService } from "../../services/appointment.service";

import { userService } from "../../services/user.service";
import { appointmentTypes } from "../../util/consts";
import { formatDateString } from "../../util/helper";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  useEffect(() => {
    fetchDoctor();
  }, [appointment]);

  const fetchUser = async () => {
    const fetchedUser = await userService.getUser();
    const user = await fetchedUser;

    setUser(user);
  };

  const fetchAppointments = () => {
    if (user) {
      appointmentService
        .getByPatientId(user?.id)
        .then((apps) => setAppointment(apps[0]));
    }
  };

  const fetchDoctor = () => {
    if (appointment) {
      userService.getById(appointment.doctorId).then((doc) => setDoctor(doc));
    }
  };

  return (
    <div className="container my-4">
      <h2>
        Welcome to your profile, {user?.firstName} {user?.lastName}!
      </h2>
      <hr />
      <h3>Your personal information</h3>
      <Formik
        initialValues={{
          username: user?.username || "",
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required"),
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
        })}
        onSubmit={({ username, firstName, lastName }, { setSubmitting }) => {
          userService
            .updateUser(user.id, username, "hack", firstName, lastName)
            .then(
              (user) => {
                setSubmitting(false);
                setUser(user);
              },
              (error) => {
                setSubmitting(false);
              }
            );
        }}
        enableReinitialize
      >
        {({ errors, status, touched, isSubmitting }) => (
          <Form style={{ width: "50%" }}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                name="username"
                type="text"
                className={
                  "form-control" +
                  (errors.username && touched.username ? " is-invalid" : "")
                }
                disabled
              />
              <p style={{ color: "gray" }}>
                Only administrator can edit username
              </p>
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <Field
                name="firstName"
                type="text"
                className={
                  "form-control" +
                  (errors.firstName && touched.firstName ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <Field
                name="lastName"
                type="text"
                className={
                  "form-control" +
                  (errors.lastName && touched.lastName ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary my-2"
                disabled={isSubmitting}
              >
                Update
              </button>
              {isSubmitting && (
                <img
                  alt="loading"
                  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                />
              )}
            </div>
            {status && <div className={"alert alert-danger"}>{status}</div>}
          </Form>
        )}
      </Formik>
      <hr />
      <h3 className="mb-4">Your appointment</h3>
      {appointment ? (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{`${
              appointmentTypes.find(
                (at) => at.value === appointment.appointmentType
              ).name
            } at ${formatDateString(appointment.schedule)}`}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{`Doctor: ${doctor?.firstName} ${doctor?.lastName}`}</Card.Subtitle>
            <Card.Text>{appointment.description}</Card.Text>
            <Card.Footer>Status: {appointment.appointmentStatus}</Card.Footer>
          </Card.Body>
        </Card>
      ) : (
        <>
          <p>You currently don't have an appointment.</p>
          <Link to="/appointment" className="btn btn-success">
            Schedule an appointment
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
