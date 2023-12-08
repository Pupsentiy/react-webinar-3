import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {changeLang, numberFormat, plural} from "../../utils";
import './style.css';

function BasketTool({sum, amount, onOpen, toggleLang}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
     <div className={cn('wrapper')}>
       <span className={cn('label')}>{changeLang(toggleLang,'В корзине')}:</span>
       <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: changeLang(toggleLang,'товар'),
            few: changeLang(toggleLang,'товара'),
            many: changeLang(toggleLang,'товаров')
          })} / ${numberFormat(sum)} ₽`
          : changeLang(toggleLang,'пусто')
        }
      </span>
       <button onClick={onOpen}>{changeLang(toggleLang,'Перейти')}</button>
     </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  toggleLang:PropTypes.bool
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  toggleLang:false
}

export default memo(BasketTool);
