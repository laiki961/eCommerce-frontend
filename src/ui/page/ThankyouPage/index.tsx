import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container } from 'react-bootstrap';

type Props = {};
type State = {};

export default class ThankyouPage extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);
    }

    render(){
        return (
                <Container>
                    <FontAwesomeIcon className="thankyou-icon" icon={faCheckCircle}/>
                    <h1 className="thankyou-title">Thank you</h1>
                    <h2 className="thankyou-content">You order was completed successfully</h2>
                </Container>
        )
    }

}