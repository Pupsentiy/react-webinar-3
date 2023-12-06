import {memo} from 'react';
import propTypes from 'prop-types';
import {changeLang, numberFormat} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';
import {Link} from "react-router-dom";
import useSelector from "../../store/use-selector";

function ItemBasket(props) {
  const cn = bem('ItemBasket');
  const select = useSelector(state => ({
    toggleLang:state.toggleLang.toggle
  }));

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id),
    closeModal: () => props.closeModal()
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`item-details/${props.item._id}`} className={cn('title')} onClick={callbacks.closeModal}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {changeLang(select.toggleLang, 'шт')}</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{changeLang(select.toggleLang, 'Удалить')}</button>
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
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
