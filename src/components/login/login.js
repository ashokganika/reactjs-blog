import React from 'react';
import './login.css';

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
            
        }, ()=>{console.log(this.state)})               
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })

        setTimeout(()=>{
            this.setState({
                isSubmitting: false
            })
        },3000)
      
        
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
        let btn = (this.state.isSubmitting) 
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
                    <p>{this.state.error.username.msg}</p>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" onChange={this.handleChange} id="password" className="form-control" />
                    <p>{this.state.error.password.msg}</p>
                    <br/>
                    {btn}
                </form>
                <p>Don't have an account?</p>
                <p>Register <a href="/register">here</a></p>
                <p><a href="/forgot-password">Forgot password?</a></p>
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