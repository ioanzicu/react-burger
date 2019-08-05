import React from 'react'
import { withRouter } from 'react-router-dom'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      // ['salad', 'bacon', 'cheese', 'meat']
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        // Return an array with a N - number of objects
        // Array(2) - create an array with length of 2
        // .map() over that array N times
        return <BurgerIngredient key={igKey + i} type={igKey} />
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default withRouter(burger)
