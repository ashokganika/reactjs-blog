import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';


const logout = () => {
    localStorage.clear();
}

const Navigate = () => {
    let authrorize = (localStorage.getItem('token')) 
        ? <>
            <li className="nav-item">
                        <Link to='/login'>
                            <button onClick={logout}>Logout</button>
                        </Link>
                    </li>
        </>
        :  <>
        <li className="nav-item">
        <Link to='/login'>Login</Link>
        </li>
        </>
    return (
        <> 
            
                    <ul className="navbar">
                    <li className="nav-item">
                        <Link  to='/'>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/contact'>Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/register'>Register</Link>
                    </li>
                    {authrorize}
                    
                    </ul>
              
        </>
    );
}

export default Navigate;