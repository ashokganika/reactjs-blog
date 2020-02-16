import React from 'react';
import httpClient from '../../utils/http-client';
import notification from '../../utils/notification';

class ResetPassword extends React.Component {
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
            ? ''
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
        httpClient.post(`/auth/reset-password/${this.props.match.params.token}`, this.state.data)
        .then(data=>{
            notification.showInfo("New password reset done");
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
            : <button type="submit" className="btn btn-primary" disabled={!this.state.isvalid}>Reset</button>
        return (
            <>
                <div className="container">
                    <h2>Please enter new password to reset the password</h2>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <label htmlFor="empasswordail" id="password">Enter New password:</label>
                        <input type="text" className="form-control" id="password" name="password" onChange={this.handleChange}/>
                        <p style={{color:'red'}}>{this.state.error.email}</p>
                        <br></br>
                        {button}
                    </form>
                </div>
            </>
          );
    }
}
 
export default ResetPassword;