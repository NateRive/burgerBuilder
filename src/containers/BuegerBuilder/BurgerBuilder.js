import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControll/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseble: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://react-burger-54301.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(error => {
        this.setState({
          error: true
        });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchaseble: sum > 0
    });
  }

  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: this.state.totalPrice + priceAddition,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    // const oldPrice = this.state.totalPrice;
    // const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: this.state.totalPrice - priceDeduction,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandlers = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    // alert('your continue');
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "hiroaki",
        address: {
          street: "test street",
          zipCode: "662-0",
          country: "Japan"
        },
        email: "aaa@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    axios
      .post("/orders", order)
      .then(response =>
        this.setState({
          loading: false,
          purchasing: false
        })
      )
      .catch(error =>
        this.setState({
          loading: false,
          purchasing: false
        })
      );
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandlers}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = this.state.error ? <p>Oops!</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            purchaseble={this.state.purchaseble}
            price={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ordered={this.purchaseHandler}
            disabled={disabledInfo}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandlers}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
