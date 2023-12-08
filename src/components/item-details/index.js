import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import {changeLang, numberFormat} from "../../utils";
import './styles.css'
import PropTypes from "prop-types";
function ItemDetails(props) {
  const cn = bem('ItemDetails');

 if(!props.item){
   return <div className='error'>{changeLang(props.toggleLang,'Товар не найден!')} loading</div>
 }

  const callbacks = {
    onAdd: () => props.addProductBasket({
      _id: props.item._id,
      price: props.item.price,
      title:props.item.title
    })
  }

  return (
      <div className={cn()}>
        <p className={cn('description')}>{props.item?.description}</p>
        <p className={cn('production')}>
          {changeLang(props.toggleLang,'Страна производитель')}:
          <strong>
            {props.item?.madeIn?.title}{` (${props.item?.madeIn?.code})`}
          </strong>
        </p>
        <p className={cn('category')}>{changeLang(props.toggleLang,'Категория')}:<strong>{props.item?.category?.title}</strong></p>
        <p className={cn('year-production')}>{changeLang(props.toggleLang,'Год выпуска')}:<strong>{props.item?.edition}</strong></p>
        <p className={cn('price')}>{changeLang(props.toggleLang,'Цена')}: {numberFormat(props.item?.price)} ₽</p>
        <button onClick={callbacks.onAdd}>{changeLang(props.toggleLang,'Добавить')}</button>
      </div>
  )
}

ItemDetails.propTypes = {
  addProductBasket: PropTypes.func,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string
    }),
    edition: PropTypes.number,
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
  toggleLang:PropTypes.bool
};

ItemDetails.defaultProps = {
  addProductBasket: () => {},
  toggleLang:false
}

export default memo(ItemDetails)