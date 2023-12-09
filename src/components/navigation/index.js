import {memo} from "react";
import './style.css'
import {cn as bem} from "@bem-react/classname";
import {changeLang} from "../../utils";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";


function Navigation({toggleLang, setPage}) {
  const cn = bem('Navigation');

  return (
    <div className={cn()}>
      <Link to={'/'} className={cn('link-home')} onClick={() => setPage(1)}>{changeLang(toggleLang, 'Главная')}</Link>
    </div>
  )
}

Navigation.propTypes = {
  toggleLang:PropTypes.bool,
  setPage:PropTypes.func
};

Navigation.defaultProps = {
  toggleLang:false,
  setPage:() => {}
}

export default memo(Navigation)