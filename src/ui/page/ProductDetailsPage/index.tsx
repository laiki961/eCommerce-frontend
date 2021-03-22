import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Breadcrumb, Button, Col, Container, FormControl, Row, Toast } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductItem } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import ShoppingCartService from '../../../service/ShoppingCartService';
import DecreaseButton from '../../../ui/component/DecreaseButton';
import IncreaseButton from '../../../ui/component/IncreaseButton';
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
    isShowToast: boolean
    count: number;
};

class ProductDetailsPage extends React.Component<Props, State>{
    state = {
        count: 1,
        isShowToast: false
    } as State;

    constructor(props: Props){ // Step 2: props = shopingCartService: this.shoppingCartService
        super(props);
        this.state.count = 1;

        this.onLoadedProductDetails = this.onLoadedProductDetails.bind(this);
        this.onClickAddToCartButton = this.onClickAddToCartButton.bind(this);
        this.onCloseToast = this.onCloseToast.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClickPlusButton = this.onClickPlusButton.bind(this);
        this.onClickMinusButton = this.onClickMinusButton.bind(this);
    }

    componentDidMount(){
        BackendExtService.getProductDetails(+this.props.match.params.productId, this.onLoadedProductDetails)
    }

    onLoadedProductDetails(data: ProductItem){
        this.setState({productDetails: data});
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

        shoppingCartService.addToCart(productDetails.productId, this.state.count);
        this.setState({
            isShowToast: true
        });
    }

    onClickPlusButton(){
        this.setState({
            count: this.state.count+1
        });
    }

    onClickMinusButton(){
        this.setState({
            count: this.state.count-1
        });
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
                            <img className="bannerImage" src={productDetails.imageUrl} alt={"Product "+ productDetails.productName + " image"}/>
                        </div>
                    </Col>
                    <Col>
                        <div className="product-details">
                            <h1 className-="title title-details">{productDetails.productName}</h1>
                            <h3>Description:</h3>
                            <p>{productDetails.description}</p>
                            <div className="price details">
                                <span className="priceTag details">HK$ </span>{productDetails.price}
                            </div>
                            <div className="details-quantity">
                                <span>Quantity </span>
                                <div
                                    className="quantity-deduct quantity-icon" 
                                    onClick={this.onClickMinusButton}
                                >
                                -
                                </div>
                                <input 
                                    className="quantity quantity-input"
                                    type="number"
                                    placeholder="Quantity"
                                    name="count"
                                    value={this.state.count}
                                    onChange={this.handleInputChange}
                                />
                                <div
                                    className="quantity-add quantity-icon" 
                                    onClick={this.onClickPlusButton}
                                >
                                +
                                </div>
                                <Button 
                                    className="addtoCart"
                                    variant="primary"
                                    onClick={this.onClickAddToCartButton}
                                >
                                Add to cart
                                </Button>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
                
                
            </div>
        )
    }

    onCloseToast(){
        this.setState({
            isShowToast: false
        });
    }

    render(){
        return (
                <Container id="productDetailPage">
                    <div className="toastContainer">
                    <Toast show={this.state.isShowToast} onClose={this.onCloseToast} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="mr-auto">Your item has been successfully added to your cart!</strong>
                        </Toast.Header>
                    </Toast>
                    </div>
                    {
                        (this.state.productDetails) ? this.renderProductDetails() : (  //true: this.renderProductDetails(); false: Loading...
                            <div className="loading">Loading...</div>
                        )
                    }
                </Container>

        );
    }
}
export default withRouter(ProductDetailsPage);