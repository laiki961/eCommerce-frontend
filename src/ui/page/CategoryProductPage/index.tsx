import React from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ProductList } from '../../../domain/backendDos';
import BackendExtService from '../../../extService/BackendExtService';
import './style.css';

type RouterParams = {
    category: string
};
type Props = RouteComponentProps<RouterParams> & {};
type State = {
    productList?: ProductList
};

class CategoryProductPage extends React.Component<Props, State> {
    state = {} as State;

    constructor(props: Props) {
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
                        <Card.Img className="image centerCropped" variant="top" src={item.imageUrls[0].imageUrl}/>
                        <Card.Body>
                            <Card.Title className="cardTitle productName">{item.productName}</Card.Title>
                                <Card.Text className="price">
                                    <span className="priceTag listing">CAD$ </span>{item.price}
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
        return (
            <Container className="container">
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

export default withRouter(CategoryProductPage);