import { authenticationService } from "./authentication.service";

const getUser = () => {
  const requestOptions = {
    method: "GET",
    headers: authenticationService.authHeader(),
  };
  return fetch(
    `${authenticationService.apiUrl}/api/users/current-user`,
    requestOptions
  ).then(authenticationService.handleResponse);
};

const getById = (id) => {
  const requestOptions = {
    method: "GET",
    headers: authenticationService.authHeader(),
  };
  return fetch(
    `${authenticationService.apiUrl}/api/users/${id}`,
    requestOptions
  ).then((res) => res.json());
};

const getAllUsers = () => {
  const requestOptions = {
    method: "GET",
    headers: authenticationService.authHeader(),
  };
  return fetch(
    `${authenticationService.apiUrl}/api/users`,
    requestOptions
  ).then(authenticationService.handleResponse);
};

const getAllDoctors = () => {
  const requestOptions = {
    method: "GET",
    headers: authenticationService.authHeader(),
  };
  return fetch(`${authenticationService.apiUrl}/api/users`, requestOptions)
    .then(authenticationService.handleResponse)
    .then((users) =>
      users.filter((user) =>
        user.authorities.some((auth) => auth === "ROLE_DOCTOR")
      )
    );
};

const getAllPatients = () => {
  const requestOptions = {
    method: "GET",
    headers: authenticationService.authHeader(),
  };
  return fetch(`${authenticationService.apiUrl}/api/users`, requestOptions)
    .then(authenticationService.handleResponse)
    .then((users) =>
      users.filter((user) =>
        user.authorities.some((auth) => auth === "ROLE_USER")
      )
    );
};

const addUser = (username, password, firstName, lastName) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username, password, firstName, lastName }),
  };

  return fetch(`${authenticationService.apiUrl}/api/users`, requestOptions)
    .then(authenticationService.handleResponse)
    .then((user) => {
      return user;
    });
};

const updateUser = (id, username, password, firstName, lastName) => {
  const currentUser = localStorage.getItem("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${currentUser}`,
    },
    body: JSON.stringify({ id, username, password, firstName, lastName }),
  };

  return fetch(
    `${authenticationService.apiUrl}/api/users/${id}`,
    requestOptions
  )
    .then(authenticationService.handleResponse)
    .then((user) => {
      return user;
    });
};

const deleteUser = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: authenticationService.authHeader(),
  };
  return fetch(
    `${authenticationService.apiUrl}/api/users/${id}`,
    requestOptions
  )
    .then(authenticationService.handleResponse)
    .then((user) => {
      return user;
    });
};

export const userService = {
  getUser,
  getAllUsers,
  getAllDoctors,
  getAllPatients,
  getById,
  addUser,
  updateUser,
  deleteUser,
};
