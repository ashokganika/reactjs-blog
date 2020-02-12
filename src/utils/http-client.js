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

function post(url, data, isSecure, params){
    return http.post(url, data, {headers:getHeader(isSecure), params})
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

function upload({url, method, file, data}){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        
        if(file && file.length) {
            formData.append('img', file[0], file[0].name);
        }

        for (let key in data){
            formData.append(key, data[key]);
        }
        
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    // console.log("respone is ready and it is okay>>> ",xhr.response);
                    resolve(xhr.response);
                }
                else{
                    // console.log("respone is ready>>> ",xhr.response);
                    reject(xhr.response);
                }
            }    
        }

        xhr.open(method, url, true);
        xhr.send(formData);
    })
}

export default {
    post,
    get,
    edit,
    delete:remove,
    upload
    
}