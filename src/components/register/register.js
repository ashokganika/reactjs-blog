import React from 'react';
import './register.css';

const formData = {
    name: '',
    address: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    dob: '' 
}

export class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...formData
            },

            error: {
                ...formData
            },

            isValid: false,
            isSubmitting: false
        }
    }

    onHandleChange = (e) => {
        
        // console.log(e.target.name);
        // console.log(e.target.value);
        let {name,value} = e.target;
        this.setState( (previousState) => ({
            data: {
                ...previousState.data,
                [name]: value
            }
        }), ()=>{this.validateInput(name)})
        
    }
    
    
    validateInput = (Fieldname) => {
        // console.log(this.state.data)
        let err;
        switch (Fieldname) {
            case 'name':
                err =(this.state.data[Fieldname])
                    ? ''
                    :
                    'name is required'   
                break;
            
            case 'email':
                err = (this.state.data[Fieldname])
                ? (this.state.data[Fieldname].includes('@')) 
                    ? ''
                    :
                    'Invalid email'
                :
                'email is required' 
                break;

            case 'password':
                err = (this.state.data[Fieldname].length > 7) 
                ? ''
                :
                'password must be atleast 8 characters long'  
                break;  
        
            default:
                err = ''
                break;
        }

        this.setState( (errState) => ({
            error:{
            ...errState.error,
            [Fieldname]: err
            }
        }), () => this.validateForm())
       
    }

    validateForm = () => {
        let formVaild;
        const isFormValid = Object.values(this.state.error).filter( err => err);
        // console.log(isFormValid.length);
        if (isFormValid.length){
           formVaild = false
        }
        else {
            formVaild = true
        }
        this.setState({
            isValid : formVaild                
        })

       
    }
    

    onHandleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting: true
        })

        setTimeout( () => {
            this.setState({
                isSubmitting:false
            })
        }, 3000)
       
    }

    render() {
        let btn;
        btn = (this.state.isSubmitting) 
            ? <button disabled={true} className="btn btn-info my-4 btn-block" type="submit">submitting...</button>
            :
            <button disabled={!this.state.isValid} className="btn btn-info my-4 btn-block" type="submit">Sign in</button>
            
        return (
           
           
            <>
               
                <form className="text-center border border-light p-5" onSubmit={this.onHandleSubmit} noValidate>

                    <p className="h4 mb-4">Registeration</p>

                    <div className="form-row mb-4">
                        <div className="col">
                            
                            <input type="text" id="defaultRegisterFormFirstName" className="form-control" name='name' onChange={this.onHandleChange} placeholder="Full name"/>
                            <small id="validatetext"  className="form-text text-muted-danger mb-4">
                            {this.state.error.name}
                        </small>
                            </div>
                    </div>

                    <div className="form-row mb-4">
                        <div className="col">
                            
                            <input type="text" id="defaultRegisterFormFirstName" className="form-control" name='address' onChange={this.onHandleChange} placeholder="Address"/>
                        </div>
                        <div className="col">
                            
                            <input type="text" id="defaultRegisterFormLastName" className="form-control" name='phone' onChange={this.onHandleChange} placeholder="Contact number"/>
                        </div>
                    </div>

                    
                    <input type="email" id="defaultRegisterFormEmail" className="form-control mb-4" name='email' onChange={this.onHandleChange} placeholder="E-mail"/>
                    <small id="validatetext"  className="form-text text-muted-danger mb-4">
                            {this.state.error.email}
                        </small>
                    <input type="text" id="defaultRegisterFormEmail" className="form-control mb-4" name='username' onChange={this.onHandleChange} placeholder="Username"/>
                    
                    <input type="password" id="defaultRegisterFormPassword" className="form-control" name='password' onChange={this.onHandleChange} placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock"/>
                    <small id="validatetext"  className="form-text text-muted-danger mb-4">
                            {this.state.error.password}
                        </small>

                    
                    <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="defaultUnchecked" name="gender" onChange={this.onHandleChange} value='male' />
                    <label className="custom-control-label" for="defaultUnchecked">Male</label>
                    </div>


                    <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="defaultChecked" name="gender" onChange={this.onHandleChange} value='female' />
                    <label className="custom-control-label" for="defaultChecked">Female</label>
                    </div> 

                    <div className="custom-control custom-radio">
                    <input type="radio" className="custom-control-input" id="defaultCheckeds" name="gender" onChange={this.onHandleChange} value='others' />
                    <label className="custom-control-label" for="defaultCheckeds">Others</label>
                    </div>
                    <br/>
                    <input type="text" id="defaultRegisterFormEmail" className="form-control mb-4" name='dob' onChange={this.onHandleChange} placeholder="Date Of Birth"/>
                    {btn}
                        
                   
                </form>


            </>
        )
    }
}

