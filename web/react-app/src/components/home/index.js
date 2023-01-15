import { Link } from "react-router-dom";

const Home = () => {
  const currentUser = localStorage.getItem("token");
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          textAlign: "center",
          backgroundImage:
            "url(https://i.pinimg.com/originals/41/66/5d/41665df6037592629ecd0c1e8833b463.jpg)",
          height: "fit-content",
          color: "white",
        }}
      >
        <div style={{ height: "88vh" }}>
          <h1 style={{ paddingTop: "135px" }}>Welcome to Zubcic Dental Clinic!</h1>
          <Link to="/appointments" className="btn btn-primary mx-3">
            Schedule na appointment 📆
          </Link>
          <Link to="/login" className="btn btn-success mx-3">
            {currentUser ? "My profile" : "Log in"} 👤
          </Link>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Home;
