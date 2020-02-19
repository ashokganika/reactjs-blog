import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

export const SideBarComponent = () => {
    return (
        <>  
            
                <div className="d-flex sidebar" id="wrapper">
                <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="list-group list-group-flush">
                            <Link to='/view-feed' className="list-group-item list-group-item-action bg-light">View-Blog</Link>
                            <Link to='/add-feed' className="list-group-item list-group-item-action bg-light">Add-Blog</Link>
                            <Link to='/profile/:name' className="list-group-item list-group-item-action bg-light">Profile</Link>
                            <Link to='/search' className="list-group-item list-group-item-action bg-light">Search</Link>
                            <Link to='/chat' className="list-group-item list-group-item-action bg-light">Chat</Link>
                            
                        </div>
                    </div>
                </div>
            

           
        </>

    )
}