import Axios from "axios";



function getHeader(isSecure=false){
    let headers;
    if(isSecure){
        headers = {
            'Content-Type' : 'application/json',
            'Authorization' : localStorage.getItem('token')
        }
    }
    else
    {
          headers= {
            'Content-Type' : 'application/json'
          }
    }
    return headers;
    
}

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://group19-api.herokuapp.com/api'


const http = Axios.create({
   baseURL : BASE_URL,
   ResponseType:'json'
})

function post(url, data, isSecure){
    return http.post(url, data, {headers:getHeader(isSecure)})
}

function get(url, isSecure){
    return http.get(url, {headers:getHeader(isSecure)})
}

function edit(url, data, isSecure){
    return http.put(url, data, {headers:getHeader(isSecure)})
}

function remove(url, isSecure){
    return http.delete(url, {headers:getHeader(isSecure)})
}

// fucntion upload({url, method, file, data}){

// }

export default {
    post,
    get,
    edit,
    delete:remove,
    
}