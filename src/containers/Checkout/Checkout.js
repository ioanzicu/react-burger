import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = props => {
  const onCheckoutCancelledHandler = () => {
    props.history.goBack()
  }

  const onCheckoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  let summary = <Redirect to='/' />
  if (props.ings) {
    const purchasedRedirect = props.purchased && <Redirect to='/' />

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          onCheckoutCancelled={onCheckoutCancelledHandler}
          onCheckoutContinued={onCheckoutContinuedHandler}
        />
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    )
  }

  return summary
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout)
