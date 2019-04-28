import React, { Component } from "react";
import axios from 'axios';
import Dashboard from './dashboard';
import swal from 'sweetalert';
import * as Config from '../configurations/config';
import '../styles/signup.css'
export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            fullName:''
        }
    }
     _onSignupHandeller=()=>{
        let dataToSend={
            email:this.state.email,
            password:this.state.password,
            fullName:this.state.fullName
        }
        axios.post(`${Config.BASE_URL}user/register`,dataToSend)
            .then(async (response) => {
                this.setState({ 
                    email:'',
                    password:'',
                    fullName:''
                });
                swal({title:"Signup successfully",text:"",timer:1000, icon: 'success'})
            }).catch((error) => {
                
                console.log(error,'sdshgdfysdgsg');
                swal({title:"Email already exists",text:"",timer:1000, icon: 'error'})
            });
    
    }
    render(){
        return (
            <div className="main-section">
            <div className="confirm-wrapper">
                <div className="content-sect">
                    <h2 className="text-center">Sign Up</h2>
                    <hr />
                </div>
                <div className="content-sect">
                    <div>
                        <div className="form-group">
                            <input name="fullname" id="fullName" className="form-control custom-input"  type="text" placeholder="Enter fullName" value={this.state.fullName} onChange={(e)=>this.setState({fullName:e.target.value})} />
                        </div>
                        <div className="form-group">
                            <input name="email-address" id="email" className="form-control custom-input" type="text" placeholder="Enter Email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} />
                        </div>
                        <div className="form-group">
                                <input name="password" className="form-control custom-input" id="confpassword" type="password" placeholder="Enter password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} />
                        </div>
                        <div className="form-group">
                            <input type="button" className="form-control custom-button" value="Sign Up" id="btnVerify" onClick={this._onSignupHandeller}/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }


}


