import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
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
        this.onSignInWithFacebook = this.onSignInWithFacebook.bind(this);
    }

    onClickLogin(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault(); //prevent change page
        this.props.authService.signInWithEmailPassword(this.state.email, this.state.password, this.onSignInError);
    }

    onSignInWithGoogle(){
        this.props.authService.signInWithGoogle(this.onSignInError);
    }

    onSignInWithFacebook(){
        this.props.authService.signInWithFacebook(this.onSignInError);
    }

    onSignInError(code: string, message: string){
        alert(code+": " + message);
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

    render(){
        return(
            <div className="content loginBackground">
                <Container>

                {/* <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form className="form-signin">
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus>
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required>
                                    <label for="inputPassword">Password</label>
                                </div>

                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1">
                                    <label className="custom-control-label" for="customCheck1">Remember password</label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                <hr className="my-4">
                                <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
                                <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    </div>
                </div> */}



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
                                className="button"
                                variant="primary" 
                                type="submit"
                                >
                                Login
                            </Button>
                            <br/>
                            
                        </Form>

                        <GoogleLoginButton onClick={this.onSignInWithGoogle}/>
                        <FacebookLoginButton onClick={this.onSignInWithFacebook}/>
                    </div>
                </Container>
            </div>
        )
    }

}
