import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import CommentForm from "../comment-form";

function List(props) {
  const cn = bem('List');
  const {
    list,
    renderItem,
    selectedComment,
    styleBorder,
    onChange,
    inputValue,
    onSubmit,
    exists,
    onCommentReset,
    t
  } = props

  return (
    <div className={cn()}>{
     Boolean(list?.length) && list?.map((item) =>
        <div key={item._id} className={cn('item',{styleBorder})}>
          {renderItem(item)}

          {Boolean(item?.children?.length) &&
            <div className={cn('item-children')}>
                  <List
                    list={item?.children}
                    renderItem={renderItem}
                    selectedComment={selectedComment}
                    onChange={onChange}
                    inputValue={inputValue}
                    onSubmit={onSubmit}
                    exists={exists}
                    onCommentReset={onCommentReset}
                    t={t}
                />
          </div>}
          {selectedComment?.id === item._id  &&
            <CommentForm
              onChange={onChange}
              inputValue={inputValue}
              onSubmit={onSubmit}
              selectedComment={selectedComment}
              exists={exists}
              onCommentReset={onCommentReset}
              t={t}
            />
          }
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  renderItem: PropTypes.func,
  exists:PropTypes.bool,
  inputValue:PropTypes.string,
  onSelectedComment:PropTypes.func,
  onChange:PropTypes.func,
  onSubmit:PropTypes.func,
  selectedComment:PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string}),
  t:PropTypes.func
};

List.defaultProps = {
  renderItem: () => {
  },
  onSelectedComment: () => {
  },
  onChange: () => {
  },
  onSubmit: () => {
  },
  t:() => {
  }
}

export default memo(List);
