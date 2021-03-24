import React from 'react';
import "./style.css";

type Props = {
    updateQuantity: (productId: number, quantity: number) => void,
    quantity: number;
    productId: number;
};
type State = {};

export default class Quantity extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);
        this.onClickPlusButton = this.onClickPlusButton.bind(this);
        this.onClickMinusButton = this.onClickMinusButton.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onClickPlusButton(){
        this.props.updateQuantity(this.props.productId, this.props.quantity+1)
    }

    onClickMinusButton(){
        //if (quantity <=1 ) return
        this.props.updateQuantity(this.props.productId, this.props.quantity-1)
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>){
        const target = event.target; //input
        const value = target.value;

        this.props.updateQuantity(this.props.productId, +value);
    }

    render(){
        return (
            <div>
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
                    value={this.props.quantity}
                    disabled
                    onChange={this.handleInputChange}
                />
                <div
                    className="quantity-add quantity-icon" 
                    onClick={this.onClickPlusButton}
                >
                +
                </div>
            </div>
        )
    }
}