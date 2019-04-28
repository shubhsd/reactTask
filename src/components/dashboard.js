import React, { Component } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import * as Config from '../configurations/config';
import {
    FormGroup, Input, Label,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Button
 } from 'reactstrap';
import '../styles/dashbord.css'
export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            showModal:false,
            pair:'',
            type:'',
            price:0,
            qty:0,
            side:'',
            status:'',
            filled:'',
            itemData:[]
        }
    }

    toggleEditAddressModal() {
        this.setState({showModal:false});
     }
     openModel=()=>{
        this.setState({showModal:true});
     }

     componentWillMount(){
         this.getItem();
     }

     getItem=async()=>{
        let getToken=await localStorage.getItem('accessToken')
        axios.defaults.headers.common['authorization'] = 'breare '+getToken;
        axios.defaults.headers.common['role'] = 'user';
        axios.get(`${Config.BASE_URL}user/getItem`)
            .then(async (response) => {
                console.log(response.data.data,'-------------------------------')
                this.setState({ 
                    itemData:response.data.data,
                    pair:'',
                    type:'',
                    price:0,
                    qty:0,
                    side:''
                });
            }).catch((error) => {
                swal({title:"Email already exists",text:"",timer:1000, icon: 'error'})
            });
     }

     onAddItemHandeller=async()=>{
        let getToken=await localStorage.getItem('accessToken')
        axios.defaults.headers.common['authorization'] = 'breare '+getToken;
        axios.defaults.headers.common['role'] = 'user';
        let dataToSend={
            pair:this.state.pair,
            type:this.state.type,
            price:this.state.price,
            qty:this.state.qty,
            side:this.state.side,
            status:this.state.status,
            filled:this.state.filled
        }
        axios.post(`${Config.BASE_URL}user/addItem`,dataToSend)
            .then(async (response) => {
                this.setState({ 
                    itemData:response.data.data,
                    pair:'',
                    type:'',
                    price:0,
                    qty:0,
                    side:'',
                    showModal:false
                });
                swal({title:"Signup added",text:"",timer:1000, icon: 'success'});
                this.getItem()
            }).catch((error) => {

                swal({title:error,text:"",timer:1000, icon: 'error'})
            });
     }

     dateConverter=(val)=>{
       let d=new Date(val);
       return d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()+'-'+d.getHours()+':'+d.getMinutes()
     }

     onLogoutHandeller=()=>{
         localStorage.removeItem('accessToken');
         window.location.reload()
     }

    render(){
        return (
            <div className="main-section">
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between" style={{borderBottom:"2px solid white"}}>
            <a className="navbar-brand" href="#">Coinmax</a>
            <span style={{color:"white"}}>Username</span>
            <span style={{color:"white"}} onClick={()=>this.onLogoutHandeller()}>Logout</span>
            </nav>
            <article className="card-group-item">
            <br />
            <div className="row">
            <div className="col-md-6">
            <h6 className="title" style={{color:"white"}}>History </h6>
            </div>
            <div className="col-md-6">
            <button className="btn btn-info" style={{float:"right"}} onClick={()=>this.openModel()} >Add New </button>
            </div>
            </div>
           <div className="filter-content">
            <div className="card-body">
            <div className="form-row">
            <div className="form-group col-md-6">
            <label style={{color:"white"}}>Min</label>
            <input type="number" className="form-control" id="inputEmail4" placeholder="$0" />
            </div>
            <div className="form-group col-md-6 text-right">
            <label style={{color:"white"}}>Max</label>
            <input type="number" className="form-control" placeholder="$1,0000" />
            </div>
            </div>
            </div>
           </div>
        </article>

        <table className="table table-striped table-dark"  style={{textAlign: "center", fontSize: 13}} >
            <thead>
            <tr>
                <th>Time</th>
                <th>Pair</th>
                <th>Type</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Side</th>
                <th>Status</th>
                <th>Filled</th>
            </tr>
            </thead>
            <tbody>
                {this.state.itemData.length>0&&this.state.itemData.map((val,i)=>{
                    return(
                        <tr key={i}>
                            <td>{this.dateConverter(val.createAt)}</td>
                            <td>{val.pair}</td>
                            <td>{val.type}</td>
                            <td>{val.price}</td>
                            <td>{val.qty}</td>
                            <td>{val.side}</td>
                            <td>{val.status}</td>
                            <td>{val.filled}</td>
                       </tr>
                    ) 
                })}
            </tbody>
           </table>


           <Modal isOpen={this.state.showModal} toggle={() => this.toggleEditAddressModal()}>
                <ModalHeader toggle={() => this.toggleEditAddressModal()}>Add New Item</ModalHeader>
                <ModalBody>
                <div>
                    <FormGroup>
                        <Label for="Pair-3">Pair</Label>
                        <Input type="pair" value={this.state.pair} onChange={(e)=>this.setState({pair:e.target.value})} name="Pair" id="Pair-3" placeholder="Enter pair" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Type-3">Type</Label>
                        <Input type="Type" value={this.state.type} onChange={(e)=>this.setState({type:e.target.value})} name="Type" id="Type-3" placeholder="Enter type" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Price-3">Price</Label>
                        <Input type="Price" value={this.state.price} onChange={(e)=>this.setState({price:e.target.value})} name="Price" id="Price-3" placeholder="Enter price" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Qty-3">Qty</Label>
                        <Input type="Qty" value={this.state.qty} onChange={(e)=>this.setState({qty:e.target.value})} name="Qty" id="Qty-3" placeholder="Enter qty" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Side-3">Side</Label>
                        <Input type="Side" value={this.state.side} onChange={(e)=>this.setState({side:e.target.value})} name="Side" id="Side-3" placeholder="Enter side" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Status-3">Status</Label>
                        <Input type="Status" value={this.state.status} onChange={(e)=>this.setState({status:e.target.value})} name="status" id="status-3" placeholder="Enter status" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Filled-3">Filled</Label>
                        <Input type="Filled" value={this.state.filled} onChange={(e)=>this.setState({filled:e.target.value})} name="Filled" id="Filled-3" placeholder="Enter Filled" />
                    </FormGroup>
                </div>
                </ModalBody>
                <ModalFooter>
                        <Button variant="contained" className="text-white btn-success" onClick={() => this.onAddItemHandeller()}>Add Item</Button>{' '} 
                        <Button variant="contained" className="text-white btn-danger" onClick={() => this.toggleEditAddressModal()}>Cancel</Button> 
                </ModalFooter>
                </Modal>
            </div>
            );
    }


}


