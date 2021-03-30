import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { ProductMap } from '../../../domain/backendDos';

type Props = {
    shouldShowRemoveButton: boolean,
    displayItems?: ProductMap //from ShoppingCartPage <ProductList displayItems={this.state.shoppingCartItems}/>
    onClickRemoveFromCartButton?: (productId: number)=> void //to pass the function to
};
type State = {};

export default class ProductList extends React.Component<Props, State>{
    renderListItems(){
        const cartItems: JSX.Element[] = [];
    
        if(!this.props.displayItems){
            return null;
        }
    
        for(let productId of Object.keys(this.props.displayItems)){
            // Get the actual shopping cart items form this.props.displayItems by the key "productId"
            // Prefixed a "+" to productId to convert it form string to number
            const item = this.props.displayItems[+productId];
            cartItems.push(
            <tr>
                <td><img className="cartImg" src={item.imageUrl}/></td>
                <td>{item.productName}</td>
                <td>HK$ {item.price}</td>
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
        return(
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    {
                        (this.props.shouldShowRemoveButton)?(
                            <th>Action</th>
                        ): null
                    }
                </tr>
            </thead>
            <tbody>
                {/* {Go to the method above: Render the item rows into the table} */}
                {this.renderListItems()}
            </tbody>
        </Table>
        );
    }

}

