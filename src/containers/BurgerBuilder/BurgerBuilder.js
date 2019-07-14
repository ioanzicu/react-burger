import React, { Component } from "react";

import Auxiliar from "../../hoc/Auxiliar";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {};
  render() {
    return (
      <Auxiliar>
        <Burger />
        <div>Build Control</div>
      </Auxiliar>
    );
  }
}

export default BurgerBuilder;
