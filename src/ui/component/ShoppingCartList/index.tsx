import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { ShoppingCartProduct } from '../../../domain/backendDos';
import Quantity from '../Quantity';

type Props = {
    onUpdatedQuantity: (productId: number, quantity: number) => void,
    shouldShowRemoveButton: boolean,
    displayItems?: ShoppingCartProduct, //from ShoppingCartPage <ProductList displayItems={this.state.shoppingCartItems}/>
    onClickRemoveFromCartButton?: (productId: number)=> void //to pass the function to
};
type State = {};

export default class ShoppingCartList extends React.Component<Props, State> {
    state = {} as State;

    constructor(props: Props) {
        super(props);
    }

    renderListItems(){
        const cartItems: JSX.Element[] = [];
    
        if(!this.props.displayItems){
            return null;
        }
    
        for(let productId of Object.keys(this.props.displayItems)){
            // Get the actual shopping cart items form this.props.displayItems by the key "productId"
            // Prefixed a "+" to productId to convert it form string to number
            const item = this.props.displayItems[+productId]; // string to number
            const subtotal = item.price * this.props.displayItems[+productId].quantity;
            cartItems.push(
            <tr>
                <td>
                    <img className="cartImg" src={item.imageUrl}/>
                    {item.productName}
                </td>
                <td>
                    <div>
                        <Quantity
                            productId={this.props.displayItems[+productId].productId} 
                            updateQuantity={this.props.onUpdatedQuantity}
                            quantity={this.props.displayItems[+productId].quantity}
                        />
                    </div>
                </td>
                <td>
                    <span>Unit price: </span>HK$ {item.price}
                    <br/>
                    <span>Subtotal: </span>HK$ {subtotal}
                </td>
                {
                    (this.props.shouldShowRemoveButton)?(
                        <td>
                            <Button 
                                variant="danger" 
                                onClick={() => this.props.onClickRemoveFromCartButton!(item.productId)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </Button>
                        </td>
                    ): null
                }
            </tr>
            );
        }
        return cartItems;
    }

    render(){
        // return null;
            return (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            {
                                (this.props.shouldShowRemoveButton)?(
                                    <th>Remove</th>
                                ): null
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* {Go to the method above: Render the item rows into the table} */}
                        {this.renderListItems()}
                    </tbody>
                </Table>
        )
    }
}