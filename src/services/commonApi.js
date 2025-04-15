import axios from "axios"


export const commonApi = async (httpMethod, url, reqBody) => {
    const reqConfig = {  
        method :httpMethod,
        url,
        data : reqBody,
        headers : {"Content-Type" : "application/json"} //there is no uploaded content, only typed input
    } 

    return await axios(reqConfig).then((res) => { 
        return res
    }).catch ((err) => {
        return err
})
}