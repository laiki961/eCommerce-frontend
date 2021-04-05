import React from 'react';
import './style.css';

type Props = {};
type State = {};

export default class Image extends React.Component<Props, State> {

    state = {} as State;

    constructor(props: Props) {
        super(props);
    }

    render(){
        return (
            <div id="imageContainer">
                
            </div>
        )
    }
}