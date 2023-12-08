import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {changeLang, numberFormat} from "../../utils";
import './style.css';

function BasketTotal({sum, toggleLang}) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{changeLang(toggleLang,'Итого')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  toggleLang:PropTypes.bool
};

BasketTotal.defaultProps = {
  sum: 0,
  toggleLang:false
}

export default memo(BasketTotal);
