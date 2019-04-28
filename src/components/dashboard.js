import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import * as Config from "../configurations/config";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import {
  FormGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import "../styles/dashbord.css";
export default class Dashboard extends Component {
  name = localStorage.getItem("name");

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);

    this.state = {
      showModal: false,
      date: new Date(),
      dropdownOpen: false,
      dropdownOpen2: false,
      dropdownOpen3: false,

      pair: "",
      type: "",
      price: 0,
      qty: 0,
      side: "",
      status: "",
      filled: "",
      itemData: []
    };
  }

  toggleEditAddressModal() {
    this.setState({ showModal: false });
  }
  openModel = () => {
    this.setState({ showModal: true });
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggle2() {
    this.setState(prevState => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));
  }

  toggle3() {
    this.setState(prevState => ({
      dropdownOpen3: !prevState.dropdownOpen3
    }));
  }

  componentWillMount() {
    this.getItem();
  }

  getItem = async () => {
    let getToken = await localStorage.getItem("accessToken");
    axios.defaults.headers.common["authorization"] = "breare " + getToken;
    axios.defaults.headers.common["role"] = "user";
    axios
      .get(`${Config.BASE_URL}user/getItem`)
      .then(async response => {
        console.log(response.data.data, "-------------------------------");
        this.setState({
          itemData: response.data.data,
          pair: "",
          type: "",
          price: 0,
          qty: 0,
          side: ""
        });
      })
      .catch(error => {
        swal({
          title: "Email already exists",
          text: "",
          timer: 1000,
          icon: "error"
        });
      });
  };

  onAddItemHandeller = async () => {
    let getToken = await localStorage.getItem("accessToken");
    axios.defaults.headers.common["authorization"] = "breare " + getToken;
    axios.defaults.headers.common["role"] = "user";
    let dataToSend = {
      pair: this.state.pair,
      type: this.state.type,
      price: this.state.price,
      qty: this.state.qty,
      side: this.state.side,
      status: this.state.status,
      filled: this.state.filled
    };
    axios
      .post(`${Config.BASE_URL}user/addItem`, dataToSend)
      .then(async response => {
        this.setState({
          itemData: response.data.data,
          pair: "",
          type: "",
          price: 0,
          qty: 0,
          side: "",
          showModal: false
        });
        swal({ title: "Data added", text: "", timer: 1000, icon: "success" });
        this.getItem();
      })
      .catch(error => {
        swal({ title: error, text: "", timer: 1000, icon: "error" });
      });
  };

  dateConverter = val => {
    let d = new Date(val);
    return (
      d.getFullYear() +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getDate() +
      "-" +
      d.getHours() +
      ":" +
      d.getMinutes()
    );
  };

  onLogoutHandeller = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  onChange = date => this.setState({ date });

  render() {
    return (
      <div className="main-section">
        <nav
          className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between"
          style={{ borderBottom: "2px solid white" , padding : "4px 61px 6px 51px"
        }}
        >
          <small className="navbar-brand ">Coinmax</small>
          <span className="navbar-brand ml-auto" style={{ color: "white" }}>
            {this.name}
          </span>
          <Dropdown
            style={{ padding: "0px 8px" }}
            group
            isOpen={this.state.dropdownOpen3}
            // size="sm"
            toggle={this.toggle3}
          >
            <DropdownToggle caret />
            <DropdownMenu>
              <DropdownItem onClick={() => this.onLogoutHandeller()}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </nav>
        <article className="card-group-item">

          <br />
          <div className="row">
            <div className="col-md-6">
              <h6
                className="title"
                style={{ color: "#fdfdfd", fontWeight: "bold" }}
              >
                History
              </h6>
            </div>
            <div className="col-md-6">
              <button
                className="btn btn-danger"
                style={{ float: "right" }}
                onClick={() => this.openModel()}
              >
                Add New{" "}
              </button>
            </div>
          </div>
          <div className="filter-content">
            <div className="card-body">
              <div className="form-row">
                <div>
                  <DayPickerInput onDayChange={day => console.log(day)} />
                </div>
                <div style = {{margin: "0px 20px"}}>
                  <label style={{ color: "white", margin: "5px" }}>Pair</label>
                  <button
                    className="btn btn-white"
                    style={{
                      color: "white",
                      border: "1px solid rgb(101, 200, 251)",
                      padding: "0px 8px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: "16",
                      margin: "4px 2px"
                    }}
                  >
                    Asset
                  </button>
                  <span style={{ color: "white" }}>/</span>
                  <button
                    className="btn btn-white"
                    style={{
                      color: "white",
                      border: "1px solid rgb(101, 200, 251)",
                      padding: "0px 8px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: "16",
                      margin: "4px 2px"
                    }}
                  >
                    AUD
                  </button>
                </div>
                <div style = {{margin: "0px 20px"}}>
                  <label style={{ color: "white", margin: "4px" }}>Side</label>
                  <Dropdown
                    style={{ padding: "0px 8px" }}
                    group
                    isOpen={this.state.dropdownOpen}
                    size="sm"
                    toggle={this.toggle}
                  >
                    <DropdownToggle caret>ALL</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>BUY</DropdownItem>
                      <DropdownItem>SELL</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div style = {{margin: "0px 20px"}}>
                  <Dropdown
                    style={{ padding: "0px 8px" }}
                    group
                    isOpen={this.state.dropdownOpen2}
                    size="sm"
                    toggle={this.toggle2}
                  >
                    <DropdownToggle caret>Filter by status</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Qty</DropdownItem>
                      <DropdownItem>Side</DropdownItem>
                      <DropdownItem>Price</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div style = {{margin: "0px 50px"}}>
                  <button className="btn btn-primary">Search</button>
                  <button
                    className="btn btn-white"
                    style={{
                      color: "#65c8fb",
                      border: "1px solid #65c8fb",
                      padding: "3px 9px 3px",
                      margin: "0 7px",
                    }}
                  >
                    Reset
                  </button> </div>
              </div>
            </div>
          </div>
        </article>

        <table
          className="table table-striped table-dark"
          style={{ textAlign: "center", fontSize: 13, marginTop : "10px" }}
        >
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
            {this.state.itemData.length > 0 &&
              this.state.itemData.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{this.dateConverter(val.createAt)}</td>
                    <td>{val.pair}</td>
                    <td>{val.type}</td>
                    <td>{val.price}</td>
                    <td>{val.qty}</td>
                    <td style={{ color: "#86e686" }}>{val.side}</td>
                    <td style={{ color: "#ec7171" }}>{val.status}</td>
                    <td>{val.filled}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <Modal
          isOpen={this.state.showModal}
          toggle={() => this.toggleEditAddressModal()}
        >
          <ModalHeader toggle={() => this.toggleEditAddressModal()}>
            Add New Item
          </ModalHeader>
          <ModalBody>
            <div>
              <FormGroup>
                <Label for="Pair-3">Pair</Label>
                <Input
                  type="pair"
                  value={this.state.pair}
                  onChange={e => this.setState({ pair: e.target.value })}
                  name="Pair"
                  id="Pair-3"
                  placeholder="Enter pair"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Type-3">Type</Label>
                <Input
                  type="Type"
                  value={this.state.type}
                  onChange={e => this.setState({ type: e.target.value })}
                  name="Type"
                  id="Type-3"
                  placeholder="Enter type"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Price-3">Price</Label>
                <Input
                  type="Price"
                  value={this.state.price}
                  onChange={e => this.setState({ price: e.target.value })}
                  name="Price"
                  id="Price-3"
                  placeholder="Enter price"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Qty-3">Qty</Label>
                <Input
                  type="Qty"
                  value={this.state.qty}
                  onChange={e => this.setState({ qty: e.target.value })}
                  name="Qty"
                  id="Qty-3"
                  placeholder="Enter qty"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Side-3">Side</Label>
                <Input
                  type="Side"
                  value={this.state.side}
                  onChange={e => this.setState({ side: e.target.value })}
                  name="Side"
                  id="Side-3"
                  placeholder="Enter side"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Status-3">Status</Label>
                <Input
                  type="Status"
                  value={this.state.status}
                  onChange={e => this.setState({ status: e.target.value })}
                  name="status"
                  id="status-3"
                  placeholder="Enter status"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Filled-3">Filled</Label>
                <Input
                  type="Filled"
                  value={this.state.filled}
                  onChange={e => this.setState({ filled: e.target.value })}
                  name="Filled"
                  id="Filled-3"
                  placeholder="Enter Filled"
                />
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="contained"
              className="text-white btn-success"
              onClick={() => this.onAddItemHandeller()}
            >
              Add Item
            </Button>{" "}
            <Button
              variant="contained"
              className="text-white btn-danger"
              onClick={() => this.toggleEditAddressModal()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
