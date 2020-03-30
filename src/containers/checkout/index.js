import React, { Component } from 'react';
import Checkout from '../../components/Checkout';

class CheckoutContainer extends Component {

    render(){
        return (
            <Checkout books={this.props.books} />
        );
    }
}

export default CheckoutContainer;