import React from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row} from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PaymentDetails, PersonalInformation, ShoppingCartProduct, Transaction } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import AuthService from '../../../service/AuthService';
import ShoppingCartList from '../../component/CartList';
import "./style.css";

type RouterParamProps = {
    transactionId: string
};
type Props = RouteComponentProps<RouterParamProps> & {};
type State = {
    transaction?: Transaction
    // paymentDetails: PaymentDetails;
    creditCardNumber: string,
    expiryDate: string,
    cvv: string,
    firstName: string,
    lastName: string,
    email: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    zip: string
    // personalInformation: PersonalInformation;
};

class CheckoutPage extends React.Component<Props, State>{
    state = {
        // paymentDetails: {
            creditCardNumber: "",
            expiryDate: "",
            cvv: "",
        // },
        // personalInformation: {
            firstName: "",
            lastName: "",
            email: "",
            addressLine1: "",
            addressLine2: "",
            city: ""
        // }
        // creditCardNumber: "",
        // expiryDate: "",
        // cvv: ""
    } as State; //Initial State

    constructor(props: Props){
        super(props);
        this.onLoadedTransaction = this.onLoadedTransaction.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClickPlaceOrderButton = this.onClickPlaceOrderButton.bind(this);
    }

    componentDidMount(){
        AuthService.getIdToken()
            .then((idToken) => {
                BackendExtService.getTransaction(idToken, +this.props.match.params.transactionId, this.onLoadedTransaction);
            })
        //BackendExtService.getTransaction(+this.props.match.params.transactionId, this.onLoadedTransaction)
    }

    onLoadedTransaction(data: Transaction){
        this.setState({
            transaction: data
        });
    }

    renderProductList(){
        if(!this.state.transaction){
            return null;
        }
        const items = this.state.transaction!.items;
        const shoppingCartProduct: ShoppingCartProduct = {};
        for(let item of items){
            shoppingCartProduct[item.details.productId] = {
                productId: item.details.productId,
                productName: item.details.productName,
                description: item.details.description,
                price: item.details.price,
                imageUrl: item.details.imageUrl,
                quantity: item.quantity
            }
        }
        return (
            <section>
                <ShoppingCartList
                    shouldEnableQuantityButton={false}
                    shouldShowRemoveButton={false}
                    displayItems={shoppingCartProduct}
                />
                <hr/>
                <div className="price checkout">
                    <span className="priceTotal checkout">Total: </span>
                    <span className="priceTag checkout">HK$ </span>
                    {this.state.transaction.total}
                </div>
            </section>
        )   
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        // @ts-ignore
        this.setState({
          [name]: value
        });
    }


    onClickPlaceOrderButton(){
        this.openThankyouPage();
    }


    openThankyouPage(){
        //widnow = browser's function
        window.location.href = "#/thankyou";
    }


    render(){
        return (
                <div className="content">
                <Container >
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/">All Products</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/cart">Shopping Cart</Breadcrumb.Item>
                        <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
                    </Breadcrumb>

                    <h1 className="checkout">Checkout</h1>
                    {this.renderProductList()}
                    <hr/>
                    <div>
                        <Row>
                        <Col>
                            <div className="billingInformation">
                                <h4>Personal Information</h4>
                                <Form>
                                    <Row>
                                        <Col>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control 
                                            name="firstName"
                                            value={this.state.firstName}
                                            placeholder="First name"
                                            onChange={this.handleInputChange}
                                        />
                                        </Col>
                                        <Col>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control 
                                            name="lastName"
                                            // value={this.state.personalInformation.lastName}
                                            value={this.state.lastName}
                                            placeholder="Last name"
                                            onChange={this.handleInputChange}
                                        />
                                        </Col>
                                    </Row>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                            name="email"
                                            value={this.state.email}
                                            type="email" 
                                            placeholder="name@example.com"
                                            onChange={this.handleInputChange} 
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="address1">
                                        <Form.Label>Address Line 1</Form.Label>
                                        <Form.Control
                                            name="addressLine1"
                                            value={this.state.addressLine1}
                                            placeholder="Room, floor, or apartment"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="address2">
                                        <Form.Label>Address Line 2</Form.Label>
                                        <Form.Control
                                            name="addressLine2"
                                            value={this.state.addressLine2}
                                            placeholder="Street"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="city">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            name="city"
                                            value={this.state.city}
                                            placeholder="Hong Kong"
                                            onChange={this.handleInputChange}
                                        />
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                            </div>
                        </Col>
                        <Col>
                        <div className="payment">
                            <h4>Payment Details</h4>
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="creditCardNumber">
                                            <Form.Label>Credit Card No.</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="creditCardNumber"
                                                value={this.state.creditCardNumber}
                                                placeholder="Credit Card Number"
                                                onChange={this.handleInputChange}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                    <Form.Group as={Col} controlId="expiryDate">
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="expiryDate"
                                            value={this.state.expiryDate}
                                            placeholder="Expiry Date"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="cvv">
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control 
                                            type="password"
                                            name="cvv"
                                            value={this.state.cvv}
                                            placeholder="CVV"
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    </Form.Row>
                                </Form>
                            </div>
                        </Col>
                        </Row>
                        <div className="checkout button">
                            <Button 
                                variant="primary" 
                                type="submit"
                                onClick={this.onClickPlaceOrderButton}
                            >
                                Place Order
                            </Button>
                        </div>
                    </div>
                </Container>
                </div>
                )
    }


}

export default withRouter(CheckoutPage);