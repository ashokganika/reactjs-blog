import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';


const logout = () => {
    localStorage.clear();
}

const Navigate = (props) => {
    let authrorize = (localStorage.getItem('token')) 
        ? <>
            <li className="nav-item">
                        <Link to='/login'>
                            <button  className="btn btn-info" onClick={logout}>Logout</button>
                        </Link>
                    </li>
        </>
        :  <>
        <li className="nav-item">
        <Link to='/login'><button  className="btn btn-info">Login</button></Link>
        </li>
        </>
        
    let LoginIn = localStorage.getItem('token') 
        ? ''
        :<li className="nav-item">
            <Link to='/register'><button  className="btn btn-info">Register</button></Link>
        </li>

    return (
        <> 
            
                    <ul className="navbar">
                    <li className="nav-item">
                        <Link  to='/'><button className="btn btn-info">Home</button></Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/profile'><button className="btn btn-info">Profile</button></Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/contact'><button className="btn btn-info">Contact</button></Link>
                    </li>
                    {LoginIn}
                    {authrorize}
                    
                    </ul>
              
        </>
    );
}

export default Navigate;