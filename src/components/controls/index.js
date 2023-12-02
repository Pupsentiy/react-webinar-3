import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function Controls({openModal, cart, totalPrice}) {
  return (
    <div className='Controls'>
      <div className="Controls-number-item">
        В корзине:
        {!cart.length ?
          <span>пусто</span>
          :
          <span>{cart.length} {plural(cart.length, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
          })} / {totalPrice} ₽</span>}
      </div>
      <button onClick={openModal}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openModal: PropTypes.func.isRequired,
  cart:PropTypes.array.isRequired,
  totalPrice:PropTypes.number
};

Controls.defaultProps = {
  openModal: () => {}
}

export default React.memo(Controls);
