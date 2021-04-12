import {faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Rating from 'react-rating';
import { Review } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import './style.css';

type Props = {
    reviews?: Review[]
    onLoadedNewReview: (data: Review)=>void,
    onLoadedReviewList: (data: Review[]) => void,
    productId: string,
    shouldShowWriteReview?: (shouldShowWriteReview: boolean) => void,
    shouldShowReviewList?: (shouldShowReviewList: boolean)=> void
};
type State = {
    inputForm: {
        userName: string,
        comment: string
    }
};

export default class ReviewSection extends React.Component<Props, State> {
    state = {
        inputForm: {
            userName: "",
            comment: ""
        }
    } as State;

    rating: number = -1;

    constructor(props: Props) {
        super(props);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClickformSubmit= this.onClickformSubmit.bind(this);
    }

    componentDidMount(){
        BackendExtService.fetchAllReviews(this.props.onLoadedReviewList, this.props.productId);
    }

    handleRatingChange(value: number) {
        this.rating = value;
    }

    onClickformSubmit(event: React.MouseEvent<any>) {
        event.preventDefault();
        if(this.state.inputForm.userName! != null && this.rating != -1 && this.state.inputForm.comment != ""){
            BackendExtService.createNewReview(this.props.onLoadedNewReview, {
                productId: this.props.productId,
                userName: this.state.inputForm.userName!,
                rating: this.rating,
                comment: this.state.inputForm.comment
            } )
            alert("You have submited a review, please click 'Show Review' to find out the lastest review.");
        }else{
            alert("Please complete all the input fields to submit.")
        }
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target; //input
        const value = target.value;
        const name = target.name;
        this.setState((prevState) => ({
            inputForm:{
                ...prevState.inputForm,
                [name]: value
            }
        }));
    }

    renderCommentBox(){
        return(
            <div className="review commentBox">
            <Form onSubmit={this.onClickformSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                <Row>
                    <Col>
                    <Form.Label>Display Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="userName"
                            value={this.state.inputForm.userName}
                            placeholder="e.g. Paul" 
                            onChange={this.handleInputChange}
                        />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <div className="writeReviewComment label">
                        <Form.Label>Comment</Form.Label>
                    </div>
                    <div className="writeReviewRating">
                        <Form.Label ><span>Rating</span></Form.Label>
                            <Rating
                                emptySymbol={<FontAwesomeIcon style={{color: "#AAAAAA"}} icon={faStar}/>}
                                fullSymbol={<FontAwesomeIcon style={{color: "#AA0000"}} icon={faStar}/>}
                                onChange={this.handleRatingChange}
                            />
                    </div>
                    <div id="writeReviewComment">
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name="comment"
                            value={this.state.inputForm.comment}
                            onChange={this.handleInputChange}
                        />
                    </div>
                </Form.Group>
                <Button className="btn btn-danger button-cancel" >
                    Cancel
                </Button>
                <Button className="btn btn-default button-submit" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        )
    }

    renderProductReviewList(){
        const noreview: JSX.Element[] = [<div>No reviews for this product</div>];
        if(!this.props.reviews){
            return noreview;
        }
        const reviews: JSX.Element[] = [];
        for(let review of this.props.reviews){
            reviews.push(
                <div id="reviewContainer" key={review.reviewId}>
                    <Row>
                        <Col sm={3}>
                            <div className="review username">
                                <span className="reviewTitle">Display Name </span><br/>
                                <span className="reviewSubject">{review.userName}</span>
                            </div>
                            <div className="review rating">
                                <span className="reviewTitle">Rating</span><br/>
                                <Rating 
                                    emptySymbol={<FontAwesomeIcon style={{color: "#AAAAAA"}} icon={faStar}/>}
                                    fullSymbol={<FontAwesomeIcon style={{color: "#AA0000"}} icon={faStar}/>}
                                    initialRating={review.rating}
                                    readonly
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="review comment">
                                <span className="reviewTitle">Comment</span><br/>
                                <span className="reviewSubject">{review.comment}</span>
                            </div>
                        </Col>
                    </Row>
                    {/* <div className="review username">
                        <span>Display Name: </span>{review.userName}
                    </div>
                    <div className="review rating">
                        <span>Rating: </span>{review.rating}
                    </div>
                    <div className="review comment">
                        <span>Comment: </span>{review.comment}
                    </div> */}
                </div>
            )
        }
        return reviews;
    }

    render(){
        return (
            <Container>
                {
                    (this.props.shouldShowWriteReview)?(this.renderCommentBox()):
                    (null)
                }
                    {/* {this.renderCommentBox()} */}
                {
                    (this.props.shouldShowReviewList)?(<div id="reviewListContainer">{this.renderProductReviewList()}</div>):
                    (null)
                }
                {/* {this.renderProductReviewList()} */}
            </Container>
        )
    }
}