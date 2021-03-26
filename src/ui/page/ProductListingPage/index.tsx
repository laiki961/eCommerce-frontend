import React from 'react';
import { Card, Carousel, Col, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductList } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import "./style.css";

type Props = {};
type State = {
    productList?: ProductList
};

export default class ProductListingPage extends React.Component<Props, State> {
    state = {} as State;

    constructor(props: Props){
        super(props);

        this.onLoadedProductList = this.onLoadedProductList.bind(this);
    }

    componentDidMount(){
        BackendExtService.getProductList(this.onLoadedProductList); //叫BackendExtService call method, then jump to onLoadedProductList
    }

    onLoadedProductList(data: ProductList){
        this.setState({productList: data});
    }

    renderProductItems(){
        const cards: JSX.Element[] = [];
        if(!this.state.productList){
            return null; // null | [] | cards <-- they all represent null
        }
        for(let item of this.state.productList){
            cards.push(
            //Link is from Router
            <Col md={3} sm={6} key={item.productId}>
                <Link to={"/details/" + item.productId}>
                    <Card className="productCard">
                        <Card.Img className="image centerCropped" variant="top" src={item.imageUrl}/>
                        <Card.Body>
                            <Card.Title className="cardTitle productName">{item.productName}</Card.Title>
                                <Card.Text className="price">
                                    <span className="priceTag listing">HK$ </span>{item.price}
                                </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
            )
        }
        return cards;
    }

    render(){
        return(
                <Container className="container">
                    
                    {/* <Carousel fade>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 heroImg1"
                                src="https://images.giant-bicycles.com/b_white,c_crop,h_600,q_70,w_1920/co9lssayxjtc2xcmhboo/Giant_Header_EBike_Main.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 heroImg2"
                                src="https://wepedal.co.uk/wp-content/uploads/2020/01/whistler-canada-mountain-biking.jpg"
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel> */}


                    <div className="productContainer">
                        {
                            (this.state.productList)? this.renderProductItems() : (
                                <div className="lds-ellipsis loading">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            )
                        }
                    </div>
                </Container>
        )
    }
}