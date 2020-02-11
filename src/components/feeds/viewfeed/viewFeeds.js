import React, {Component} from 'react';
import httpClient from '../../../utils/http-client';
import notification from '../../../utils/notification';
import { fullDate } from '../../../utils/moment';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Loaders } from '../../../utils/loader';



class ViewFeed extends Component {
    constructor(){
        super();
        this.state = {
            isLoading:false,
            dataContent: []
          }
          
          
    }
    
    componentWillReceiveProps(){
        if(this.props.SearchFeedContent){
            this.setState({
                dataContent: this.props.SearchFeedContent
            });
        }
      
    }

    componentDidMount(){
        
       if(!this.props.SearchFeedContent){
            this.setState({
                isLoading:true
            })
            httpClient.get('/feed', true)
            .then(data => {
            
           
            this.setState({
                dataContent: data.data
                })
            })
            .catch(err => {
            // console.log(err);
            notification.errorHandler(err);
            })
            .finally(() => {
            this.setState({
                isLoading:false
                });
            })
        }
    }
   
    handleDelete(id, i) {
        confirmAlert({
            title:'Confirm to submit',
            message:'Are you sure to do this',
            closeOnEscape: true,
            closeOnClickOutside: true,
            buttons:[
                {
                    label:'Delete',
                    onClick:() =>  { 
                                httpClient.delete(`/feed/${id}`, true)
                                .then(data => {
                                    notification.showSuccess('feed deleted successfully');
                                    this.state.dataContent.splice(i, 1)
                                    this.setState({
                                        dataContent:this.state.dataContent
                                        
                                    });
                                
                                })
                                .catch(err => {
                                    notification.errorHandler(err);
                                })
                                
                        }
                                        
                },                       
                                    {
                                        label:'Cancel',
                                        onClick:() => {console.log("NOt deleted")}
                                    }
                                ]
                            });
       
        
    }

    render() {
       
        let imgUrl = process.env.REACT_APP_IMG_URL;
        let rowContent =  this.state.dataContent.map((item, i) => (
                <tr key={item._id}>
                    <td>{i+1}</td>
                    <td>{item.title}</td>
                    <td><img src={`${imgUrl}/${item.image}`} width='50px' height='50px' alt='feedimage'></img></td>
                    <td>{fullDate(item.createdAt)}</td>
                    <td>
                    <i className="material-icons"><Link to={`/edit-feed/${item._id}`}><button className="btn btn-primary" >edit</button></Link></i>|
                    <i className="material-icons"><button className="btn btn-danger" onClick={() => this.handleDelete(item._id, i)}>delete</button></i>
                    </td>
                    
                </tr>
                
            ))
            
        let content = this.state.isLoading 
        ? <Loaders type="Oval" color="#AA00FF" height={100} width={100} />
        : this.state.dataContent.length
            ? <div>
                
                <table >
            <thead>
                <tr>
                <th>S.N</th>
                <th>Title</th>
                <th>Image</th>
                <th>createdAt</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {rowContent}
            </tbody>
            
         </table> </div>
            : <h2>No any feeds to show</h2> 
            
        return ( 
            <>
                {content}
            </>
                
         );
    }
}
 
export default ViewFeed;