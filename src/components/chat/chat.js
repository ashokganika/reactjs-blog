import React from 'react';
import * as io from 'socket.io-client';
import './chat.css';
import { fullDate } from '../../utils/moment';
import notification from '../../utils/notification';



export default class Chat extends React.Component {
	constructor(){
		super();
		this.state = {
			message:'',
			senderId:'',
			receiverId : '',
			messages: [],
			users: []
		}
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	componentDidMount(){
		this.socket = io(process.env.REACT_APP_CHAT_URL);
		this.socket.emit('new-user', this.user.username);
		this.runSocket();
	}

	

	

	handleChange = (e) => {
		const {name, value} = e.target;
		this.setState(pre=>({
			...pre,
			[name] : value
		}));

	}

	handleSubmit = (e) => {
		e.preventDefault();
		// console.log("i am here at submit");
		if(!this.state.receiverId){
			return notification.showWarning('please select a user to chat');
		}
		let data = {
			sender : this.user.username,
			message : this.state.message,
			receiverId:this.state.receiverId,
			time : new Date()
		}

		this.state.users.forEach((item)=>{
			if(item.username === this.user.username){
				data.senderId = item.id;
			}
		});
		

		this.socket.emit('new-msg', data);
		this.setState({
			message:''
		})
		
	}

	runSocket(){
		this.socket.on('reply-msg', (data) => {
			const {messages} =  this.state;
			messages.push(data);
			this.setState({
				messages,
				receiverId:data.senderId
			});
		});

		this.socket.on('reply-msg-own', (data)=> {
			const {messages} = this.state;
			messages.push(data);
			this.setState(messages);
		});

		this.socket.on('send-user', (users) => {
			this.setState({
				users:users,
				
				

			})
			
		});

	}

	selectUser = (userId) => {
		console.log(userId);
		this.setState({
			receiverId:userId
		})
	}

	
	render() {
		let msg = this.state.messages.map((item, i)=>(
			item.sender === this.user.username
				? <div  key={i} className="incoming_msg">
					<div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png/" alt="sunil"/> </div>
					<div className="received_msg">
						<div className="received_withd_msg">
						<p>Test which is a new approach to have all
							solutions</p>
						<span className="time_date"> 11:01 AM    |    June 9</span></div>
					</div>
				</div>
				:<div key={i} className="outgoing_msg">
					<div className="sent_msg">
						<p>Test which is a new approach to have all
						solutions</p>
						<span className="time_date"> 11:01 AM    |    June 9</span> </div>
				</div>
		))
		

		let users = this.state.users.map(item=>(
			<div className="chat_list" key={item.id} onClick={()=>{this.selectUser(item.id)}}>
					<div className="chat_people">
						<div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
							<div className="chat_ib">
								<h5>{item.username}</h5>
								
							</div>
					</div>
			</div>
		));
		

		

		return (
			
			<div className="">
				<div className="containers">
				<h3 className=" text-center">Messaging</h3>
				<div className="messaging">
					<div className="inbox_msg">
						<div className="inbox_people">
						<div className="headind_srch">
							<div className="recent_heading">
							<h4>Chat List</h4>
							</div>
							<div className="srch_bar">
							<div className="stylish-input-group">
								<input type="text" className="search-bar"  placeholder="Search" />
								<span className="input-group-addon">
								<button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
								</span> </div>
							</div>
						</div>
						<div className="inbox_chat">
							
							{users}
						</div>
						</div>
						<div className="mesgs">
						<div className="msg_history">
							
							{msg}
							
						</div>
						
						<div className="type_msg">
							<div className="input_msg_write">
							<form onSubmit={this.handleSubmit}	>
							<input type="text" className="write_msg" name="message" value={this.state.message} placeholder="Type a message" onChange={this.handleChange} />
							<button className="msg_send_btn" type="submit"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
							</form>
							</div>
						</div>
						</div>
					</div>
					
					</div>
				</div>
				
				
					
	</div>
   
			);
	}
}
