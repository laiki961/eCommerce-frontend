import React from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row, Toast } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductItem } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import ShoppingCartService from '../../../service/ShoppingCartService';
import Quantity from '../../component/Quantity';
import Image from '../../component/Image';
import "./style.css";


type RouterParams = {
    productId: string
}

type Props = 
    RouteComponentProps<RouterParams> & {
        shoppingCartService: ShoppingCartService
    };
type State = {
    productDetails?: ProductItem, //since there is nth at the beginning
    isShowToast: boolean,
    quantity: number,
    imageIndex: number,
    selectedOption: string
};

class ProductDetailsPage extends React.Component<Props, State>{
    state = {
        imageIndex: 0,
        quantity: 1,
        isShowToast: false
    } as State;

    constructor(props: Props){ // Step 2: props = shopingCartService: this.shoppingCartService
        super(props);

        this.onLoadedProductDetails = this.onLoadedProductDetails.bind(this);
        this.onClickAddToCartButton = this.onClickAddToCartButton.bind(this);
        this.onCloseToast = this.onCloseToast.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.onClickImage = this.onClickImage.bind(this);

        // this.onValueChange = this.onValueChange.bind(this);
        this.onClickformSubmit = this.onClickformSubmit.bind(this);
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
            [name]: value //district: Kwun -> trigger rerender
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
            <div>
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
                                <span className="priceTag details">HK$ </span>{productDetails.price}
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
                {this.renderReviewCommentBox()}
            </div>
        )
    }

    onCloseToast(){
        this.setState({
            isShowToast: false
        });
    }



    onValueChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        this.setState({
          selectedOption: event.target.value
        });
    }

    onClickformSubmit(event: React.MouseEvent<any>) {
        event.preventDefault();
        console.log(this.state.selectedOption)
    }

    renderReviewCommentBox(){
        return(
        <div className="review commentBox">
            <Form onSubmit={this.onClickformSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control type="text" placeholder="e.g. Paul" />
                </Form.Group>
                <Form.Control>
                    <Form.Label>Rating</Form.Label>
                    <div className="radio">
                        <label>1</label>
                        <input
                            checked={this.state.selectedOption === "1"}
                            type="radio"
                            value="1"
                            onChange={this.onValueChange}
                        />
                    </div>
                </Form.Control>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button className="btn btn-default" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
       )
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
                            (this.state.productDetails) ? this.renderProductDetails() : (  //true: this.renderProductDetails(); false: Loading...
                                <div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>
                            )
                        }
                        
                    </Container>
                </div>
        );
    }
}
export default withRouter(ProductDetailsPage);