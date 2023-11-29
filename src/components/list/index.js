import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function List({list, cartFlag, onAction}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{
      list.map(item =>
        <div key={item.code} className={cn('item')}>
          <Item item={item} cartFlag={cartFlag} onAction={onAction} />
        </div>
      )}
    </div>
  )
}
List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  cartFlag:PropTypes.bool,
  onAction:PropTypes.func.isRequired
};

List.defaultProps = {
  onAction() {},
}

export default React.memo(List);
