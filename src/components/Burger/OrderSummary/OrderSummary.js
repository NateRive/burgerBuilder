import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	//This could be a functionla component, doesn't have to be a class
	componentWillUpdate() {
		console.log('[OrderSummary] willUpdate');
	}

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
			return (
				<li key={igKey}>
					<span style={{ textTransform: 'capitalize' }}>{igKey}</span> :{this.props.ingredients[igKey]}
				</li>
			);
		});

		return (
			<Aux>
				<h3>Your order</h3>
				<p>A delicious burger with the following ingredients</p>
				<ul>{ingredientSummary}</ul>
				<p>
					<strong>Total PRice: {this.props.price.toFixed(2)} </strong>
				</p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCanceled}>
					Cancel
				</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>
					Continue
				</Button>
			</Aux>
		);
	}
}

export default OrderSummary;
