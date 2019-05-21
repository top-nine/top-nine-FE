import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import AddForm from '../TopNineList/addform';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class NavBar extends React.Component {
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


    render() {
        return (
            <Navbar fixed="top" bg="light" expand="lg">
                <Navbar.Brand href="/">Top Nine</Navbar.Brand>
                <Button className="btn  ml-auto mr-1" variant="outline-success" onClick={this.handleShow}>Add</Button>
                <AddForm isAdd={true} show= {this.state.showForm} getTopNine={this.getTopNine} handleClose= {this.handleClose} handleShow= {this.handleShow}/>
            </Navbar>
        );
    }
}
