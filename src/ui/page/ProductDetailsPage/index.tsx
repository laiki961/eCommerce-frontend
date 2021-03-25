import React from 'react';
import { Breadcrumb, Button, Col, Container, Row, Toast } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductItem } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import ShoppingCartService from '../../../service/ShoppingCartService';
import Quantity from '../../component/Quantity';
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
    quantity: number;
};

class ProductDetailsPage extends React.Component<Props, State>{
    state = {
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
                            <div className="lds-ellipsis loading"><div></div><div></div><div></div><div></div></div>
                        )
                    }
                </Container>
        );
    }
}
export default withRouter(ProductDetailsPage);