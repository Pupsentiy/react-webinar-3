import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {changeLang, numberFormat} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import useSelector from "../../store/use-selector";

function Item(props) {
  const cn = bem('Item');
  const select = useSelector(state => ({
    toggleLang:state.toggleLang.toggle
  }));

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id)
  }
  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={`item-details/${props.item._id}`} className={cn('title')}>
        {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{changeLang(select.toggleLang,'Добавить')}</button>
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
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
