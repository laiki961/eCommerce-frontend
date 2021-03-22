import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

type Props = {
    count: number;
};
type State = {};

export default class IncreaseButton extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);

        this.increase = this.increase.bind(this);
    }

    componentDidMount(){}

    increase(){
        this.setState({count: this.props.count + 1})
    }

    render(){
        return (
            <FontAwesomeIcon 
                className="quantity icon" 
                icon={faPlus}
                onClick={this.increase}
            />
            // <button onClick={this.increase}> + </button>
        )
    }
}