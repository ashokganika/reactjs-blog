import React from 'react';
import httpClient from '../../utils/http-client';
import notification from '../../utils/notification';

class ForgotPassword extends React.Component {
    constructor(){
        super();
        this.state = {
            data:{

            },
            error:{

            },
            isvalid:false,
            isSubmitting:false
          }
    }

    handleChange = (e) =>{
        const {name, value}  = e.target;
        console.log(name,value);
        this.setState((pre)=>({
            data:{
                ...pre.data,
                [name]:value
            }
        }), () => {this.validateErrors(name)});
    }

    validateErrors(fieldName){
        let errs;
        errs =  this.state.data[fieldName].length
            ? this.state.data[fieldName].includes('@')
                ? ''
                : 'enter valid email'
            : 'email is required'
        this.setState((pre)=>({
            error:{
                ...pre.error,
                [fieldName]:errs
            }
        }), ()=>{this.validateForm()});    
    }

    validateForm(){
        
        let valid = Object.values(this.state.error).filter(item=>item);
        let isvalidform = valid.length > 0
            ? false
            : true
        // console.log(this.state.err);    
        this.setState({
            isvalid:isvalidform
        })    
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.setState({
            isSubmitting:true
        })
        httpClient.post('/auth/forgot-password', this.state.data)
        .then(data=>{
            notification.showInfo("Please open your gmail account to reset password");
            this.props.history.push('/login');
        })
        .catch(err=>{
            console.log(err.response);
            notification.errorHandler(err); 
        })
        .finally(()=>{
            this.setState({
                isSubmitting:false
            })
        })
    }
    
    render() { 
        // console.log(this.state);
        let button = this.state.isSubmitting
            ? <button type="submit" className="btn btn-primary" disabled>Submitting...</button>
            : <button type="submit" className="btn btn-primary" disabled={!this.state.isvalid}>Submit</button>
        return (
            <>
                <div className="container">
                    <h2>Please provide a valid email adderss to reset the password</h2>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <label htmlFor="email" id="email">Enter Email to Reset:</label>
                        <input type="text" className="form-control" id="email" name="email" onChange={this.handleChange}/>
                        <p style={{color:'red'}}>{this.state.error.email}</p>
                        <br></br>
                        {button}
                    </form>
                </div>
            </>
          );
    }
}
 
export default ForgotPassword;