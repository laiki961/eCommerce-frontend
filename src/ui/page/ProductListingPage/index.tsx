import React from "react";
import { Card, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductList } from "../../../domain/backendDos";
import BackendExtService from "../../../extService/BackendExtService";
import ContactUsSection from "../../component/ContactUsSection";
import "./style.css";

type Props = {
    categoryId?: string,
};
type State = {
    productList?: ProductList,
    // category?: Category[],
    // isShowSidebar: boolean
};

export default class ProductListingPage extends React.Component<Props, State> {
    state = {
        // isShowSidebar: false
    } as State;

    prevCategoryId?: string;

    constructor(props: Props) {
        super(props);

        this.onLoadedProductList = this.onLoadedProductList.bind(this);
        // this.onLoadedCategoryList = this.onLoadedCategoryList.bind(this);
        // this.onClickSidebarToggle = this.onClickSidebarToggle.bind(this);
    }

    componentDidMount() {
        this.prevCategoryId = this.props.categoryId;
        BackendExtService.getProductList(this.onLoadedProductList, this.props.categoryId); //ask BackendExtService call method, then jump to onLoadedProductList
        // BackendExtService.getCategoryList(this.onLoadedCategoryList);
    }

    componentDidUpdate() {
        if (this.prevCategoryId !== this.props.categoryId) {
            BackendExtService.getProductList(this.onLoadedProductList, this.props.categoryId); 
            this.prevCategoryId = this.props.categoryId;
        }
        // BackendExtService.getProductList(this.onLoadedProductList); 
    }

    onLoadedProductList(data: ProductList) {
        this.setState({ productList: data });
    }

    // onLoadedCategoryList(data: Category[]){
    //     this.setState({category: data})
    // }


    // onClickSidebarToggle() {
    //     this.setState((prevState) => ({
    //         isShowSidebar: !prevState.isShowSidebar
    //     }))
    // }

    // renderCategoryList() {
    //     const list: JSX.Element[] = [];
    //     if (!this.state.category) {
    //         return null;
    //     }
    //     console.log(this.state.category)
    //     for (let category of this.state.category)
    //     list.push(
    //         <Link to={"/category/" + category.id} key={category.id}>
    //             <div className="categoryName">{category.name}</div>
    //         </Link>
    //     )
    //     return list;
    // }

    renderProductItems() {
        const cards: JSX.Element[] = [];
        if (!this.state.productList) {
            return null; // null | [] | cards <-- they all represent null
        }
        console.log(this.state.productList);
        for (let item of this.state.productList!) {
        cards.push(
            //Link is from Router
            <Link to={"/details/" + item.productId} key={item.productId}>
                <Card className="productCard">
                    <Card.Img
                        className="image centerCropped"
                        variant="top"
                        src={item.imageUrls[0].imageUrl}
                    />
                    <Card.Body>
                    <Card.Title className="cardTitle productName">
                        {item.productName}
                    </Card.Title>
                    <br/>
                    <Card.Text className="price">
                        <span className="priceTag listing">HK$ </span>
                        {item.price}
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        )}
        return cards;
    }

    render() {
        return (
                <>
                    {
                        (this.state.productList) ? (
                            <Container>
                                <div className="content productContainer">
                                    {this.renderProductItems()}
                                </div>
                            </Container>
                        ):(
                            <div className="loadingOverlay-content active">
                                <div className="lds-ellipsis loading">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        )
                    }
                    <ContactUsSection/>
                </>
            )
                   
        //     {/* <Carousel fade>
        //                         <Carousel.Item>
        //                             <img
        //                                 className="d-block w-100 heroImg1"
        //                                 src="https://images.giant-bicycles.com/b_white,c_crop,h_600,q_70,w_1920/co9lssayxjtc2xcmhboo/Giant_Header_EBike_Main.jpg"
        //                                 alt="First slide"
        //                             />
        //                             <Carousel.Caption>
        //                                 <h3>First slide label</h3>
        //                                 <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        //                             </Carousel.Caption>
        //                         </Carousel.Item>
        //                         <Carousel.Item>
        //                             <img
        //                                 className="d-block w-100 heroImg2"
        //                                 src="https://wepedal.co.uk/wp-content/uploads/2020/01/whistler-canada-mountain-biking.jpg"
        //                                 alt="Second slide"
        //                             />
        //                             <Carousel.Caption>
        //                                 <h3>Second slide label</h3>
        //                                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //                             </Carousel.Caption>
        //                         </Carousel.Item>
        //                     </Carousel> */}

    
    }


    
}
