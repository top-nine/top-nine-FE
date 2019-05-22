import React from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import {Tooltip, Overlay, Card, CardDeck, Button, ButtonGroup } from "react-bootstrap";
import { itemDelete, itemPut } from '../../actions';
import AddForm from './addform';

import "./topnine.css";

class TopNineCard extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      showForm: false,
    }
  }
  handleClose = () =>{
    this.setState({ showForm: false });
    this.props.getTopNine();
  }

  handleShow = () =>{
    this.setState({ showForm: true });
  }

  updateItem = (item) => {
    this.setState({
        id: item.id,
        title: item.title,
        description: item.description,
        image_url: item.image_url
    })

    this.props.itemPut(this.state);
}

  update = (event) =>{
    this.handleShow();
  }
  
  
  delete = (event) => {
    this.props.itemDelete(this.props.item.id)
    .then(() =>{this.props.getTopNine()});
  }

  render() {

    return (
      <React.Fragment>
      <AddForm isAdd={false} item={this.props.item} show={this.state.showForm} handleClose={this.handleClose} handleShow={this.handleShow} update={this.update} />

      <Card className="item-card">
        <div className='buttons'>
          <Button onClick={this.update} size="sm" variant="outline-primary">Update</Button>
          <Button onClick={this.delete} size="sm" variant="outline-danger">Delete</Button>
        </div>  
         
        <Card.Title>{this.props.item.title}</Card.Title>
        <Card.Text> {this.props.item.description} </Card.Text>
      </Card>
      </React.Fragment>
    
    );
  }
}

export default connect(null, { itemDelete, itemPut })(TopNineCard)