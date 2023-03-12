import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { authenticationService } from "../../services/authentication.service";

const StyledHeader = styled.header`
  align-items: center;
  min-height: 10vh;
  background-color: #0275d8;
  color: white;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledUl = styled.ul`
  width: 50%;
  margin-bottom: 0;
  list-style: none;
  font-size: 120%;
`;

const liStyle = {
  cursor: "pointer",
  float: "right",
  margin: "0 16px",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

const Header = ({ currentUser }) => {
  const token = localStorage.getItem("token");
  let user;
  if (token) {
    user = jwtDecode(token);
  }
  return (
    <StyledHeader className="p-3">
      <StyledContainer className="d-flex container">
        <h1>
          <Link style={linkStyle} to="/">
            Dental Clinic
          </Link>
        </h1>

        <StyledUl>
          {currentUser ? (
            <li style={liStyle}>
              <Link
                to="/"
                style={linkStyle}
                onClick={authenticationService.logout}
              >
                Log out
              </Link>
            </li>
          ) : (
            <li style={liStyle}>
              <Link style={linkStyle} to="/login">
                Log in
              </Link>
            </li>
          )}
          {user?.auth === "ROLE_USER" && (
            <li style={liStyle}>
              <Link style={linkStyle} to="/profile">
                My profile
              </Link>
            </li>
          )}
          {user?.auth === "ROLE_ADMIN" && (
            <>
              <li style={liStyle}>
                <Link style={linkStyle} to="/admin/users">
                  Users
                </Link>
              </li>
              <li style={liStyle}>
                <Link style={linkStyle} to="/admin/appointments">
                  Appointments
                </Link>
              </li>
            </>
          )}
          {user?.auth !== ("ROLE_ADMIN" || "ROLE_DOCTOR") && (
            <li style={liStyle}>
              <Link style={linkStyle} to="/contact">
                Contact us
              </Link>
            </li>
          )}
          {user?.auth === "ROLE_DOCTOR" && (
            <li style={liStyle}>
              <Link style={linkStyle} to="/appointments">
                Appointments
              </Link>
            </li>
          )}
          <li style={liStyle}>
            <Link style={linkStyle} to="/news">
              News
            </Link>
          </li>
          <li style={liStyle}>
            <Link style={linkStyle} to="/about">
              About
            </Link>
          </li>
        </StyledUl>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
