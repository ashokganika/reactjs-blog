import React from 'react';
import Routing from './routing';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

// import { Login} from './components/login/login';
// // import { Register } from './components/register/register';

// export function App(props){
//     return(
//         <div>
//             <p>hi welcome to react application</p>
//             <h2>hi welcome to {props.title}</h2>
//             <p>this is my new skill tht i have acquired</p>
//             <p>enjoy the application</p>
//         </div>
//     )
// }


export class Apps extends React.Component {
    render(){
        return(
            <>
                <Routing/>
                <ToastContainer/>
            </>
        )
    }
}