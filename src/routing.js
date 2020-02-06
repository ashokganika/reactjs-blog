import React from 'react';
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import NavBar from './components/Header/navBar';
import Profile from './components/profile/profile';
import Dashboard from './components/dashboard/dashboard';
import { SideBarComponent } from './components/sidebar/sidebar';
import AddFeed from './components/feeds/addfeed/addfeed';
import ViewFeed from './components/feeds/viewfeed/viewFeeds';
import EditFeed from './components/feeds/editfeed/editfeed';


// const Home = () => {
//     return (
//         <>
//             <h2 style={{textAlign:"center"}}>Recent Blogs</h2>
//             <ViewFeed></ViewFeed><br></br>
//             <ViewFeed></ViewFeed><br></br>
//             <ViewFeed></ViewFeed><br></br>
//             <ViewFeed></ViewFeed><br></br>

//         </>
//     )
// }

const Contact = (props) => {
    console.log(props);
    return (
        <>
            <h2>Welcome To Contactpage</h2>
        </>
    )
}



const PageNotFound = () => {
    return (
        <>
            <h2>Page not found</h2>
        </>
    )
}

const ProtectedRoute = ({component:Component, ...rest}) => {
    
    return (
        <Route path={rest.path} render={(props) => (
           
            localStorage.getItem('token')
            ? <div><NavBar/><SideBarComponent/><Component {...props}></Component></div>
            :
            <Redirect to='/login'></Redirect>
        )}>
        </Route>
    
    )
    
}


const Routing = () => {
    return (
        <>
            <BrowserRouter>
                
                <Switch>
                    <ProtectedRoute exact path='/' component={Dashboard} />
                    <ProtectedRoute path='/profile/:name' component={Profile} />
                    <ProtectedRoute path='/add-feed' component={AddFeed}/>
                    <ProtectedRoute path='/view-feed' component={ViewFeed} />
                    <ProtectedRoute path='/edit-feed/:id' component={EditFeed} />
                    <Route path='/contact' component={Contact}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route component={PageNotFound}></Route>
                    
                </Switch>            
            </BrowserRouter>
        </>
    );
}

export default Routing;