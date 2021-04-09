import React from 'react';
import './style.css';

type Props = {
//     imageUrls: 
};
type State = {};

export default class Image extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);
    }

    // renderProductImage(){
    //     if (!this.props.imageUrls) {
    //         return null;
    //     }
    //     const imageUrls: JSX.Element[] = [];
    //     for(let image of this.props.imageUrls) {
    //         imageUrls.push(
    //             <img className="supportImage" src="https://contents.mediadecathlon.com/p1856755/k$03e210b0a54f3832df4eee0d1ead5e0c/sq/500+TILT+14+SILVER+GREY.webp?f=1000x1000" alt="supportImage"/>
    //         )
    //     }
    // }

    render(){
        return (
            <div id="imageContainer">
                {/* <img className="supportImage" src="https://contents.mediadecathlon.com/p1856755/k$03e210b0a54f3832df4eee0d1ead5e0c/sq/500+TILT+14+SILVER+GREY.webp?f=1000x1000" alt="supportImage"/> */}
            </div>
        )
    }
}