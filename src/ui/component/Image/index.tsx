import React from 'react';
import './style.css';

type Props = {
    imageIndex: number,
    imageUrl: string,
    onClickImage: (imageIndex: number)=>void
};
type State = {};

export default class Image extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);
    }

    render(){
        return (
            <div id="imageContainer">
                <img onClick={(e) => this.props.onClickImage(this.props.imageIndex)} className="supportImage" src={this.props.imageUrl} alt="supportImage"/>
            </div>
        )
    }
}