import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from "react-icons/fa";

const Contact = () => {
    const workingHours = `
    Mon - Thu: 8:00 - 20:00 
    
    Fri - Sat: 8:00 - 18:00 
    
    Sunday and holidays: closed
    `;
    return (
        <div>
        <div className="container mt-3 d-flex flex-column w-50">
            <h2>
                Contact Us
            </h2>

            <Formik
                initialValues={{
                    email: "",
                    subject: "",
                    message: ""
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Please enter a valid email").required("Email is required"),
                    subject: Yup.string().max(60).required("Subject is required"),
                    message: Yup.string().max(255).required("Message is required")
                })}
                onSubmit={({ email, subject, message }, {setSubmitting}) => {
                    window.alert(`
                        Email: ${email}
                        Subject: ${subject}
                        Message: ${message}
                    `)
                    setSubmitting(false);
                }}
            >
                {({ errors, status, touched, isSubmitting }) => (
                  <Form>
                      <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <Field
                              name="email"
                              type="email"
                              className={
                                  "form-control" +
                                  (errors.email && touched.email ? " is-invalid" : "")
                              }
                          />
                          <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="subject">Subject</label>
                          <Field
                              name="subject"
                              type="text"
                              className={
                                  "form-control" +
                                  (errors.subject && touched.subject ? " is-invalid" : "")
                              }
                          />
                          <ErrorMessage
                              name="subject"
                              component="div"
                              className="invalid-feedback"
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="message">Message</label>
                          <Field
                              name="message"
                              type="textarea"
                              className={
                                  "form-control" +
                                  (errors.message && touched.message ? " is-invalid" : "")
                              }
                          />
                          <ErrorMessage
                              name="message"
                              component="div"
                              className="invalid-feedback"
                          />
                      </div>
                      <div className="d-flex form-group">
                          <button
                              type="submit"
                              className="btn btn-primary my-2"
                              disabled={isSubmitting}
                              style={{minWidth: "40px"}}
                          >
                              {isSubmitting ? (
                                  <img
                                      alt="loading"
                                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                                  />
                              ) : (
                                  <span>Send</span>
                              )}
                          </button>
                      </div>
                      {status && <div className={"alert alert-danger"}>{status}</div>}
                  </Form>
                )}
            </Formik>
        </div>

            <iframe
                title="address"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1390.4706275529502!2d15.970747057224367!3d45.81243487910665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6fcd9ec23b3%3A0xa97301f035129550!2sSFZG%20-%20Stomatolo%C5%A1ki%20fakultet%2C%2010000%2C%20Zagreb!5e0!3m2!1shr!2shr!4v1675012759630!5m2!1shr!2shr"
                width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                className="mt-3"
                referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="container d-flex justify-content-between my-3">
                <div>
                    <h3>Working hours</h3>
                    <p style={{ whiteSpace: "pre-wrap" }}>{workingHours}</p>
                </div>

                <div>
                    <h3 className="text-center">Socials</h3>
                    <div className="socials ms-4">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <FaInstagram size="2rem" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <FaFacebook size="2rem" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <FaTwitter size="2rem" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <FaLinkedin size="2rem" />
                        </a>
                    </div>
                </div>

                <div>
                    <h3>Contact</h3>
                    <address>
                        Email: <a href="mailto:test@mail.com">info@clinic.com</a><br />
                        {/*<br/>*/}
                        Phone: <a href="tel:+38501123456">01 / 123 456</a><br />
                        {/*<br/>*/}
                        Address: Gundulićeva 3, Zagreb<br/>
                        Croatia
                    </address>
                </div>

            </div>
        </div>
    )

}

export default Contact;