import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import { Container, Row, Col, Button, Table, Offcanvas } from "react-bootstrap";
import AddHabit from "./AddHabit";
import { useState, useEffect } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { deleteHabitApi, getHabitApi } from "../services/allApis";
import Logout from "./Logout";
import Edit from "./Edit";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons/faLaptopCode";
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";

function Dashboard({ loggedInUser, setLoggedInUser }) {
  //   console.log(loggedInUser);

  // sidebar
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  // to store habits
  const [habits, setHabits] = useState([]);

  // add habit status
  const [addHabitStatus, setAddHabitStatus] = useState({});

  // delete habit status
  const [deleteStatus, setDeleteStatus] = useState({});

  // update habit status
  const [updateStatus, setUpdateStatus] = useState({});

  // get habit data api
  const fetchUserHabits = async () => {
    const result = await getHabitApi();
    if (result.status >= 200 && result.status < 300) {
      // to get habits of loggedin user
      const userHabits = result.data.filter(
        (habit) => habit.userId === loggedInUser.id
      );
      setHabits(userHabits);
    }
  };

  // delete habit api
  const deleteHabit = async (id) => {
    const result = await deleteHabitApi(id);
    if (result.status >= 200 && result.status < 300) {
      alert("Habit deleted successfully! 😁");
      setDeleteStatus(result.data);
    }
  };

  useEffect(() => {
    fetchUserHabits();
  }, [addHabitStatus, deleteStatus, updateStatus]);

  return (
    <>
      <Container fluid className="p-0">
        {/* Top Header on small screen */}
        <div className="text-white d-flex d-md-none justify-content-between align-items-center  py-3  px-4 common-purple ">
          <h2 className=" fw-bold  title">
            <FontAwesomeIcon icon={faLeaf} className="me-1 " />
            Habit<span className="text-light">Quest</span>
          </h2>

          {/* small screem offcanvas button */}
          <Button
            variant=""
            className=" d-md-none text-light"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </Button>
        </div>

        <Row className="m-0 " style={{ minHeight: "100vh" }}>
          {/* left side section only visible in large screen   */}
          <Col
            md={2}
            className=" common-purple border-end d-none d-md-flex flex-column align-items-start py-4 px-3 "
          >
            <h2 className=" fw-bold mb-4 title">
              <FontAwesomeIcon icon={faLeaf} className="me-1 " />
              Habit<span className="text-light">Quest</span>
            </h2>

            <div
              variant=""
              className="mb-3 cursor-pointer py-2 text-white rounded-pill w-100"
              style={{}}
            >
              <FontAwesomeIcon
                icon={faRocket}
                style={{ color: "#fafafa" }}
                className="me-2"
              />
              Motivation
            </div>
            <div
              variant=""
              className="mb-3 cursor-pointer  py-2 text-white rounded-pill w-100"
              style={{}}
            >
              <FontAwesomeIcon
                icon={faChartSimple}
                style={{ color: "#ffffff" }}
                className="me-2"
              />
              Leaderboard
            </div>

            <div
              className="mb-3 cursor-pointer  py-2 text-white rounded-pill w-100"
              style={{}}
            >
              <FontAwesomeIcon
                icon={faQuestion}
                style={{ color: "#ffffff" }}
                className="me-2"
              />
              FAQs
            </div>

            <div
              variant=""
              className="mb-3 cursor-pointer  py-2 text-white rounded-pill w-100"
              style={{}}
            >
              <FontAwesomeIcon
                icon={faLaptopCode}
                style={{ color: "#ffffff" }}
                className="me-2"
              />
              Developers
            </div>

            {/* logout button */}
            <Logout setLoggedInUser={setLoggedInUser} />
          </Col>

          {/* Mobile Sidebar left side section */}
          <Offcanvas
            show={showSidebar}
            onHide={handleClose}
            placement="start"
            className="common-purple"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="text-light">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column">
              <div
                variant=""
                className="mb-3  py-2 text-white rounded-pill w-100"
                style={{}}
              >
                <FontAwesomeIcon
                  icon={faRocket}
                  style={{ color: "#fafafa" }}
                  className="me-2"
                />
                Motivation
              </div>
              <div
                variant=""
                className="mb-3  py-2 text-white rounded-pill w-100"
                style={{}}
              >
                <FontAwesomeIcon
                  icon={faChartSimple}
                  style={{ color: "#ffffff" }}
                  className="me-2"
                />
                Leaderboard
              </div>

              <div className="mb-3  py-2 text-white rounded-pill w-100">
                <FontAwesomeIcon
                  icon={faQuestion}
                  style={{ color: "#ffffff" }}
                  className="me-2"
                />
                FAQs
              </div>

              <div
                variant=""
                className="mb-3  py-2 text-white rounded-pill w-100"
              >
                <FontAwesomeIcon
                  icon={faLaptopCode}
                  style={{ color: "#ffffff" }}
                  className="me-2"
                />
                Developers
              </div>

              <Logout setLoggedInUser={setLoggedInUser} />
            </Offcanvas.Body>
          </Offcanvas>

          {/* Center Section */}
          <Col xs={12} md={8} className="p-4 bg-middle">
            <div className="mot-bg rounded p-4 text-light">
              {/* motivation section */}
            </div>

            {/* habit table section*/}
            <div className="d-flex  align-items-center w-100 mt-4 flex-wrap gap-2">
              <h3 className="me-auto fw-bold" style={{ color: "#430361" }}>
                Habits
              </h3>
              <AddHabit
                loggedInUser={loggedInUser}
                setAddHabitStatus={setAddHabitStatus}
              />
            </div>

            <div className="table-responsive">
              <Table bordered className="text-center mt-4 overflow-auto">
                <thead>
                  <tr>
                    <th
                      className="text-light "
                      style={{ backgroundColor: "rgb(118, 0, 164)" }}
                    >
                      Sl. No.
                    </th>
                    <th
                      className="text-light "
                      style={{ backgroundColor: "rgb(118, 0, 164)" }}
                    >
                      Habit
                    </th>
                    <th
                      className="text-light "
                      style={{ backgroundColor: "rgb(118, 0, 164)" }}
                    >
                      Categories
                    </th>
                    <th
                      className="text-light "
                      style={{ backgroundColor: "rgb(118, 0, 164)" }}
                    >
                      Frequency
                    </th>
                    <th
                      className="text-light "
                      style={{ backgroundColor: "rgb(118, 0, 164)" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                {/* body */}
                <tbody className="">
                  {habits?.length > 0 ? (
                    habits?.map((habit, index) => (
                      <tr key={index} className="fw-bold ">
                        <td style={{ backgroundColor: "#f2e9ff" }}>
                          {index + 1}
                        </td>
                        <td style={{ backgroundColor: "#f2e9ff" }}>
                          {habit?.habitname}
                        </td>
                        <td
                          className="text-nowrap"
                          style={{ backgroundColor: "#f2e9ff" }}
                        >
                          {habit?.category}
                        </td>
                        <td style={{ backgroundColor: "#f2e9ff" }}>
                          {habit?.frequency}
                        </td>
                        <td
                          style={{ backgroundColor: "#f2e9ff" }}
                          className="d-flex justify-content-center "
                        >
                          <Edit
                            habit={habit}
                            setUpdateStatus={setUpdateStatus}
                          />
                          <button
                            style={{ backgroundColor: "#f2e9ff" }}
                            onClick={() => {
                              deleteHabit(habit?.id);
                            }}
                            className=" border-0 hover-delete"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center text-danger fs-1  fw-bold"
                      ></td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>

          {/* Right Sidebar */}
          <Col xs={12} md={2} className="p-4 border-start text-center right-bg">
            {/* right side section */}
          </Col>
        </Row>
      </Container>

      {/* toastify */}
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default Dashboard;
