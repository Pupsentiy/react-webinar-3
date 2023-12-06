import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {changeLang, numberFormat, plural} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import useSelector from "../../store/use-selector";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const select = useSelector(state => ({
    toggleLang:state.toggleLang.toggle
  }));

  return (
    <div className={cn()}>
      <Link to={'/'} className={cn('link-home')}>{changeLang(select.toggleLang, 'Главная')}</Link>
     <div className={cn('wrapper')}>
       <span className={cn('label')}>{changeLang(select.toggleLang,'В корзине')}:</span>
       <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: changeLang(select.toggleLang,'товар'),
            few: changeLang(select.toggleLang,'товара'),
            many: changeLang(select.toggleLang,'товаров')
          })} / ${numberFormat(sum)} ₽`
          : changeLang(select.toggleLang,'пусто')
        }
      </span>
       <button onClick={onOpen}>{changeLang(select.toggleLang,'Перейти')}</button>
     </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
