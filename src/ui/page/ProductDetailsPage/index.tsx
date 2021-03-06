import React from 'react';
import { Breadcrumb, Button, Col, Container, Row, Toast } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductItem, Review } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import ShoppingCartService from '../../../service/ShoppingCartService';
import Quantity from '../../component/Quantity';
import Image from '../../component/Image';
import "./style.css";
import ReviewSection from '../../component/ReviewSection';


type RouterParams = {
    productId: string
}

type Props = 
    RouteComponentProps<RouterParams> & {
        shoppingCartService: ShoppingCartService
    };
type State = {
    productDetails?: ProductItem, //since there is nth at the beginning
    reviews: Review[],
    isShowToast: boolean,
    quantity: number,
    imageIndex: number,
    shouldShowWriteReview: boolean,
    shouldShowReviewList: boolean
};

class ProductDetailsPage extends React.Component<Props, State>{
    state = {
        imageIndex: 0,
        quantity: 1,
        isShowToast: false,
        shouldShowWriteReview: false,
        shouldShowReviewList: false
    } as State;

    constructor(props: Props){ // Step 2: props = shopingCartService: this.shoppingCartService
        super(props);

        this.onLoadedProductDetails = this.onLoadedProductDetails.bind(this);
        this.onClickAddToCartButton = this.onClickAddToCartButton.bind(this);
        this.onCloseToast = this.onCloseToast.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.onClickImage = this.onClickImage.bind(this);

        this.onLoadedNewReview = this.onLoadedNewReview.bind(this);
        this.onLoadedReviewList = this.onLoadedReviewList.bind(this);

        this.onClickShowWriteReview = this.onClickShowWriteReview.bind(this);
        this.onClickShowReviewList = this.onClickShowReviewList.bind(this);

    }

    componentDidMount(){
        BackendExtService.getProductDetails(+this.props.match.params.productId, this.onLoadedProductDetails)
    }

    onLoadedProductDetails(data: ProductItem){
        this.setState({productDetails: data});
    }

    updateQuantity(productId: number, quantity: number){
        this.setState({quantity: quantity});
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const target = event.target; //input
        const value = target.value;
        const name = target.name;
    
        // @ts-ignore
        this.setState({
            [name]: value
            } as State);
    }

    onClickAddToCartButton(){
        const shoppingCartService = this.props.shoppingCartService;
        const productDetails = this.state.productDetails!;

        shoppingCartService.updateCart(productDetails.productId, this.state.quantity);
        this.setState({
            isShowToast: true
        });
    }

    onClickImage(imageIndex: number){
        console.log(imageIndex);
        this.setState({
            imageIndex: imageIndex
        })
    }

    renderProductImage(){
        if (!this.state.productDetails?.imageUrls) {
            return null;
        }
        const imageUrls: JSX.Element[] = [];
        
        // @ts-ignore
        for(let [index, image] of this.state.productDetails.imageUrls.entries()) {
            imageUrls.push(
                <Image
                    key={image.id}
                    imageIndex={index}
                    imageUrl={image.imageUrl}
                    onClickImage={this.onClickImage}
                />
            )
        }
        return imageUrls;
    }

    renderProductDetails(){
        const productDetails = this.state.productDetails!;
        return(
            <div id="productDetailsInfo">
                <Breadcrumb>
                    <Breadcrumb.Item href="#/">All Products</Breadcrumb.Item>
                    <Breadcrumb.Item active>{productDetails.productName}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col>
                        <div>
                            <img className="bannerImage" src={productDetails.imageUrls[this.state.imageIndex].imageUrl} alt={"Product "+ productDetails.productName + " image"}/>
                        </div>
                        {this.renderProductImage()}
                    </Col>
                    <Col>
                        <div className="product-details">
                            <h1 className-="title details">{productDetails.productName}</h1>
                            <h3>Description:</h3>
                            <p>{productDetails.description}</p>
                            <div className="price details">
                                <span className="priceTag details">CAD$ </span>{productDetails.price}
                            </div>
                            <div className="details-quantity">
                                <span>Quantity </span>
                                <Quantity
                                    productId={this.state.productDetails!.productId}
                                    quantity={this.state.quantity}
                                    updateQuantity={this.updateQuantity}
                                />
                                <Button 
                                    className="addtoCart button"
                                    variant="primary"
                                    onClick={this.onClickAddToCartButton}
                                >
                                    Add to cart
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="detailsReviewButtonContainer">
                    <div className="detailsReviewButton"><Button onClick={this.onClickShowWriteReview}>Write a Review</Button></div>
                    <div className="detailsReviewButton"><Button onClick={this.onClickShowReviewList}>Show Reviews</Button></div>
                </div>
            </div>
        )
    }

    onCloseToast(){
        this.setState({
            isShowToast: false
        });
    }

    onLoadedNewReview(data: Review){
        this.setState((prevState) => ({
            reviews: [
                data, ...prevState.reviews
            ]
        }));
    }

    onLoadedReviewList(data: Review[]){
        this.setState({reviews: data});
    }




    onClickShowWriteReview(){
        this.setState((prevState)=>({
            shouldShowWriteReview: !this.state.shouldShowWriteReview
        }));
    }

    onClickShowReviewList(){
        this.setState((prevState)=>({
            shouldShowReviewList: !this.state.shouldShowReviewList
        }));
    }

    render(){
        return (
            <div className="content">
                <Container id="productDetailPage" >
                    <div className="toastContainer">
                        <Toast show={this.state.isShowToast} onClose={this.onCloseToast} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">Your item has been successfully added to your cart!</strong>
                            </Toast.Header>
                        </Toast>
                    </div>
                    {
                        (this.state.productDetails) ? this.renderProductDetails() 
                        : (  //true: this.renderProductDetails(); false: Loading...
                            <div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>
                        )
                    }
                </Container>
                <div id="reviewSection">
                    <ReviewSection 
                        reviews={this.state.reviews}
                        onLoadedNewReview={this.onLoadedNewReview}
                        onLoadedReviewList={this.onLoadedReviewList}
                        productId={this.props.match.params.productId}
                        onClickShowWriteReview={this.onClickShowWriteReview}
                        shouldShowWriteReview={this.state.shouldShowWriteReview}
                        shouldShowReviewList={this.state.shouldShowReviewList}
                    />
                </div>
            </div>
        );
    }
}
export default withRouter(ProductDetailsPage);