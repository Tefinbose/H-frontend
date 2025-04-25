import axios from "axios"

export const commonApi = async(httpMethod,url,reqBody)=>{

    const reqConfig ={
        method: httpMethod,
        url ,
        data: reqBody,
        headers:{"content-Type":"application/json"} //there is no uploaded content
    }

    return await axios(reqConfig).then((res)=>{ // based on promise- resolve
        return res 
    }).catch((err)=>{ //reject
        return err
    })
}