import React from "react";
import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Logout({ setLoggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // console.log("button click");

    navigate("/");
    setLoggedInUser("");
  };

  const darkPurple = "rgb(87, 16, 87)";
  return (
    <>
      <div
        variant=""
        className="mb-3 py-2  rounded-pill  button"
        style={{  }}
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faRightFromBracket} style={{}} className="me-2" />
        Logout
      </div>
    </>
  );
}

export default Logout;
