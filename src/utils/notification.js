import {toast} from 'react-toastify';

function showSuccess(msg){
    toast.success(msg);
}

function showError(msg){
    toast.error(msg);
}

function showInfo(msg){
    toast.info(msg);
}

function showWarning(msg){
    toast.warn(msg);
}

function errorHandler(err){
    // console.log(err);
    debugger;
    let error = err.response || err || err.response.data;
    let msg;
    if(error && error.response && error.response.msg){
        msg = error.response.msg;
    }
    else if(error.msg){
        msg = error.msg;
    }
    else{
        msg = err.response.data.msg;
    }
    showError(msg || 'something wnet wrong');
}

export default {
    showSuccess,
    showWarning,
    showInfo,
    errorHandler
}