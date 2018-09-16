import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBulder from "./containers/BuegerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBulder />
        </Layout>
      </div>
    );
  }
}

export default App;
