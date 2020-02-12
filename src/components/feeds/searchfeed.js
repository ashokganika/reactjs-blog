import React, { Component } from 'react';
import httpClient from '../../utils/http-client';
import notification from '../../utils/notification';
import ViewFeed from './viewfeed/viewFeeds';
import { Loaders } from '../../utils/loader';
 




class SearchFeed extends Component {
    constructor(props){
        super(props);
        this.state = {
            data :{

            },
            isLoading: true,
            isSubmitting:false,
            searchContent:[],
            allContent:[],
            
        }
    }
    
    componentDidMount(){
        httpClient.post('/feed/search', {})
        .then(data => {
            this.setState({
                allContent: data.data
            })
        })
        .catch(err => {
            notification.errorHandler(err);
        })
        .finally(()=>{
            this.setState({
                isLoading:false
            })
        })
    }
    

    handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        this.setState((pre) => ({
            data: {
                ...pre.data,
                [name] : value
            }
        }))
    
    } 

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isSubmitting:true
        })

        if(!this.state.data.toDate){
            this.setState((pre)=>({
                data:{
                    
                    toDate:this.state.data.fromData
                }
            }))
        }
        httpClient.post('/feed/search', this.state.data)
        .then(data =>{
            if(data.data.length){
                this.setState({
                    searchContent: data.data
                })
                
            }
            else{
                notification.showInfo("No feed such feed exists");
            }   
        })
        .catch(err =>{
            notification.errorHandler(err);
        })
        .finally(() => {
            this.setState({
                isSubmitting:false
            })
        })
    }

   
    render() { 
        let option = this.state.allContent.map(item =>(
            <option key={item._id} value={item.title}>{item.title}</option>
        ))    
        let onsubmit = this.state.isSubmitting
        ? <><button disabled type="submit" className="btn btn-success">Seacrhing...</button>
            
          </> 
        : <button disabled={false} type="submit" className="btn btn-success">Seacrh</button>
        
        let viewFeed = this.state.searchContent.length
            
            ? <><ViewFeed SearchFeedContent={this.state.searchContent} /></>
            : ''
        let allFeedContent = this.state.isLoading
            ? <Loaders/>
            : <>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <div className="form-row align-items-center">
                        <div className="col-sm-9 my-1">
                            <label className="sr-only" htmlFor="inlineFormInputName">Name</label>
                            <select type="text" name="title" className="form-control" id="inlineFormInputName"  onChange={this.handleChange} >
                            <option value=''>(All Feed)</option>
                            {option}                           
                            </select>                        
                        </div>                        
                        <div className="col-auto my-1">
                            {onsubmit}
                        </div>
                    </div>

                    <div className="form-row align-items-center">
                        <div className="col-auto my-1">
                            <label>From Date:</label>
                            <input type="date" className="form-control" onChange={this.handleChange} name="fromDate" />
                        </div>                                
                        <div className="col-auto my-1">
                            <label>To Date:</label>
                            <input type="date" className="form-control" onChange={this.handleChange} name="toDate" /> 
                        </div>
                    </div>
                    
                </form> 

                
                {viewFeed}
              </>

        return (            
            allFeedContent
          );
    }
}
 
export default SearchFeed;