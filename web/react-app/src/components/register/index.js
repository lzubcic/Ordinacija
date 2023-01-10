import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";

import { userService } from "../../services/user.service";

const RegisterForm = styled.div`
  margin: 0 auto;

  @media (min-width: 995px) {
    width: 40%;
  }
`;

const Register = () => {
  const history = useHistory();

  return (
    <RegisterForm className="container my-3">
      <h2>Register</h2>
      <Formik
        initialValues={{
          username: "",
          password: "",
          firstName: "",
          lastName: "",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Username is required"),
          password: Yup.string().required("Password is required"),
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
        })}
        onSubmit={(
          { username, password, firstName, lastName },
          { setStatus, setSubmitting }
        ) => {
          userService.addUser(username, password, firstName, lastName).then(
            (user) => {
              const { form } = { form: { pathname: "/login" } };
              history.push(form);
            },
            (error) => {
              setSubmitting(false);
              setStatus(error);
            }
          );
        }}
      >
        {({ errors, status, touched, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                name="username"
                type="text"
                className={
                  "form-control" +
                  (errors.username && touched.username ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="username"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className={
                  "form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="password"
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
                Register
              </button>
              <Link className="btn btn-success mx-3" to="/login">
                Back to Login
              </Link>
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
    </RegisterForm>
  );
};

export default Register;
