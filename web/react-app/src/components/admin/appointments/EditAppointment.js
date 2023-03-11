import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { appointmentService } from "../../../services/appointment.service";

const EditAppointment = ({ appointment, onSave }) => (
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
            type="text"
            className={
              "form-control" +
              (errors.appointmentType && touched.appointmentType
                ? " is-invalid"
                : "")
            }
          />
          <ErrorMessage
            name="appointmentType"
            component="div"
            className="invalid-feedback"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="appointmentType">Appointment Status</label>
          <Field
            name="appointmentType"
            type="text"
            className={
              "form-control" +
              (errors.appointmentType && touched.appointmentType
                ? " is-invalid"
                : "")
            }
          />
          <ErrorMessage
            name="appointmentType"
            component="div"
            className="invalid-feedback"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="schedule">Schedule</label>
          <Field
            name="schedule"
            type="text"
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
        <div className="form-group my-2">
          <label htmlFor="doctorId">Doctor ID</label>
          <Field
            name="doctorId"
            type="text"
            className={
              "form-control" +
              (errors.doctorId && touched.doctorId ? " is-invalid" : "")
            }
          />
          <ErrorMessage
            name="doctorId"
            component="div"
            className="invalid-feedback"
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="patientId">Patient ID</label>
          <Field
            name="patientId"
            type="text"
            className={
              "form-control" +
              (errors.patientId && touched.patientId ? " is-invalid" : "")
            }
          />
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

export default EditAppointment;
