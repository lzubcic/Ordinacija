import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(localStorage.getItem("token"));

const apiUrl = "http://localhost:8080";

// Set Authorization header with Bearer token
const authHeader = () => {
  const currentUser = localStorage.getItem("token");
  if (currentUser) {
    return { Authorization: `Bearer ${currentUser}` };
  } else {
    return {};
  }
};

const authHeaderWithContentType = () => {
  const currentUser = localStorage.getItem("token");
  if (currentUser) {
    return {
      "Content-type": "application/json",
      Authorization: `Bearer ${currentUser}`,
    };
  } else {
    return {};
  }
};

// Response handler
const handleResponse = (response) => {
  return response.text().then((text) => {
    if (text === "Username already exists") {
      return Promise.reject("Username already exists");
    }
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        logout();
      }
      if (data?.apierror?.message === "Bad credentials") {
        return Promise.reject("Incorrect username or password");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

// Authenticate user
const login = (username, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${apiUrl}/api/authenticate`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("token", user.token);
      currentUserSubject.next(user);

      return user;
    });
};

function logout() {
  localStorage.removeItem("token");
  currentUserSubject.next(null);
}

export const authenticationService = {
  login,
  logout,
  authHeader,
  authHeaderWithContentType,
  handleResponse,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  apiUrl,
};
