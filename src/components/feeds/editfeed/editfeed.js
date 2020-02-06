import React from 'react';
import httpClient from '../../../utils/http-client';
import notification from '../../../utils/notification';
import { Loaders } from '../../../utils/loader';


class EditFeed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data:{

            },
            error:{

            },
            isSubmitting:false,
            isValid:true,
            isLoading:true
        
          }
    }

    componentDidMount() {
        
        let id = this.props.match.params['id'];
        // console.log("at did mount>>, ", id);
        httpClient.get(`/feed/${id}`, true)
        .then(data => {
            // console.log(data.data);
            this.setState({
                data:data.data
            })
        })
        .catch(err => {
            notification.errorHandler(err);
        })
        .finally(() => {
            this.setState({
                isLoading:false
            })
        })
    }

    handleChange = (e) => {
        const { name, value} = e.target;
        // console.log(name,value);
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
       });

       
       httpClient.edit(`/feed/${this.state.data._id}`,this.state.data, true)
       .then((data) => {
           this.setState({
               isSubmitting:false
           })
           notification.showSuccess('feed Edited successfully');
           this.props.history.push('/view-feed');
          
       })
       .catch(err => {
        this.setState({
            isSubmitting:false
        })
           notification.errorHandler(err);
               
       })
     

        
    }
    
    render() { 
        let btn;
        
        btn = (this.state.isSubmitting)
            ? <button disabled className="btn btn-primary"  >Submitting...</button>
            :
            <button  disabled={!this.state.isValid} className="btn btn-primary"  >Edit Feeds</button>

        
        let content =this.state.isLoading
            ? <Loaders type="Oval" color="#AA00FF" height={80} width={150} />
            : <div className="container">
                <form className="form-group" onSubmit={this.handleClick}>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="title" name="title" value={this.state.data.title} onChange={this.handleChange} id="title" className="form-control" />
                    <p className='msg'>{this.state.error.title}</p>
                    <label htmlFor="description">Description</label>
                    <input type="description" placeholder="Add description here" name="description" value={this.state.data.description} onChange={this.handleChange} id="description" className="form-control" />
                    <p className='msg'>{this.state.error.description}</p>
                    <br/>
                    {btn}
                </form> 
              </div>      
        return (
            <>
                <h3>Edit your Feed</h3>
                <p><strong>Edit your ideas here</strong></p>
                
                    {content}
                
            </>
          );
    }
}
 
export default EditFeed;