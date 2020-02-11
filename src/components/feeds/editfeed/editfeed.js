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
            // console.log(this.state.data);
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
        let {type, name, value} = e.target;
        if(type === 'file'){
            value = e.target.files
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
        let url = `${process.env.REACT_APP_BASE_URL}/feed/${this.state.data._id}?token=${localStorage.getItem('token')}`
       this.setState({
           isSubmitting:true
       });

       httpClient.upload(
           {
               method:'PUT',
               url: url,
               file: this.state.data['newImage'],
               data: {...this.state.data, user:this.state.data.user._id}

           }
       )
       .then((data) => {
            this.setState({
                isSubmitting:false
            })
            notification.showSuccess('feed Edited successfully');
            this.props.history.push('/view-feed');
            // console.log(data);
       
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
                    <label>Image</label><br/>
                    <img src={`${process.env.REACT_APP_IMG_URL}/${this.state.data.image}`}  width="200px" height="200px" alt="feedimage" />
                    <br/>
                    <label>Choose New Image</label><br/>
                    <input type="file" className="form-control" name="newImage" onChange={this.handleChange} /><br/>
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