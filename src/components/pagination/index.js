import {Fragment, memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');

  const lastPage  = Math.ceil(props.count / props.limit)
  const prev =   props.page > 1 && props.page < lastPage  ? props.page - 2 : props.page === lastPage  ? props.page - 3 : props.page - 1
  const next = props.page < 2 ? props.page + 2 : props.page + 1
   const buttonNumber = []
   for (let i = 1; i <= lastPage; i++) {
     buttonNumber.push(i);
   }

  const callbacks = {
    // Пагинация
    nextPage:(num) => {
      props.nextPage(num)
    }
  };

  return (
    <div className={cn()}>
      {props.page > 2 && <>
        <button
          className={cn('button')}
          onClick={() => callbacks.nextPage(1)}
        >
          1
        </button>
        {props.page > 3 && <span className={cn('dots')}>...</span>}
      </>
      }
      {buttonNumber.map((num) =>
      <button
        key={num}
        onClick={() => callbacks.nextPage(num)}
        className={props.page === num ? cn('button active') : cn('button')}
      >
        {num}
      </button>
      ).slice(prev,  next)}
      {lastPage - 1  > props.page &&
        <Fragment>
          {lastPage - 2  > props.page && <span className={cn('dots')}>...</span>}
          <button
            className={cn('button')}
            onClick={() => callbacks.nextPage(lastPage)}
          >
            {lastPage}
          </button>
        </Fragment>}
    </div>
  );
}

Pagination.propTypes = {
  nextPage: PropTypes.func,
  count:PropTypes.number,
  page:PropTypes.number,
}

Pagination.defaultProps = {
  nextPage: () => {},
  count:0,
  page:1
}

export default memo(Pagination);


