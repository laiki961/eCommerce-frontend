import React from 'react';
import { Breadcrumb, Button, Container, Toast } from 'react-bootstrap';
import { ProductItem } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import ShoppingCartService from '../../../service/ShoppingCartService';
import "./style.css";

type Props = { 
    shoppingCartService: ShoppingCartService
};
type State = {
    productDetails?: ProductItem, //since there is nth at the beginning
    isShowToast: boolean
};

export default class ProductDetailsPage extends React.Component<Props, State>{
    state = {
        isShowToast: false
    } as State;

    constructor(props: Props){ // Step 2: props = shopingCartService: this.shoppingCartService
        super(props);

        this.onLoadedProductDetails = this.onLoadedProductDetails.bind(this);
        this.onClickAddToCartButton = this.onClickAddToCartButton.bind(this);
        this.onCloseToast = this.onCloseToast.bind(this)
    }

    componentDidMount(){
        BackendExtService.getProductDetails(this.onLoadedProductDetails)
    }

    onLoadedProductDetails(data: ProductItem){
        this.setState({productDetails: data});
    }
    
    onClickAddToCartButton(){
        const shoppingCartService = this.props.shoppingCartService;
        const productDetails = this.state.productDetails!;

        shoppingCartService.addToCart(productDetails.productId);
        this.setState({
            isShowToast: true
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

                <h1>{productDetails.productName}</h1>
                <img className="bannerImage" src={productDetails.imageUrl} alt={"Product "+ productDetails.productName + " image"}/>
                
                <h3>Description:</h3>
                <p>{productDetails.description}</p>

                <div><span className="priceTag">HK$ </span>{productDetails.price}</div>
                <Button 
                    variant="primary"
                    onClick={this.onClickAddToCartButton}
                    >
                        Add to cart
                </Button>
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