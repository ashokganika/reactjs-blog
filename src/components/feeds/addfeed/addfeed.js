import React from 'react';
import httpClient from '../../../utils/http-client';
import notification from '../../../utils/notification';
import { Loaders } from '../../../utils/loader';

class AddFeed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:{

            },
            error:{

            },
            isSubmitting:false,
            isValid:false
        
          }
    }

    handleChange = (e) => {
        let {type, name, value} = e.target;
        if(type === 'file'){
            value = e.target.files;
        }
        this.setState((prev) => ({
            data:{
                ...prev.data,
                [name]: value
            }
        }),()=> {this.validateError(name)})
    }

    validateError = (fieldName) => {
        // console.log(fieldName);
        let err;
        switch(fieldName){
            case 'title':
               err =  this.state.data[fieldName].length 
                ? ''
                : 'title is required'
                break;
            case 'description':
                err = this.state.data[fieldName].length
                ? this.state.data[fieldName].length > 15
                    ? ''
                    : 'description must contain at least 15 characters'
                : 'description is required'
                break;
                
                default:
                    break;
        }
        this.setState((prev) => ({
            error:{
                ...prev.error,
                [fieldName]:err
            }
        }), ()=> {this.validateForm()})
    }

    validateForm = () => {
        
        const validation = Object.values(this.state.error).filter(err => err);
        let checkValid;
        checkValid = validation.length 
            ? false: true
        this.setState({
            isValid: checkValid
        })  
        
    }

    handleClick = (e) => {
        e.preventDefault();
       this.setState({
           isSubmitting:true
       },() => { console.log(this.state.isSubmitting)});

       httpClient.upload(
           {
               method:'POST',
               url: `${process.env.REACT_APP_BASE_URL}/feed?token=${localStorage.getItem('token')}`,
               file: this.state.data.image,
               data: this.state.data
            }
        )
        .then((data) => {
            this.setState({
                isSubmitting:false
            })
            notification.showSuccess('feed uploaded')
            this.props.history.push('/view-feed');
           
        })
        .catch(err => {
         this.setState({
             isSubmitting:false
         })
            notification.errorHandler(JSON.parse(err));
                
        })     
    }
    
    render() { 
        let btn;
        
        btn = (this.state.isSubmitting)
            ?<>
                <button disabled className="btn btn-primary"  >Submitting...</button>
                <Loaders type="Oval" color="#AA00FF" height={80} width={80} />
            </> 
            
            :
            <button  disabled={!this.state.isValid} className="btn btn-primary"  >Add Feeds</button>
        return (
            <>
                <h3>Add New Feeds</h3>
                <p><strong>Express you ideas here</strong></p>
                <div className="container">
                    <form className="form-group" onSubmit={this.handleClick}>
                        <label htmlFor="title">Title</label>
                        <input type="text" placeholder="title" name="title" onChange={this.handleChange} id="title" className="form-control" />
                        <p className='msg'>{this.state.error.title}</p>
                        <label htmlFor="description">Description</label>
                        <input type="description" placeholder="Add description here" name="description" onChange={this.handleChange} id="description" className="form-control" />
                        <p className='msg'>{this.state.error.description}</p>
                        <input type="file" className="form-control" name="image" onChange={this.handleChange} />
                        <br/>
                        {btn}
                    </form>
                </div>
            </>
          );
    }
}
 
export default AddFeed;