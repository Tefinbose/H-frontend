import { commonApi } from "./commonApi";
import { serverurl } from "./serverurl";

// register api
export const registerUserApi = async (reqBody) => {
  return await commonApi("POST", `${serverurl}/user`, reqBody);
};

//   get user
export const getUserApi = async () => {
  return await commonApi("GET", `${serverurl}/user`);
};


// post user register
export const postUserApi = async(reqBody)=>{
  return await commonApi("POST", `${serverurl}/user`, reqBody)
}



// add habit api
export const addHabitApi = async (reqBody) => {
  return await commonApi("POST", `${serverurl}/habits `, reqBody);
};

// get habit api
export const getHabitApi = async () => {
  return await commonApi("GET", `${serverurl}/habits `);
};

// delete habit api
export const deleteHabitApi = async(id) =>{
  return await commonApi('DELETE', `${serverurl}/habits/${id} `, {})
}

// edit habit api
export const editHabitApi = async (id, editedHabit) => {
  return await commonApi('PUT', `${serverurl}/habits/${id}`, editedHabit);
};

// get habit log api
export const getHabitLogApi = async (id) => {
  return await commonApi("GET", `${serverurl}/habits/${id} `);
};

//to add log 
export const addLogApi = async (reqBody) => {
  return await commonApi("POST", `${serverurl}/log `, reqBody);
};
// get all log data api
export const getAllLogApi = async () => {
  return await commonApi("GET", `${serverurl}/log `);
};

// get habit log api
export const getAllHabitLogApi = async () => {
  return await commonApi("GET", `${serverurl}/log `);
};

// delete habit api
export const deleteLogApi = async(id) =>{
  return await commonApi('DELETE', `${serverurl}/log/${id} `, {})
}

// add xp api
export const addXpApi = async (id, userXp) => {
  return await commonApi('PUT', `${serverurl}/user/${id}`, userXp);
};

// get motivation quotes api
export const getMotivationApi = async () => {
  return await commonApi("GET", `${serverurl}/motivations`);
};


