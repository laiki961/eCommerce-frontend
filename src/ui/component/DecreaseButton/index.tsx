import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

type Props = {
    count: number;
};
type State = {};

export default class DecreaseButton extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);

        this.decrease = this.decrease.bind(this);
    }

    componentDidMount(){
        
    }

    decrease(){
        this.setState({count: this.props.count - 1})
    }

    render(){
        return (
            <FontAwesomeIcon 
                className="quantity icon" 
                icon={faMinus}
                onClick={this.decrease}
            />
            // <button onClick={this.decrease}> - </button>
        )
    }
}