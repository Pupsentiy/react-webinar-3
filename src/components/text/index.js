import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import PropTypes from "prop-types";

function Text(props){
  const {
    headerVariant = 'h1',
    title,
    text,
    bold,
    color,
    normal,
    align,
    size,
    margin,
  } = props
  const cn = bem('Text');
  const HeaderTag = headerVariant

  return(<div className={cn({})}>
    {title &&
      <HeaderTag className={cn({bold, normal, align, size})} style={{margin:margin}}>
        {title}
      </HeaderTag>}
    {text && (
      <p className={cn({color, bold, normal, align, size})} style={{margin:margin}}>
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
  color:PropTypes.string,
  align: PropTypes.oneOf(['start', 'end', 'center']),
  size: PropTypes.oneOf(['xs', 's', 'm']),
  margin:PropTypes.string
}

export default memo(Text)