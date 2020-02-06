import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import httpClient from './../../utils/http-client';
import Notification from './../../utils/notification';



 export class Login  extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                username: '',
                password: '',
            },
            error: {
                username: {
                    msg: '',
                    isDirty: false
                },
                password: {
                    msg: '',
                    isDirty: false
                }
            },
            isSubmitting: false,
            isValidForm: false
        }
    }   

    handleChange = (e) => {
        const {name, value} = e.target;
        
        // console.log(name, value);
        this.setState((previousState) => ({
            data:{
                ...previousState.data,
                [name]: value
            }
            
        }), ()=>{this.validateError(name)})
    }

    validateError(fieldName){
        // console.log(this.state)
        let err;
        switch (fieldName) {            
            case 'username':
                err = this.state.data[fieldName] ? {message: '', isTouched: true} : {message: 'username is required', isTouched: false}                     
                break;
            case 'password':
                err= this.state.data[fieldName] ? {message: '', isTouched: true} : {message: 'password is required', isTouched: false}
                break;
            default:
                break;
        }

        this.setState((previousState) => ({
            error: { 
                ...previousState.error,
                  [fieldName] :{
                    
                      ['msg']:err.message ,
                      ['isDirty']: err.isTouched
                  } 
            }            
        }), () => {this.validateForm()})
    }

    validateForm = () => {
        // console.log(this.state)
        // const err = Object.values(this.state.error);
        // console.log(err.msg);
        let isValid = (this.state.error.username.isDirty && this.state.error.password.isDirty) ? true : false;
        this.setState({
            isValidForm: isValid
            
        });               
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })
       
        httpClient.post('/auth/login',this.state.data)
        .then((data) => {
            // console.log(data);
            // console.log(data.data);
            Notification.showSuccess(`welcome ${data.data.user.username}`)
            localStorage.setItem('user', JSON.stringify(data.data.user));
            localStorage.setItem('token', data.data.token);
            this.setState({
                isSubmitting: false
            })
           
            this.props.history.push(`/`);
           
        })
        .catch(err => {
            this.setState({
                isSubmitting: false
            });
            Notification.errorHandler(err);
           
        })
      
        
    }
    

    componentWillMount(){
        // console.log("before rendering");
    }

    componentDidMount(){
        // console.log("after sucessful rendering");
    
       
    }

    componentDidUpdate(props, previousState){
        // console.log(props);
        //  console.log(previousState);
        // console.log(this.state);

    }

    componentWillUnmount(){
        //clearInterval(this.interval)
    }
    

    render() { 
        let btn = this.state.isSubmitting
        ? <button disabled className="btn btn-info" >Logging...</button>
        : <button className="btn btn-primary" disabled={!this.state.isValidForm} >Login</button>
        return ( 
            <>
            <h2 style={{textAlign:"center"}}>Please Login To continue</h2>
            <div className="container">
                <h2>Welcome to Login Page</h2>
                
                <form className="form-group" onSubmit={this.handleClick}>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Username" name="username" onChange={this.handleChange} id="username" className="form-control" />
                    <p className='msg'>{this.state.error.username.msg}</p>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" onChange={this.handleChange} id="password" className="form-control" />
                    <p className='msg'>{this.state.error.password.msg}</p>
                    <br/>
                    {btn}
                </form>
                <p>Don't have an account?</p>
                <p>Register <Link to="/register">here</Link></p>
                <p><Link to="/forgot-password">Forgot password?</Link></p>
            </div>
            
            </>
         );
    }
}
 
// export class WillUnMount extends React.Component {
//     constructor(){
//         super();
//         this.state = {};
//     }

//     mount(){
        
//             ReactDom.render(<Login></Login>, document.getElementById('willunmount'));
        
//     }

//     unmount(){
//         ReactDom.unmountComponentAtNode(document.getElementById('willunmount'));

//     }

//     render(){
//         return(
//             <>
//             <button className='btn btn-success' onClick={this.mount}>Mount</button>
//             <button className='btn btn-danger' onClick={this.unmount}>Unmount</button>
//             <div id='willunmount'></div>
            
//             </>
//         )
//     }
// }