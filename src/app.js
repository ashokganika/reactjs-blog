import React from 'react';
// import { Login} from './components/login/login';
import { Register } from './components/register/register';

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
                <Register/>
            </>
        )
    }
}