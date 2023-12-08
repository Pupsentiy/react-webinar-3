import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, onToggle, toggleLang}) {

  const callbacks = {
    onToggle: () => onToggle()
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={callbacks.onToggle}>{!toggleLang ? 'Ru':'Eng'}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onToggle:PropTypes.func,
  toggleLang:PropTypes.bool
};

Head.defaultProps = {
  onToggle:() => {},
  toggleLang:false
}

export default memo(Head);
