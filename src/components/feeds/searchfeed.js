import React, { Component } from 'react';
import httpClient from '../../utils/http-client';
import notification from '../../utils/notification';
import ViewFeed from './viewfeed/viewFeeds';




class SearchFeed extends Component {
    constructor(props){
        super(props);
        this.state = {
            data :{

            },
            isLoading: false,
            isSubmitting:false,
            searchContent:[]
        }
    }

    

    handleChange = (e) => {
        const {name, value} = e.target;
        // console.log(name, value);
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
        
        let viewFeed = this.state.searchContent.length
            
            ? <><ViewFeed SearchFeedContent={this.state.searchContent} /></>
            : ''

        let onsubmit = this.state.isSubmitting
            ? <><button disabled type="submit" className="btn btn-success">Seacrhing...</button>
                
              </> 
            : <button disabled={false} type="submit" className="btn btn-success">Seacrh</button>
        return (
            
            <>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <div className="form-row align-items-center">
                        <div className="col-sm-9 my-1">
                        <label className="sr-only" htmlFor="inlineFormInputName">Name</label>
                        <input type="text" name="title" className="form-control" id="inlineFormInputName" placeholder="Search feeds here" onChange={this.handleChange} />
                        </div>
                        
                        <div className="col-auto my-1">
                            {onsubmit}
                        </div>
                    </div>
                </form>   
                {viewFeed}
                
            </>
          );
    }
}
 
export default SearchFeed;