
import React from 'react';
import { connect } from 'react-redux';
import { itemPost, itemPut } from '../../actions';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './topnine.css';

class AddForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            image_url: '',
            titleError: '',
            descriptionError: '',
        }
    }

    componentWillReceiveProps(){
        if (!this.props.isAdd){
            this.setState({
                id: this.props.item.id,
                title: this.props.item.title,
                description: this.props.item.description,
                image_url: this.props.item.image_url
            });
        }
    }
 
    inputChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    clearState = () => {
        this.setState({
            id: '',
            title: '',
            description: '',
            image_url: ''
        });
    }
 
        
    add = () => {
        this.props.itemPost(this.state)
        .then(() =>{this.props.getTopNine();})
        .then(() =>{        
            this.clearState();
            this.setState({titleError: '',
            descriptionError: ''});
            this.props.handleClose();
        });

    }

    update = () => {
        this.props.itemPut({
            id: this.state.id, 
            title: this.state.title, 
            description: this.state.description,
            image_url: this.state.image_url
        })
        .then(() =>{})   
        .then(() =>{        
            this.clearState();
            this.props.handleClose();
        });
    }

    buttonClicked = (event) => {
        event.preventDefault();


        if (this.props.isAdd){

            if (this.state.title === '' || this.state.title === null){
                this.setState({titleError: 'Title required',
                               descriptionError: ''});
                return;
            }
    
    
            if (this.state.description === '' || this.state.description === null){
                this.setState({titleError: '', 
                               descriptionError: 'Description required'});
                return;
            }
    
            this.add();
        }
        else
            this.update();
    }

    render() {
        return (

            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.isAdd ? 'Add' : 'Update'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Label className='error-msg'>{ this.state.titleError }</Form.Label>
                            <Form.Control type="text" placeholder="Title" name='title' defaultValue={this.state.title} onChange={this.inputChanged}/>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Label className='error-msg'>{ this.state.descriptionError }</Form.Label>
                            <Form.Control type="text" placeholder="Description" name='description' defaultValue={this.state.description} onChange={this.inputChanged}/>
                        </Form.Group>
 
                        <Button variant="primary" type="submit" onClick={this.buttonClicked}>
                            {this.props.isAdd ? 'Add' : 'Update'}
                        </Button>
                    </Form>
            </Modal.Body>
            </Modal>
        );
    }
}


export default connect(null, { itemPost, itemPut})(AddForm);
