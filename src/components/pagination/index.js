import {Fragment, memo, useCallback} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useSelector from "../../store/use-selector";

function Pagination(props) {
  const cn = bem('Pagination');
  const select = useSelector(state => ({
    count:state.catalog.count,
    page:state.pagination.page,
    limit:state.pagination.limit
  }));

  const lastPage  = Math.ceil(select.count / select.limit)
  const prev = select.page > 2 && select.page - 2
  const next = select.page < 3 ? select.page + 2 : select.page + 1
   const buttonNumber = []
   for (let i = 1; i <= lastPage; i++) {
     buttonNumber.push(i);
   }

  const callbacks = {
    // Пагинация
    nextPage:useCallback((num) => {
      props.pagination(num)
    },[])
  };

  return (
    <div className={cn()}>
      {select.page > 2 && <>
        <button
          className={cn('button')}
          onClick={() => callbacks.nextPage(1)}
        >
          1
        </button>
        <span className={cn('dots')}>...</span>
      </>
      }
      {buttonNumber.map((num) =>
      <button
        key={num}
        onClick={() => callbacks.nextPage(num)}
        className={select.page === num ? cn('button active') : cn('button')}
      >
        {num}
      </button>
      ).slice(prev,  next)}
      {lastPage - 1  > select.page &&
        <Fragment>
          <span className={cn('dots')}>...</span>
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
  nextPage: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  nextPage: () => {},
}

export default memo(Pagination);


