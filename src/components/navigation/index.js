import {memo} from "react";
import './style.css'
import {cn as bem} from "@bem-react/classname";
import {changeLang} from "../../utils";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


function Navigation({toggleLang}) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to={'/'} className={cn('link-home')}>{changeLang(toggleLang, 'Главная')}</Link>
    </div>
  )
}

Navigation.propTypes = {
  toggleLang:PropTypes.bool
};

Navigation.defaultProps = {
  toggleLang:false
}

export default memo(Navigation)