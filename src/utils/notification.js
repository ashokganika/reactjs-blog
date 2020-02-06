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
    console.log(err);
    debugger;
    let error = err.response;
    let msg = 'Something went wrong';
    msg = error && error.data && error.data.msg;
    showError(msg);
}

export default {
    showSuccess,
    showWarning,
    showInfo,
    errorHandler
}