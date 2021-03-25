import React from 'react';
import '.style.css';
import { Container } from 'react-bootstrap';

type Props = {};
type State = {

};

export default class BusMapperPage extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);
    }


    //require the whole database mySQL convert to this database
    //hardcode the company (destination) address
    render(){
        return (
            <Container>

            </Container>
        )
    }
}