import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Table } from "react-bootstrap";
import { addXpApi, deleteLogApi, getAllHabitLogApi, getUserApi } from "../services/allApi";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
 
  Row,
  Col,
 
} from "react-bootstrap";
import { faLeaf } from "@fortawesome/free-solid-svg-icons/faLeaf";
import { faRocket } from "@fortawesome/free-solid-svg-icons/faRocket";
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons/faLaptopCode";
import { faQuestion } from "@fortawesome/free-solid-svg-icons/faQuestion";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import Logout from "./Logout";

function LogTable() {
  const location = useLocation();
  const { habit} = location.state || {};

  const [logData, setLogData] = useState([]);
  const [deleteLogStatus, setDeleteLogStatus] = useState({})
  const [logUser,setLogUser] = useState({})

  
 
  const darkPurple = "rgb(118, 0, 164)";
  const dark = "rgb(165, 115, 191)";
  const getUser = async () => {
          const result = await getUserApi();
          if (result.status >= 200 && result.status < 300) {
            const user = result.data.find((item) => item.id === habit.userId);
            setLogUser(user);
          }
        }; 

  const getlogdata = async()=>{
    //console.log(habit.id);
    
    const result =  await getAllHabitLogApi()
    // console.log(Object.keys(result.data)); // should include 'log'

   // console.log(result.data);
   // console.log(result.data.log);
   if (result.status >= 200 && result.status < 300) {
    const logDetails = result.data
      .filter((item) => item.habitid === habit.id)
      .map((item) => {
        const d = new Date(item.date);
        const formattedDate = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  
        const t = new Date(item.time);
        const hours = t.getHours();
        const minutes = String(t.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${((hours + 11) % 12 + 1)}:${minutes} ${ampm}`;
  
        return {
          ...item,
          date: formattedDate,
          time: formattedTime
        };
      });
    setLogData(logDetails);
  }
    
    
  }

  const handleDelete=async(id)=>{
  const result = await deleteLogApi(id)
  if  (result.status >= 200 && result.status < 300){
    alert("Deleted successfully! 😁");
      setDeleteLogStatus(result.data);
      const userXp = { ...logUser, xp: logUser.xp - 10 };
        const user = await addXpApi(logUser.id, userXp);
        if (user.status >= 200 && user.status < 300){
          // console.log(user.data);
          
      }
  }
  }



  useEffect(()=>{
    getlogdata()
    getUser()
  },[deleteLogStatus])


  return (
    <>
     <Row className="m-0 " style={{ minHeight: "100vh" }}>
          {/* Sidebar */}
          <Col
            md={3}
            className=" border-end d-none d-md-flex flex-column align-items-start py-4 px-3 "
            style={{ backgroundColor: darkPurple }}
          >
            <h2 className=" fw-bold mb-4 title">
              <FontAwesomeIcon icon={faLeaf} className="me-1 " />
              Habit<span className="text-light">Quest</span>
            </h2>

            <div
              variant=""
              className="mb-3  py-2 rounded-pill w-100 curser-pointer button"
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
              className="mb-3  py-2  rounded-pill w-100 button"
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
              className="mb-3  py-2  rounded-pill w-100 button"
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
              className="mb-3  py-2  rounded-pill w-100 button"
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
            <Logout  />

            
          </Col>

          <Col md={9}>
          <div className="py-5 md:p-5">
        <div className="d-flex justify-content-between align-items-center mx-5">
          <h2 className="fs-3 fw-bold head-bg">😎 {habit?.habitname }</h2>
          <Link to="/habit" state={{habit}}>
            <button className="bg-warning text-black px-4 py-2 rounded">
              Back
            </button>
          </Link>
        </div>

        
        <div className="table-container">
      <Table striped hover bordered responsive>
        <thead className="table">
          <tr>
            <th>SI</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody  className="table">
          {logData.length > 0 ? (
            logData.map((item, index) => (
              <tr key={item.id || index}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>
                <FontAwesomeIcon icon={faTrash} className="delete-icon"
                onClick={() => handleDelete(item.id)}/>
                
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No logs available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
       </div>
          </Col>
          </Row>
     

    </>
  );
}

export default LogTable;