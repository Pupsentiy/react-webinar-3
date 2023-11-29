import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, onAction}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {onAction && <button onClick={onAction}>Закрыть</button>}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
  action:PropTypes.func
};

export default React.memo(Head);
