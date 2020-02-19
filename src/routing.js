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
import SearchFeed from './components/feeds/searchfeed';
import ForgotPassword from './components/forgotpassword/forgotpassword';
import ResetPassword from './components/resetpassword/resetpassword';
import Chat from './components/chat/chat';


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
        <p>hello</p>
    );
            
}



const PageNotFound = () => {
    return (
        <>
            <h2>Page not found</h2>
            <img src={'images/page.png'} alt="pagenotfoungimage" width="500px" height="500px" />
        </>
    )
}

const ProtectedRoute = ({component:Component, ...rest}) => {
    
    return (
        <Route path={rest.path} render={(props) => (
           
            localStorage.getItem('token')
            ? <div><NavBar isLoggedIn={true}/><SideBarComponent isLoggedIn={true}/><Component {...props}></Component></div>
            :
            <Redirect to='/login'></Redirect>
        )}>
        </Route>
    
    )
    
}

const PublicRoute = ({component:Component, ...rest}) => {
    // console.log(Component);
    return (
        <Route path={rest.path } render={(props) =>(
            <>
                <NavBar />
                <SideBarComponent isLoggedIn={false}/>
                <Component {...props}/>
               
               
            </>
        )}></Route>
    )
}


const Routing = () => {
    return (
        <>
            <BrowserRouter>
                
                <Switch>
                    <PublicRoute exact path='/' component={Dashboard} />
                    <ProtectedRoute path='/profile/:name' component={Profile} />
                    <ProtectedRoute path='/add-feed' component={AddFeed}/>
                    <ProtectedRoute path='/view-feed' component={ViewFeed} />
                    <ProtectedRoute path='/edit-feed/:id' component={EditFeed} />
                    <ProtectedRoute path='/search' component={SearchFeed} />
                    <PublicRoute path='/contact' component={Contact} />
                    <PublicRoute path='/register' component={Register} />
                    <PublicRoute path='/login' component={Login} />
                    <PublicRoute path='/forgot-password' component={ForgotPassword}/>
                    <PublicRoute path='/reset-password/:token' component={ResetPassword}/>
                    <ProtectedRoute path='/chat' component={Chat} />
                    <PublicRoute component={PageNotFound} />
                    
                </Switch>            
            </BrowserRouter>
        </>
    );
}

export default Routing;