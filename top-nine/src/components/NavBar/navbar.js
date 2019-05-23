import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import AddForm from '../TopNineList/addform';
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

 class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            showForm: false
        };
    }
    handleClose = () =>{
        this.setState({ showForm: false });
        this.props.getTopNine();
      }
    
      handleShow = () =>{
        this.setState({ showForm: true });
      }

    logout = () => {
        window.localStorage.removeItem('auth');
        this.props.history.push('/home');
    }

    render() {
        return (
            <React.Fragment>
            <Navbar className='nav-bar' fixed="top"   expand="lg">
                <Navbar.Brand href="/">Top9</Navbar.Brand>
                <div>
                    { (this.props.topNine && this.props.topNine.length < 9) &&
                     <Button className="btn  ml-auto mr-1" variant="success" onClick={this.handleShow}>Add</Button>}
                     { localStorage.getItem('auth') &&
                     <Button className="btn  ml-auto mr-1" variant="success" onClick={this.logout}>Log out</Button>}
                </div>
            </Navbar>
            <AddForm getTopNine={this.props.getTopNine} isAdd={true} show= {this.state.showForm} handleClose= {this.handleClose} handleShow= {this.handleShow}/>
            </React.Fragment>
        );
    }
}

  
  export default connect(
    null,null
  )(NavBar);
  