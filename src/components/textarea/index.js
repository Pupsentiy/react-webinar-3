import {memo} from "react";
import './style.css'
import PropTypes from "prop-types";

function Textarea(props){
  const onChange = (event) => {
    props.onChange?.(event.target.value)
  }
  return (
    <textarea
    name={props.name}
    className={'Textarea'}
    onChange={onChange}
    value={props.value}
    placeholder={props.placeholder}
    />
  )
}

Textarea.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

Textarea.defaultProps = {
  onChange: () => {
  },
}


export default memo(Textarea)