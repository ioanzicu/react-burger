import React, { Component } from "react";

import Auxiliar from "../../hoc/Auxiliar";

class BurgerBuilder extends Component {
  state = {};
  render() {
    return (
      <Auxiliar>
        <div>Burger</div>
        <div>Build Control</div>
      </Auxiliar>
    );
  }
}

export default BurgerBuilder;
