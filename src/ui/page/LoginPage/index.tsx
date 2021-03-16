import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Login } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import "./style.css";

type Props = {};
type State = {
    user?: Login
};
export default class LoginPage extends React.Component<Props, State>{
    state = {} as State;

    constructor(props: Props){
        super(props);
    }

    // componentDidMount(){
    //     BackendExtService.login(+this.state.user!.userId, this.onLoadedUserDetails)
    // }

    // onLoadedUserDetails(data: Login){
    //     this.setState({user: data});
    // }

    // renderLogin(){
    //     if(!this.state.user){
    //         return null; 
    //     }
    //     const 
    //     for(let userId of Object.keys(this.state.user)){
            
    //     }
    // }

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
        return(
            <div>
                <img src="https://wallpaperaccess.com/full/209731.jpg" alt="loginBackgroundPic"/>
                <Container>
                    <Form className="loginForm">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email"
                                onChange={this.handleInputChange}
                                />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Password"
                                onChange={this.handleInputChange}
                                />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="remember me" />
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit" 
                            // onChange={this.renderLogin}
                            >
                            Login
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }

}
