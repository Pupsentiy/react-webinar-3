import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import PropTypes from "prop-types";

function Text({headerVariant = 'h1', title, text, bold, color}){
  const cn = bem('Text');
  const HeaderTag = headerVariant

  return(<div className={cn({})}>
    {title &&
      <HeaderTag className={cn('title',{bold})}>
      {title}
      </HeaderTag>}
    {text && (
      <p className={cn({color, bold})}>
        {text}
      </p>
    )}
  </div>)
}

Text.propTypes = {
  headerVariant:PropTypes.oneOf(['h1', 'h2', 'h3']),
  title:PropTypes.string,
  text:PropTypes.string,
  bold:PropTypes.bool,
  color:PropTypes.string
}

export default memo(Text)