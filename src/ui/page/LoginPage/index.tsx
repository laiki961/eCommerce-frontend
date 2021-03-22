import React, { FormEvent } from 'react';
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
        this.onLoadedUserDetails = this.onLoadedUserDetails.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount(){
        if(!this.state.user){
            return null; 
        }
        BackendExtService.login(+this.state.user!.userId, this.onLoadedUserDetails)
    }

    onLoadedUserDetails(data: Login){
        this.setState({user: data});
    }

    loginAttempt(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        this.setState({},()=>{
            BackendExtService.login(+this.state.user!.userId, this.onLoadedUserDetails)
        })
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) {
        const target = event.target;
        const value = target.type;
        const name = target.name;
    
        // @ts-ignore
        this.setState({
          [name]: value
        }as State);
    }

    render(){
        return(
            <div className="loginBackground">
                <Container>
                    <div className="login-box">
                    <Form id="loginForm" onSubmit={this.loginAttempt}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter email"
                                onChange={this.handleInputChange}
                                />
                            <Form.Text className="text-muted"></Form.Text>
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
                            >
                            Login
                        </Button>
                    </Form>
                    </div>
                </Container>
            </div>
        )
    }

}
