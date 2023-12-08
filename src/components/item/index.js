import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {changeLang, numberFormat} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={props.link} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{changeLang(props.toggleLang,'Добавить')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  toggleLang:PropTypes.bool,
  link:PropTypes.string
};

Item.defaultProps = {
  onAdd: () => {},
  toggleLang:false
}

export default memo(Item);
