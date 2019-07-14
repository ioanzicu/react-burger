import React from "react";

import Auxiliar from "../../hoc/Aux";

const layout = props => (
  <Auxiliar>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </Auxiliar>
);

export default layout;
