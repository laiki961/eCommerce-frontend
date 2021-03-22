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
            <div>
                <Container>
                    <FontAwesomeIcon icon={faCheckCircle}/>
                    <h1>Thank you</h1>
                    <h2>You order was completed successfully</h2>
                </Container>
            </div>
        )
    }

}