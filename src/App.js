import React,{Component} from 'react';
import logo from './logo.svg';
import Login from './components/login';
import Signup from './components/signup';
import Dashbord from './components/dashboard'
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      accessToken:null
    }
  }
  

  componentDidMount(){
    let aValue = localStorage.getItem('accessToken');
    this.setState({accessToken:aValue})
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
        {this.state.accessToken?<Dashbord />:<Login />} 
        </header>
      </div>
    );
  }
}

export default App;
