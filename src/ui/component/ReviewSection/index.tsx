import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Rating from 'react-rating';
import { Review } from '../../../domain/backendDos';
import { CreateReviewRequestDto } from '../../../domain/dto/backendDtos';
import BackendExtService from '../../../extService/BackendExtService';
import './style.css';

type Props = {
    reviews?: Review[]
    onLoadedNewReview: (data: Review)=>void,
    onLoadedReviewList: (data: Review[]) => void,
    productId: string
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
        BackendExtService.fetchAllReviews(this.props.onLoadedReviewList);
    }

    handleRatingChange(value: number) {
        this.rating = value;
    }

    onClickformSubmit(event: React.MouseEvent<any>) {
        event.preventDefault();
        BackendExtService.createNewReview(this.props.onLoadedNewReview, {
            productId: this.props.productId,
            userName: this.state.inputForm.userName!,
            rating: this.rating,
            comment: this.state.inputForm.comment
        } );
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
            <Form onSubmit={this.onClickformSubmit}>
                <span>Write a review</span>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="userName"
                        value={this.state.inputForm.userName}
                        placeholder="e.g. Paul" 
                        onChange={this.handleInputChange}
                    />
                </Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <div className="radio rating">
                        <Rating
                            emptySymbol={<FontAwesomeIcon style={{color: "#AAAAAA"}} icon={faStar}/>}
                            fullSymbol={<FontAwesomeIcon style={{color: "#AA0000"}} icon={faStar}/>}
                            onChange={this.handleRatingChange}
                        />
                    </div>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="comment"
                        value={this.state.inputForm.comment}
                        onChange={this.handleInputChange}
                    />
                </Form.Group>
                <Button className="btn btn-default" type="submit">
                    Submit
                </Button>
            </Form> 
        )
    }

    renderProductReviewList(){
        if(!this.props.reviews){
            return null;
        }
        const reviews: JSX.Element[] = [];
        for(let review of this.props.reviews){
            reviews.push(
                <div className="reviewContainer" key={review.reviewId}>
                    <div className="review username">
                        <span>Display Name: </span>{review.userName}
                    </div>
                    <div className="review rating">
                        <span>Rating: </span>{review.rating}
                    </div>
                    <div className="review comment">
                        <span>Comment: </span>{review.comment}
                    </div>
                </div>
            )
        }
        return reviews;
    }

    render(){
        return (
            <div id="reviewSection">
                <div className="review commentBox">
                    {this.renderCommentBox()}
                </div>
                <div className="reviewListContainer">
                    {this.renderProductReviewList()}
                </div>
            </div>
        )
    }
}