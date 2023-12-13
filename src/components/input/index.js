import {memo, useCallback, useId, useLayoutEffect, useState} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input(props) {
  const idInput = useId()
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), props.delay),
    [props.onChange, props.name]
  );

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Input');
  return (
    <div className={cn()} >
      <label htmlFor={idInput}>{props.label}</label>
      <input
        id={idInput}
        name={props.name}
        className={cn({theme: props.theme})}
        value={value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={onChange}
      />
    </div>

  )
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  label:PropTypes.string,
  delay:PropTypes.number,
}

Input.defaultProps = {
  onChange: () => {
  },
  type: 'text',
  theme: '',
  label:''
}

export default memo(Input);
