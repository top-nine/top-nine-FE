
import React from 'react';
import { connect } from 'react-redux';
import { itemPost, itemPut } from '../../actions';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            image_url: '',
        }
    }

    componentWillReceiveProps(){
        if (!this.props.isAdd){
            this.setState({
                title: this.props.item.title,
                description: this.props.item.description,
                image_url: this.props.item.image_url
            });
        }
    }
    inputChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    add = () => {
        this.props.itemPost(this.state);
        this.props.handleClose();
    }

    update = () => {
        this.props.itemPut({
            id: this.props.id, 
            title: this.state.title, 
            description: this.state.description, 
            image_url: this.state.image_url});

       
            this.props.handleClose();
    }

    buttonClicked = (event) => {
        event.preventDefault();

        if (this.props.isAdd)
            this.add();
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
                            <Form.Control type="text" placeholder="Title" name='title' defaultValue={this.state.name} onChange={this.inputChanged}/>
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description" name='description' defaultValue={this.state.age} onChange={this.inputChanged}/>
                        </Form.Group>

                        <Form.Group controlId="image_url">
                            <Form.Label>Height</Form.Label>
                            <Form.Control type="text" placeholder="Image URL" name='image_url' defaultValue={this.state.height} onChange={this.inputChanged}/>
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
