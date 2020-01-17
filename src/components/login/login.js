import React from 'react';
import ReactDom from 'react-dom';
import './login.css';

 export class Login  extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameErr: '',
            passwordErr: '',
            count: 0
          }
    }   

    handleChange(e){
        const {name, value} = e.target;
        //console.log(name, value);
        this.setState({
            [name]: value
        })

       
    }   
    
    validateForm(fieldName){
        let err;
        switch (fieldName) {            
            case 'username':
                 err = this.state.username ? '' : 'username is required'
                break;
        
            default:
                break;
        }

        this.setState({
            usernameErr: err
        })
    }
    handleClick = (e) => {
        e.preventDefault();
      
        
    }
    

    componentWillMount(){
        console.log("before rendering");
    }

    componentDidMount(){
        console.log("after sucessful rendering");
    
       
    }

    componentDidUpdate(props, previousState){
        // console.log(props);
        //  console.log(previousState);
        console.log(this.state);

    }

    componentWillUnmount(){
        //clearInterval(this.interval)
    }
    

    render() { 
        console.log('render');
        return ( 
            <>
            <div className="container">
                <h2>Welcome to Login Page</h2>
                <p>Button clicked {this.state.count} times</p>
                <form className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Username" name="username" onChange={this.handleChange.bind(this)} id="username" className="form-control" />
                    <p>{this.state.usernameErr}</p>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" onChange={this.handleChange.bind(this)} id="password" className="form-control" /><br></br>
                    <button className="btn btn-primary" onClick={this.handleClick}>Login</button>
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