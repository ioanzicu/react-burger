import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
    // ['salad', 'bacon', 'cheese', 'meat']
    console.log([...Array(props.ingredients[igKey])]);
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      // Return an array with a N - number of objects
      // Array(2) - create an array with length of 2
      // .map() over that array N times
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  });
  console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
