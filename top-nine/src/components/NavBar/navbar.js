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
            <Navbar className='nav-bar' fixed="top" bg="light" expand="lg">
                <Navbar.Brand href="/">Top Nine</Navbar.Brand>
                <div>
                    <Button className="btn  ml-auto mr-1" variant="outline-success" onClick={this.handleShow}>Add</Button>
                    <Button className="btn  ml-auto mr-1" variant="outline-success" onClick={this.logout}>Log out</Button>
                </div>
            </Navbar>
            <AddForm isAdd={true} show= {this.state.showForm} getTopNine={this.getTopNine} handleClose= {this.handleClose} handleShow= {this.handleShow}/>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
      topNine: state.topNine
    };
  };
  
  export default connect(
    null,null
  )(NavBar);
  