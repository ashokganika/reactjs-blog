import React from 'react';
import './dashboard.css';

class Dashboard extends React.Component {
    constructor(){
        super();
        
         this.user = JSON.parse(localStorage.getItem('user'));
    }

    render() { 
       let name = this.user
                ? this.user.username
                : 'welcome '
        return (
            
           
           <>
           <h5><strong>Welcome to Dashboard {name} </strong></h5>
           </>

          );
    }
}
 
export default Dashboard;