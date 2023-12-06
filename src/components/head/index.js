import {memo, useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Head({title}) {
  const store = useStore();

  const callbacks = {
    toggleLang: useCallback(() => store.actions.toggleLang.toggleLang(), [store])
  }

  const select = useSelector(state => ({
    toggleLang:state.toggleLang.toggle
  }));

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={callbacks.toggleLang}>{!select.toggleLang ? 'Ru':'Eng'}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
