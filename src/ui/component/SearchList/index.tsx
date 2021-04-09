import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductList} from '../../../domain/backendDos';
import './style.css';

type Props = {
    searchProduct: ProductList,
    onClickSearchListOverlay?: (shouldShowSearchList: boolean) => void,
};
type State = {
};

export default class SearchList extends React.Component<Props, State> {
    state = {} as State;

    constructor(props: Props) {
        super(props);
    }

    renderSearchProduct(){
        console.log(this.props.searchProduct);

        if (!this.props.searchProduct) {
            return null;
        }

        const searchList: JSX.Element[] = [];
        if(this.props.searchProduct?.length === 0){
            return (
                <div className="dropdown-content">
                    No matched product
                </div>
            );
        }
        for(let item of this.props.searchProduct){
            searchList.push(
                <Link to={"detail/" + item.productId} key={item.productId} className="searchResultItem">
                    <img id="searchImage" src={item.imageUrls[0].imageUrl}/>
                    <div id="searchContent">
                        {item.productName}<br/>
                        <span>HK$ </span>{item.price}
                    </div>
                    <hr/>
                </Link>
            )
        }
        return searchList;
    }


    render(){
        return (
            <div className="searchListContainer">
                <div className="searchListOverlay" onClick={() => this.props.onClickSearchListOverlay!(false)}/>
                <Container>
                    <div className="searchList">
                        {/* <Link to={"detail/2"} key="2">
                                <img id="searchImage" src="https://contents.mediadecathlon.com/p1856758/k$9ec57efa37d2d07c1b107fb2fd5cd98c/sq/500+TILT+14+SILVER+GREY.webp?f=1000x1000"/>
                            <div id="searchContent">
                                500 TILT 14" SILVER GREY<br/>
                                <span>HK$ </span>1899
                            </div>
                            <hr/>
                        </Link> */}
                        {this.renderSearchProduct()}
                    </div>
                </Container>
            </div>
        )
    }
}