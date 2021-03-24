import React from 'react';
import { Breadcrumb, Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductItem, Transaction } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import ProductList from '../../component/ProductList';
import ShoppingCartList from '../../component/ShoppingCartList';
import "./style.css";

type RouterParamProps = {
    transactionId: string
};
type Props = RouteComponentProps<RouterParamProps> & {};
type State = {
    transaction?: Transaction
    creditCardNumber: string,
    expiryDate: string,
    cvv: string
};

class CheckoutPage extends React.Component<Props, State>{
    state = {
        creditCardNumber: "",
        expiryDate: "",
        cvv: ""
    } as State; //Initial State

    constructor(props: Props){
        super(props);
        this.onLoadedTransaction = this.onLoadedTransaction.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        BackendExtService.getTransaction(+this.props.match.params.transactionId, this.onLoadedTransaction)
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
        const checkoutItems: {[key: number]: ProductItem} = {};

        for(let item of items){
            checkoutItems[item.details.productId] = item.details;
        }
        return (
            <section>
                {/* <ShoppingCartList
                    // onUpdatedQuantity ={this.onUpdatedQuantity} //remove
                    shouldShowRemoveButton={false}
                    displayItems={checkoutItems} // checkoutItems -> ShoppingCartProduct ???
                    // onClickRemoveFromCartButton={this.onClickRemoveFromCartButton} // remove
                /> */}
                <ProductList
                    shouldShowRemoveButton={false}
                    displayItems={checkoutItems}
                />
                <h3><span>Total: HK$ {this.state.transaction.total}</span></h3>
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

    render(){
        return (
                <Container>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/">All Products</Breadcrumb.Item>
                        <Breadcrumb.Item href="#/cart">Shopping Cart</Breadcrumb.Item>
                        <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
                    </Breadcrumb>

                    <h1>Checkout</h1>
                    {this.renderProductList()}
                    <hr/>

                    <div>
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
                        <div className="billingInformation">
                            <h4>Billing Information</h4>
                            <Form>
                                <Row>
                                    <Col>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control placeholder="First name" />
                                    </Col>
                                    <Col>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control placeholder="Last name" />
                                    </Col>
                                </Row>
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Address Line 1</Form.Label>
                                    <Form.Control placeholder="Room, floor, or apartment" />
                                </Form.Group>
                                <Form.Group controlId="formGridAddress2">
                                    <Form.Label>Address Lind 2</Form.Label>
                                    <Form.Control placeholder="Street"/>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control placeholder="Hong Kong"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Zip</Form.Label>
                                    <Form.Control />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Container>
                )
    }


}

export default withRouter(CheckoutPage);