import React from 'react';
import {BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

const Home = () => {
    return (
        <>
            <h2>Welcome To homepage</h2>
        </>
    )
}

const Contact = () => {
    return (
        <>
            <h2>Welcome To Contactpage</h2>
        </>
    )
}

const Profiile = () => {
    return (
        <>
            <h2>Welcome To Profiilepage</h2>
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

const Navigate = () => {
    return (
        <>
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
        </>
    );
}

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Navigate/>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/profile' component={Profiile}></Route>
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