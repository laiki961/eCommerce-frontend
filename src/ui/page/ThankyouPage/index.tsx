import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container } from 'react-bootstrap';
import "./style.css";

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
                    <div id="thankyouContent" className="content">
                        <FontAwesomeIcon id="thankyou-icon" icon={faCheckCircle} />
                        <div id="thankyou-title">Thank You</div>
                        <div id="thankyou-content">You order was completed successfully</div>
                    </div>
                </Container>
        )
    }

}