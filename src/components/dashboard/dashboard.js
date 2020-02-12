import React from 'react';
import './dashboard.css';
import httpClient from '../../utils/http-client';
import notification from '../../utils/notification';
import { fullDate } from '../../utils/moment';
import { Loaders } from '../../utils/loader';

class Dashboard extends React.Component {
    constructor(){
        super();
        this.state = {
            data:[],            
            isLoading:true,
            perPage:3,
            pageNumber:1
        }
         this.user = JSON.parse(localStorage.getItem('user'));
    }

    componentDidMount(){
        this.http()
    }

    http(){
        httpClient.post('feed/search', {},false,{pageNumber:this.state.pageNumber, pageSize:this.state.perPage})
        .then(data=>{
            this.setState({
                data:data.data                
                
            });
        })
        .catch(err=>{
            notification.errorHandler(err);
        })
        .finally(()=>{
            this.setState({
                isLoading:false
            });
        })
    }

    handlePrevious = ()=>{
        this.setState((pre)=>({
            pageNumber: pre.pageNumber - 1,
            isLoading:true
        }), ()=>{
            this.http();
        });
           
        
    }

    handleNext = ()=>{
        this.setState((pre)=>({
            pageNumber: pre.pageNumber + 1,
            isLoading:true
        }),()=>{
            this.http();
        });
    }

    render() {
        
        let imgUrl = process.env.REACT_APP_IMG_URL;
        let content = this.state.data.map(item => {
            return (
                <>
                <div key={item._id} className="container">
                    <div className="well">
                        <div className="media">
                            <a className="pull-left" >
                                <img className="media-object searchImage " src={item.image ? `${imgUrl}/${item.image}` : "http://placekitten.com/150/150" }/>
                            </a>
                            <div className="media-body">
                                <h4 className="media-heading">{item.title}</h4>
                            <p className="text-right">{item.user.username}</p>
                            <p>{item.description}</p>
                            <ul className="list-inline list-unstyled">
                                <li><span><i className="glyphicon glyphicon-calendar"></i> {fullDate(item.createdAt)} </span></li>
                                <li>|</li>
                                <span><i className="glyphicon glyphicon-comment"></i> 2 comments</span>
                                <li>|</li>
                                <li>
                                <span className="glyphicon glyphicon-star"></span>
                                            <span className="glyphicon glyphicon-star"></span>
                                            <span className="glyphicon glyphicon-star"></span>
                                            <span className="glyphicon glyphicon-star"></span>
                                            <span className="glyphicon glyphicon-star-empty"></span>
                                </li>
                                <li>|</li>
                                <li>
                            
                                <span><i className="fa fa-facebook-square"></i></span>
                                <span><i className="fa fa-twitter-square"></i></span>
                                <span><i className="fa fa-google-plus-square"></i></span>
                                </li>
                                </ul>
                        </div>
                        </div>
                    </div>
                </div>
                <br/>
            </>    
            )
        }) 
        let visible = this.state.pageNumber === 1 
            ? 'hidden'
            :'visible'

        let loading = this.state.isLoading
            ? <Loaders/>
            :  <>
           <div className="dashBoard">
            <h2>welcome to your Profile</h2>
                    <h2 style={{textAlign:"center"}}>Recent Blogs</h2>
                    <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                    <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
                    <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>


                    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css"/>
                    {content}
                 <div className="row">
                     <div className="col-md-6">
                         <button className="btn btn-success" style={{visibility:`${visible}`}} onClick={this.handlePrevious}>Previous</button>
                     </div>
                     <div className="col-md-6">
                         <button className="btn btn-success"  onClick={this.handleNext}>Next</button>
                     </div>
                 </div>
            </div>
            
           
           </>
      
        return (
       
          loading

          );
    }
}
 
export default Dashboard;