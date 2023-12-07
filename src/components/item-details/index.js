import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import useSelector from "../../store/use-selector";
import {changeLang, numberFormat} from "../../utils";
import './styles.css'
import PropTypes from "prop-types";
function ItemDetails(props) {
  const cn = bem('ItemDetails');

  const select = useSelector(state => ({
   item: state.itemDetails.item,
   toggleLang:state.toggleLang.toggle
  }));

 if(!select.item){
   return <div className='error'>{changeLang(select.toggleLang,'Товар не найден!')} loading</div>
 }

  const callbacks = {
    onAdd: () => props.addProductBasket({
      _id: select.item._id,
      price: select.item.price,
    })
  }

  return (
      <div className={cn()}>
        <p className={cn('description')}>{select.item?.description}</p>
        <p className={cn('production')}>
          {changeLang(select.toggleLang,'Страна производитель')}:
          <strong>
            {select.item?.madeIn?.title}{` (${select.item?.madeIn?.code})`}
          </strong>
        </p>
        <p className={cn('category')}>{changeLang(select.toggleLang,'Категория')}:<strong>{select.item?.category?.title}</strong></p>
        <p className={cn('year-production')}>{changeLang(select.toggleLang,'Год выпуска')}:<strong>{select.item?.edition}</strong></p>
        <p className={cn('price')}>{changeLang(select.toggleLang,'Цена')}: {numberFormat(select.item?.price)} ₽</p>
        <button onClick={callbacks.onAdd}>{changeLang(select.toggleLang,'Добавить')}</button>
      </div>
  )
}

ItemDetails.propTypes = {
  addProductBasket: PropTypes.func,
};

ItemDetails.defaultProps = {
  addProductBasket: () => {},
}

export default memo(ItemDetails)