import React from 'react';
import { Review } from '../../../domain/backendDos';
import './style.css';

type Props = {
    reviews?: Review[]
};
type State = {};

export default class Reviews extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);
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
                        {review.username}
                    </div>
                    <div className="review rating">
                        {review.rating}
                    </div>
                    <div className="review comment">
                        {review.comment}
                    </div>
                </div>
            )
        }
        return reviews;
    }

    render(){
        return (
            <div className="reviewListContainer">
                {this.renderProductReviewList}
            </div>
        )
    }
}