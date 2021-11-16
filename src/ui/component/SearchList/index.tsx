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
                        <span>CAD$ </span>{item.price}
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
                        {this.renderSearchProduct()}
                    </div>
                </Container>
            </div>
        )
    }
}