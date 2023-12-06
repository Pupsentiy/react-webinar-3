import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {changeLang, numberFormat} from "../../utils";
import './style.css';
import useSelector from "../../store/use-selector";

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  const select = useSelector(state => ({
    toggleLang:state.toggleLang.toggle
  }));
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{changeLang(select.toggleLang,'Итого')}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
