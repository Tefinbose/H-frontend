import React from "react";
import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Logout({ setLoggedInUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    setLoggedInUser("");
  };

  return (
    <>
      <div
        variant=""
        className="mb-3 py-2 cursor-pointer rounded-pill  button"
        style={{}}
        onClick={handleLogout}
      >
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{}}
          className="me-2"
        />
        Logout
      </div>
    </>
  );
}

export default Logout;
