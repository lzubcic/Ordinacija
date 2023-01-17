import {Link, useHistory} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {newsService} from "../../../services/news.service";

const CreateNews = () => {
    const history = useHistory();

    return (
        <div className="container my-4">
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    image: ""
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required("Title is required"),
                    description: Yup.string().required("Description is required")
                })}
                onSubmit={(
                    {
                        title,
                        description,
                        image,
                    },
                    {setSubmitting}
                ) => {
                    newsService
                        .addNews(
                            title,
                            description,
                            image
                        )
                        .then(
                            (news) => {
                                setSubmitting(false);
                                history.push("/news");
                            },
                            (error) => {
                                setSubmitting(false);
                            }
                        );
                    }}
                enableReinitialize
            >
                {({errors, status, touched, isSubmitting}) => (
                    <Form style={{ width: "50%" }}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <Field
                                name="title"
                                type="text"
                                className={
                                    "form-control" +
                                    (errors.title && touched.title ? " is-invalid" : "")
                                }
                            />
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field
                                name="description"
                                type="text"
                                className={
                                    "form-control" +
                                    (errors.description && touched.description ? " is-invalid" : "")
                                }
                            />
                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <Field
                                name="image"
                                type="text"
                                className={
                                    "form-control" +
                                    (errors.image && touched.image ? " is-invalid" : "")
                                }
                            />
                            <ErrorMessage name="image" component="div" className="invalid-feedback" />
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
                                    <span>Add</span>
                                )}
                            </button>
                        </div>
                        {status && <div className="alert alert-danger">{status}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateNews;