import React from 'react';


class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = { 

         }
    }

    componentDidMount(){
        // console.log(this.props);
        // console.log(JSON.parse(localStorage.getItem('user')));
    }
   
    render() { 
        return ( 
            <>
                <h2>welcome to your Profile</h2>
                <h2 style={{textAlign:"center"}}>Recent Blogs</h2>
                <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                <script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
                <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>


                <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css"/>
                <div className="container">
                <div className="well">
                    <div className="media">
                        {/* <a className="pull-left" >
                            <img className="media-object" src="http://placekitten.com/150/150"/>
                        </a> */}
                        <div className="media-body">
                            <h4 className="media-heading">Receta 1</h4>
                        <p className="text-right">By Francisco</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. 
                        Quisque mauris augue, molestie tincidunt condimentum vitae, gravida a libero. Aenean sit amet felis 
                        dolor, in sagittis nisi. Sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. 
                        Aliquam in felis sit amet augue.</p>
                        <ul className="list-inline list-unstyled">
                            <li><span><i className="glyphicon glyphicon-calendar"></i> 2 days, 8 hours </span></li>
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
                
            </>
         );
    }
}
 
export default Profile;