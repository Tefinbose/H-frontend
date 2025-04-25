
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Table,
  ProgressBar,
  Offcanvas,
} from "react-bootstrap";
import AddHabit from "./AddHabit";
import { useState, useEffect } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { deleteHabitApi,  getHabitApi, getMotivationApi, getUserApi } from "../services/allApi";
import Logout from "./Logout";
import Edit from "./Edit";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons/faLaptopCode";
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";



function Dashboard({ loggedInUser, setLoggedInUser }) {
  const darkPurple = "rgb(118, 0, 164)";
  const dark = "rgb(165, 115, 191)";
  // console.log(loggedInUser);

  const [showSidebar, setShowSidebar] = useState(false);

 

  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  // to store habits
  const [habits, setHabits] = useState([]);

  // add habit status
  const [addHabitStatus, setAddHabitStatus] = useState({});

  // delete status
  const [deleteStatus, setDeleteStatus] = useState({});

  // update status
  const [updateStatus, setUpdateStatus] = useState({});
  // const [level, setLevel] = useState(0);
  // const [xp, setXp] = useState(0);

 // get user data
//  const fetchUserData = async () => {
//   const result = await getUserApi()
//   if (result.status >= 200 && result.status < 300) {
//     // to get habits of loggedin user
//     const userDetails = result.data.filter(
//       (user) => user.id === loggedInUser.id
//     );
//     setLevel(Math.floor(userDetails.xp/100))
//     setXp(userDetails.xp - (level*100))
//   }
// };

let level = (Math.floor(loggedInUser.xp/100))
let xp = (loggedInUser.xp - (level*100))


  
  
  //date
  const date = new Date();

  const getDayWithSuffix = (day) => {
    if (day > 3 && day < 21) return day + "th";
    switch (day % 10) {
      case 1: return day + "st";
      case 2: return day + "nd";
      case 3: return day + "rd";
      default: return day + "th";
    }
  };

  const day = getDayWithSuffix(date.getDate());
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const weekday = date.toLocaleString("default", { weekday: "long" });

 
  const fullDate = `${day} ${month} ${year} ${weekday}`;


  // get habit data
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
  // console.log(habits);

  // generate random motivation
  const [paragraph, setParagraph] = useState("");

  const fetchRandomParagraph = async () => {
    const result = await getMotivationApi();

    const data = result.data;

    if (data?.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);

      setParagraph(data[randomIndex].text);
    }
  };

  // delete habit
  const deleteHabit = async (id) => {
    const result = await deleteHabitApi(id);
    if (result.status >= 200 && result.status < 300) {
      alert("Habit deleted successfully! 😁");
      setDeleteStatus(result.data);
    }
  };

  useEffect(() => {
    
      fetchUserHabits();
      fetchRandomParagraph()
   
  }, [ addHabitStatus, deleteStatus, updateStatus,loggedInUser]);

  return (
    <>
      <Container fluid className="p-0">
        {/* Top Header */}
        <div
          className="text-white d-flex d-md-none justify-content-between align-items-center  py-3  px-4 "
          style={{ backgroundColor: darkPurple }}
        >
          <h2 className=" fw-bold  title">
            <FontAwesomeIcon icon={faLeaf} className="me-1 " />
            Habit<span className="text-light">Quest</span>
          </h2>

          {/* small screem button */}
          <Button
            variant=""
            className=" d-md-none text-light"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </Button>
        </div>

        <Row className="m-0 " style={{ minHeight: "100vh" }}>
          {/* Sidebar */}
          <Col
            md={2}
            className=" border-end d-none d-md-flex flex-column align-items-start py-4 px-3 "
            style={{ backgroundColor: darkPurple }}
          >
            <h2 className=" fw-bold mb-4 title">
              <FontAwesomeIcon icon={faLeaf} className="me-1 " />
              Habit<span className="text-light">Quest</span>
            </h2>

            <Link to={'/motivation'} style={{textDecoration:"none"}}>
              <div
                variant=""
                className="mb-3  py-2 text-white rounded-pill w-100 curser-pointer"
                style={{}}
              >
                <FontAwesomeIcon
                  icon={faRocket}
                  style={{ color: "#fafafa" }}
                  className="me-2"
                />
                Motivation
              </div>
            </Link>
            <Link to={'/leaderboard'} style={{textDecoration:"none"}}>
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
            </Link>

            <Link to={'/faqs'} style={{textDecoration:"none"}}>
              <div
                className="mb-3  py-2 text-white rounded-pill w-100"
                style={{}}
              >
                <FontAwesomeIcon
                  icon={faQuestion}
                  style={{ color: "#ffffff" }}
                  className="me-2"
                />
                FAQs
              </div>
            </Link>

            <Link to={'/developers'} style={{textDecoration:"none"}}>
              <div
                variant=""
                className="mb-3  py-2 text-white rounded-pill w-100"
                style={{textDecoration:"none"}}
              >
                <FontAwesomeIcon
                  icon={faLaptopCode}
                  style={{ color: "#ffffff" }}
                  className="me-2"
                />
                Developers
              </div>
            </Link>

            {/* logout button */}
            <Logout setLoggedInUser={setLoggedInUser} />

            
          </Col>

          {/* Mobile Sidebar */}
          <Offcanvas
            show={showSidebar}
            onHide={handleClose}
            placement="start"
            style={{ backgroundColor: darkPurple }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="text-light">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column">
            <Link to={'/motivation'} style={{textDecoration:"none"}}>
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
              </Link>
              <Link to={'/leaderboard'}>
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
              </Link>
              <Link to={'/faqs'} style={{textDecoration:"none"}}>
              <div
                className="mb-3  py-2 text-white rounded-pill w-100"
                style={{}}
              >
                <FontAwesomeIcon
                  icon={faQuestion}
                  style={{ color: "#ffffff" }}
                  className="me-2"
                />
                FAQs
              </div>
              </Link>

              <Link to={'/developers'} style={{textDecoration:"none"}}>
                <div
                  variant=""
                  className="mb-3  py-2 text-white rounded-pill w-100"
                  style={{textDecoration:"none"}}
                >
                  <FontAwesomeIcon
                    icon={faLaptopCode}
                    style={{ color: "#ffffff",textDecoration:"none" }}
                    className="me-2"
                  />
                  Developers
                </div>
              </Link>

              <Logout setLoggedInUser={setLoggedInUser} />
            </Offcanvas.Body>
          </Offcanvas>

          {/* Center Section */}
          <Col xs={12} md={8} className="p-4 bg-middle">
          <div
              className="mot-bg rounded p-4 text-light"
              style={{
                backgroundImage: 'url(https://mindsparklemag.com/wp-content/uploads/2020/11/80004f68741469.5bae1b8424f4c.jpg)',
                backgroundSize: "cover",
                backgroundPosition: "center",

                height: "300px",
              }}
            >
              <p className="fs-3"><strong>{fullDate}</strong></p>
              <h5 className="mt-5 pt-3 mb-3">
                {paragraph}
              </h5>
              <p>
                <strong>Note:</strong> HabitQuest supports tracking positive habits only. Instead of tracking bad habits, <br /> an alternative is to rephrase your habit in a positive way.
              </p>
            </div>

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
                      className="text-light"
                      style={{ backgroundColor: "rgb(118, 0, 164)" }}
                    >
                      Sl. No.
                    </th>
                    <th
                      className="text-light"
                      style={{ backgroundColor: "rgb(118, 0, 164)" }}
                    >
                      Habit
                    </th>
                    <th
                      className="text-light"
                      style={{ backgroundColor: "rgb(118, 0, 164)" }}
                    >
                      Categories
                    </th>
                    <th
                      className="text-light"
                      style={{ backgroundColor: "rgb(118, 0, 164)" }}
                    >
                      Frequency
                    </th>
                    <th
                      className="text-light"
                      style={{ backgroundColor: "rgb(118, 0, 164)"}}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                {/* body */}
                <tbody className="">
                  {habits?.length > 0 ? (
                    habits?.map((habit, index) => (
                      <tr key={index} className="fw-bold">
                        <td
                          className=" head-bg"
                          style={{ backgroundColor: "#f2e9ff" }}
                        >
                          {index + 1}
                        </td>
                        
                          <td
                            className=" head-bg"
                            style={{ backgroundColor: "#f2e9ff" }}
                          >
                            <Link to={'/habit'}  state={{habit}}>
                            {habit?.habitname} </Link>
                          </td>
                       
                        <td
                          className="text-nowrap head-bg"
                          style={{ backgroundColor: "#f2e9ff" }}
                        >
                          {habit?.category}
                        </td>
                        <td
                          className=" head-bg"
                          style={{ backgroundColor: "#f2e9ff" }}
                        >
                          {habit?.frequency}
                        </td>
                        <td
                          style={{ backgroundColor: "#f2e9ff" }}
                          className="d-flex justify-content-center head-bg "
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
                            className=" border-0 hover-delete head-bg"
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
                        className="text-center fs-3  fw-bold" style={{color:'darkviolet'}}
                      >
                        No Habits added
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>

          {/* Right Sidebar */}
          <Col xs={12} md={2} className="p-4 border-start text-center right-bg">
            <h4>
              <strong>{loggedInUser.name}</strong>
            </h4>
            <div className="d-flex justify-content-center w-100">
              <Card
                className="mb-3 rounded-circle overflow-hidden"
                style={{ width: "100px", height: "100px" }}
              >   
              {(loggedInUser.gender == "male") ? <Card.Img
                  variant="top"
                  src="https://png.pngtree.com/png-clipart/20240614/original/pngtree-cute-young-boy-cartoon-character-png-image_15328125.png"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                /> : <Card.Img
                variant="top"
                src="https://png.pngtree.com/png-vector/20241011/ourmid/pngtree-d-cartoon-cute-girl-face-logo-with-soft-features-on-transparent-png-image_14065800.png"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              /> } 
                
              </Card>
            </div>
            <div className="text-center">
              <p>
                <strong>Level {level}</strong>
              </p>
              <ProgressBar
                now={xp}
                style={{ backgroundColor: "#f1caff" }}
                variant="custom-purple"
              />
              <p>
                <strong>{xp}/100</strong>
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default Dashboard;
