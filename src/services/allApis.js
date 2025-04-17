import {commonApi} from "./commonApi"
import {serverurl} from "./serverUrl"

// add user api



// get user api
export const getUserApi = async () => {
    return await commonApi("GET", `${serverurl}/users`);
  };

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