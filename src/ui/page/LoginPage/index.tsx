import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import AuthService from '../../../service/AuthService';
import "./style.css";

type Props = {
    authService: AuthService
};
type State = {
    email: string,
    password: string,
    isMember: boolean,
};
export default class LoginPage extends React.Component<Props, State>{
    state = {
        email: "",
        password: "",
        isMember: false,
    } as State;

    constructor(props: Props){
        super(props);
        this.onClickLogin = this.onClickLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSignInWithGoogle = this.onSignInWithGoogle.bind(this);
    }

    onClickLogin(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault(); //prevent change page
        this.props.authService.signInWithEmailPassword(this.state.email, this.state.password);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log({[name]: value  })
    
        // @ts-ignore
        this.setState({
          [name]: value
        }as State);
    }

    onSignInWithGoogle(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        this.props.authService.signInWithGoogle();
    }


    render(){
        return(
            <div className="loginBackground">
                <Container>
                    <div className="login-box">
                    <Form id="loginForm" onSubmit={this.onClickLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email" 
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                />
                            <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                name="password"
                                type="password" 
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                />
                        </Form.Group>
                        <Button 
                            variant="primary" 
                            type="submit"
                            >
                            Login
                        </Button>
                        <br/>
                        <Button 
                            onClick={this.onSignInWithGoogle}
                        >
                            Sign In with Google
                        </Button>

                    </Form>
                    </div>
                </Container>
            </div>
        )
    }

}
