import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import config from '../../../config/config';
import './style.css';

type Props = {};
type State = {};

export default class ContactUsSection extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);
    }

    onCLickGetThereButton(event: React.MouseEvent<HTMLButtonElement>){
        window.open(
            config().busmapper.frontendBaseUrl + "/#/dest/EiZBbGRyaWNoIEJheSBSZCwgQWxkcmljaCBCYXksIEhvbmcgS29uZyIuKiwKFAoSCd8sWCl4AQQ0EU_PTF0tbPvlEhQKEglLSK9JdwEENBGAraT03BRFHQ",
            "_blank")!.focus();
    }

    render(){
        return (
            <section className="contactUsContainer">
                <Container>
                    <Row>
                        <Col md={6}>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.9576007882424!2d114.22593961495429!3d22.279595885334267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404017830f024bf%3A0x62f77245bde3831!2sAldrich%20Bay%20Rd%20%26%20Oi%20Yin%20St%2C%20Aldrich%20Bay!5e0!3m2!1sen!2shk!4v1617937417153!5m2!1sen!2shk" width="50%" height="200" style={{border:0}} loading="lazy"></iframe>
                        </Col>
                        <Col md={6}>
                            <div id="contactUs">
                                <h2>Contact Us</h2>
                                <p>Phone: 9616 9619</p>
                                <p>Address: Oi Yin Street, Aldrich Bay Road</p>
                                <p>
                                    <Button 
                                        variant="primary"
                                        onClick={this.onCLickGetThereButton}
                                    >
                                        How to get there
                                    </Button>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

        )
    }
}