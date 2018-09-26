import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBulder from './containers/BuegerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BuegerBuilder/BurgerBuilder';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/checkout" component={Checkout} />
						<Route path="/" exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
