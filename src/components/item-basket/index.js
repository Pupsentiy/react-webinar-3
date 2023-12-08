import {memo} from 'react';
import propTypes from 'prop-types';
import {changeLang, numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {Link} from "react-router-dom";

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id),
    closeModal: () => props.closeModal()
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={props.link} className={cn('title')} onClick={callbacks.closeModal}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {changeLang(props.toggleLang, 'шт')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{changeLang(props.toggleLang, 'Удалить')}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  link:PropTypes.string,
  onRemove: propTypes.func,
  toggleLang:PropTypes.bool
}

ItemBasket.defaultProps = {
  onRemove: () => {},
  toggleLang:false
}

export default memo(ItemBasket);
