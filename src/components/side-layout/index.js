import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function SideLayout({children, side, position, align, padding}) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({side, position, align, padding})}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn('item')}>{child}</div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium']),
  position:PropTypes.oneOf(['column', 'row']),
  align:PropTypes.oneOf(['start', 'end', 'center'])
}

SideLayout.defaultProps = {};

export default memo(SideLayout);
