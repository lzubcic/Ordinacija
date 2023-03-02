import { authenticationService } from "./authentication.service";

const sendContactMail = ({ email, subject, message }) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email, subject, message }),
  };

  return fetch(`${authenticationService.apiUrl}/api/contact`, requestOptions)
    .then((resp) => {
      if (resp.ok) {
        window.alert("Message successfully sent! We will contact you soon.");
      }
    })
    .catch((err) => console.error(err));
};

export const contactService = {
  sendContactMail,
};
