import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { addHabitApi } from "../services/allApis";
import { ToastContainer, toast } from "react-toastify";

function AddHabit({ loggedInUser, setAddHabitStatus }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setHabitdetails({ habitname: "", frequency: "", category: "" });
  };

  const handleShow = () => setShow(true);

  // state to store habits details
  const [habitdetails, setHabitdetails] = useState({
    habitname: "",
    frequency: "",
    category: "",
  });

  //   add habit api
  const handleSubmit = async () => {
    const { habitname, frequency, category } = habitdetails;

    if (!habitname || !frequency || !category) {
      toast.error("please fill the details completely!");
    } else {
      if (!loggedInUser) {
        toast.error("User not logged in");
        return;
      }
      //   store habit details and userid of login user
      const newHabit = {
        ...habitdetails,
        userId: loggedInUser.id,
      };

      const result = await addHabitApi(newHabit);

      if (result.status >= 200 && result.status < 300) {
        // alert("Habit added successfully! 😃");
        setAddHabitStatus(result.data);
        handleClose();
        setHabitdetails({ habitname: "", frequency: "", category: "" });
      }
    }
  };

  return (
    <>
      <div>
        <Button
          onClick={handleShow}
          variant=""
          className=" px-4 py-2 text-white mot-bg"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add a Habit
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold ">Add Habit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-5 ">
              <input
                type="text"
                value={habitdetails.habitname}
                onChange={(e) => {
                  const value = e.target.value;
                  const capitalized =
                    value.charAt(0).toUpperCase() + value.slice(1);
                  setHabitdetails({
                    ...habitdetails,
                    habitname: capitalized,
                  });
                }}
                placeholder="Enter Habit Name"
                className="w-100 border p-2 rounded mb-3"
              />

              {/* Frequency Selector */}
              <div className="mb-3 d-flex ">
                <button className=" text-light common-purple border-0 ">
                  Frequency
                </button>
                <select
                  className="form-select"
                  value={habitdetails.frequency}
                  onChange={(e) =>
                    setHabitdetails({
                      ...habitdetails,
                      frequency: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    -- Select--
                  </option>
                  <option value="Daily" data-info="Repeat every day">
                    Daily
                  </option>
                  <option value="Weekly" data-info="Repeat once a week">
                    Weekly
                  </option>
                  <option value="Occasionally" data-info="Repeat on occasion">
                    Occasionally
                  </option>
                </select>
              </div>

              {/* Category Selector */}
              <div className="mb-3">
                <select
                  className="form-select"
                  value={habitdetails.category}
                  onChange={(e) =>
                    setHabitdetails({
                      ...habitdetails,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    -- Select a Category --
                  </option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Mental Health">Mental Health</option>
                  <option value="Personal Development">
                    Personal Development
                  </option>
                  <option value="Daily Routine">Daily Routine</option>
                  <option value="Morning Routine">Morning Routine</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Focus & Concentration">
                    Focus & Concentration
                  </option>
                  <option value="Work & Career">Work & Career</option>
                  <option value="Learning & Education">
                    Learning & Education
                  </option>
                  <option value="Reading">Reading</option>
                  <option value="Time Management">Time Management</option>
                  <option value="Hobbies & Creativity">
                    Hobbies & Creativity
                  </option>
                  <option value="Music & Arts">Music & Arts</option>
                  <option value="Writing & Journaling">
                    Writing & Journaling
                  </option>
                  <option value="Spirituality">Spirituality</option>
                  <option value="Meditation & Mindfulness">
                    Meditation & Mindfulness
                  </option>
                  <option value="Sleep & Recovery">Sleep & Recovery</option>
                  <option value="Finance & Budgeting">
                    Finance & Budgeting
                  </option>
                  <option value="Healthy Eating">Healthy Eating</option>
                  <option value="Relationships & Social">
                    Relationships & Social
                  </option>
                  <option value="Digital Detox">Digital Detox</option>
                  <option value="Minimalism">Minimalism</option>
                </select>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant=""
              onClick={handleSubmit}
              className="text-light "
              style={{ backgroundColor: "rgb(118, 0, 164)" }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default AddHabit;
