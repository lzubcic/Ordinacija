import { authenticationService } from "./authentication.service";

const getAllAppointments = () => {
  const requestOptions = {
    method: "GET",
    headers: authenticationService.authHeader(),
  };
  return fetch(
    `${authenticationService.apiUrl}/api/appointment`,
    requestOptions
  ).then(authenticationService.handleResponse);
};

const getById = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authenticationService.authHeader(),
  };
  return fetch(
    `${authenticationService.apiUrl}/api/appointment/${id}`,
    requestOptions
  ).then(authenticationService.handleResponse);
};

const getByDoctorId = (doctorId) => {
  const requestOptions = {
    method: "GET",
    headers: authenticationService.authHeader(),
  };
  return fetch(
    `${authenticationService.apiUrl}/api/appointment?doctorId=${doctorId}`,
    requestOptions
  ).then(authenticationService.handleResponse);
};

const getByPatientId = (patientId) => {
  const requestOptions = {
    method: "GET",
    headers: authenticationService.authHeader(),
  };
  return fetch(
    `${authenticationService.apiUrl}/api/appointment?patientId=${patientId}`,
    requestOptions
  ).then(authenticationService.handleResponse);
};

const addAppointment = (
  appointmentType,
  appointmentStatus,
  schedule,
  description,
  doctorId,
  patientId
) => {
  const requestOptions = {
    method: "POST",
    headers: authenticationService.authHeaderWithContentType(),
    body: JSON.stringify({
      appointmentType,
      appointmentStatus,
      schedule,
      description,
      doctorId,
      patientId,
    }),
  };

  return fetch(
    `${authenticationService.apiUrl}/api/appointment`,
    requestOptions
  )
    .then(authenticationService.handleResponse)
    .then((appointment) => {
      return appointment;
    });
};

const updateAppointment = (
  id,
  appointmentType,
  appointmentStatus,
  schedule,
  description,
  doctorId,
  patientId
) => {
  const requestOptions = {
    method: "PUT",
    headers: authenticationService.authHeaderWithContentType(),
    body: JSON.stringify({
      id,
      appointmentType,
      appointmentStatus,
      schedule,
      description,
      doctorId,
      patientId,
    }),
  };

  return fetch(
    `${authenticationService.apiUrl}/api/appointment/${id}`,
    requestOptions
  )
    .then(authenticationService.handleResponse)
    .then((appointment) => {
      return appointment;
    });
};

const acceptAppointment = (id) => {
  const requestOptions = {
    method: "PUT",
    headers: authenticationService.authHeader(),
  };

  return fetch(
    `${authenticationService.apiUrl}/api/appointment/${id}/accept`,
    requestOptions
  )
    .then(authenticationService.handleResponse)
    .then((appointment) => {
      return appointment;
    });
};

const cancelAppointment = (id) => {
  const requestOptions = {
    method: "PUT",
    headers: authenticationService.authHeader(),
  };

  return fetch(
    `${authenticationService.apiUrl}/api/appointment/${id}/cancel`,
    requestOptions
  )
    .then(authenticationService.handleResponse)
    .then((appointment) => {
      return appointment;
    });
};

const deleteAppointment = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: authenticationService.authHeader(),
  };

  return fetch(
    `${authenticationService.apiUrl}/api/appointment/${id}`,
    requestOptions
  )
    .then(authenticationService.handleResponse)
    .then((appointment) => {
      return appointment;
    });
};

export const appointmentService = {
  getAllAppointments,
  getById,
  getByDoctorId,
  getByPatientId,
  addAppointment,
  updateAppointment,
  acceptAppointment,
  cancelAppointment,
  deleteAppointment,
};
