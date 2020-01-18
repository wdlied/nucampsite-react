import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, 
    BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,
    Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    if (comments) {
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map( (comment) => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text}<br/>
                                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );
                })}
                <CommentForm />
            </div>
        );
    } 
    return(<div />);
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return ( 
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    } 
    return (<div />);
}

class CommentForm extends Component {

    constructor(props) {
        super(props);
     
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
        this.toggleModal();
    }

    render() {
        return(
            <React.Fragment>
                <Button outline color="secondary" onClick={this.toggleModal}><i className="fa fa-pencil"></i> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <div>
                                    <Label htmlFor="rating">Rating</Label>
                                </div>
                                <div className="form-group">
                                    <Control.select model=".rating" name="rating"
                                            className="form-control" defaultValue="1">
                                        <option value="1" >1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </div>
                                <div>
                                    <Label htmlFor="author">Your Name</Label>
                                </div>
                                <div className="form-group">
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="feedback">Comment</Label>
                                </div>
                                <div className="form-group">
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </div>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
            </React.Fragment>
        );
    }
}

export default CampsiteInfo;