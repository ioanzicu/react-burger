import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Auxiliar from '../../hoc/Auxiliar/Auxiliar'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import axios from '../../axios-orders'

export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false)

  useEffect(() => {
    props.onInitIngredients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true)
    } else {
      props.onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase()
    props.history.push('/checkout')
  }

  const disabledInfo = {
    ...props.ings
  }
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0
  }
  let orderSummary = null

  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

  if (props.ings) {
    burger = (
      <Auxiliar>
        <Burger ingredients={props.ings} />
        <BurgerControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          price={props.price}
          isAuth={props.isAuthenticated}
          onClick={purchaseContinueHandler}
        />
      </Auxiliar>
    )
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    )
  }

  // {salad: true, cheese: true, meat: false, ...}
  return (
    <Auxiliar>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliar>
  )
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
