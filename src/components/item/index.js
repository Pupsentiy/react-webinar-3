import React from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {formatNumber} from "../../utils";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAction: (code) => {
      props.onAction(code);
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn("wrapper-element")}>
        <div className={cn('title')}>
          {props.item.title}
        </div>
        <div className={cn("wrapper-price")}>
          <div className={cn("price")}>{formatNumber(props.item.price)}</div>
          {props.cartFlag && <div className={cn("quantity")}>
            {props.item.quantity}<span>шт</span>
          </div>}
        </div>
      </div>
      <div className={cn('actions')}>
        {props.cartFlag ? <button  onClick={() => callbacks.onAction(props.item.code)}>
          Удалить
        </button> : <button onClick={() => callbacks.onAction(props.item.code)}>
          Добавить
        </button>}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity:PropTypes.number
  }).isRequired,
  cartFlag:PropTypes.bool,
  onAction: PropTypes.func.isRequired,
};

Item.defaultProps = {
  onAction: () => {},
}

export default React.memo(Item);
