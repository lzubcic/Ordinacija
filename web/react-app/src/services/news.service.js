import {authenticationService} from "./authentication.service";

const addNews = (title, description, image) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, description, image }),
    };

    return fetch(`${authenticationService.apiUrl}/api/news`, requestOptions)
        .then(authenticationService.handleResponse)
        .then((news) => {
            return news;
        });
};

const updateNews = (id, title, description, image) => {
    const currentUser = localStorage.getItem("token");
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${currentUser}`,
        },
        body: JSON.stringify({ id, title, description, image }),
    };

    return fetch(`${authenticationService.apiUrl}/api/news/${id}`, requestOptions)
        .then(authenticationService.handleResponse)
        .then((news) => {
            return news;
        });
};

const deleteNews = (id) => {
    const requestOptions = {
        method: "DELETE",
        headers: authenticationService.authHeader(),
    };
    return fetch(`${authenticationService.apiUrl}/api/news/${id}`, requestOptions)
        .then(authenticationService.handleResponse)
        .then((news) => {
            return news;
        });
};

export const newsService = {
    addNews,
    updateNews,
    deleteNews,
};