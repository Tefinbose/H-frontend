import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { editHabitApi } from "../services/allApi";
import { ToastContainer } from "react-toastify";

function Edit({ habit,  setUpdateStatus }) {
  const darkPurple = "rgb(87, 16, 87)";
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputData, setInputData] = useState({
    habitname: habit.habitname,
    category: habit.category,
    frequency: habit.frequency,
    userId: habit.userId,
  });

  useEffect(() => {
    if (habit) {
      setInputData({
        habitname: habit.habitname,
        category: habit.category,
        frequency: habit.frequency,
        userId: habit.userId,
      });
    }
  }, [habit]);

  //   edit api
  const handleUpdate = async () => {
    const result = await editHabitApi(habit.id, inputData);
    if (result.status >= 200 && result.status < 300) {
      //  alert("Updated  successfully! 😎");
      handleClose();
      
      setUpdateStatus(result.data);
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        className=" border-0 me-3 head-bg hover-edit"
        style={{ backgroundColor: "#f2e9ff" }}
      >
        <FontAwesomeIcon icon={faPen} />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="p-5 ">
            <input
              type="text"
              value={inputData.habitname}
              onChange={(e) =>
                setInputData({ ...inputData, habitname: e.target.value })
              }
              placeholder="Enter Habit Name"
              className="w-100 border p-2 rounded mb-3"
            />

            {/* Frequency Selector */}
            <div className="mb-3 d-flex ">
              <button
                className=" text-light "
                style={{ backgroundColor: darkPurple }}
              >
                Frequency
              </button>
              <select
                className="form-select"
                value={inputData.frequency}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
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
                value={inputData.category}
                onChange={(e) =>
                  setInputData({ ...inputData, category: e.target.value })
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
                <option value="Finance & Budgeting">Finance & Budgeting</option>
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
            className="text-light"
            style={{ backgroundColor: "rgb(118, 0, 164)"  }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default Edit;
