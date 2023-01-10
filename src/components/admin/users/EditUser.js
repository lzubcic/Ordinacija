import * as Yup from "yup";
import {userService} from "../../../services/user.service";
import {ErrorMessage, Field, Form, Formik} from "formik";

const EditUser = ({user, onSave}) => (
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
                <div className="form-group my-2">
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
                <div className="form-group my-2">
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
)

export default EditUser;
