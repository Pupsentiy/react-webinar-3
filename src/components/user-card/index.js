import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import Text from "../text";
import 'style.css'
import PropTypes from "prop-types";

function UserCard(props){
  const cn = bem("UserCard")
  return (
    <div className={cn()}>
      <span className={cn('row')}>{props.t("user.name")}: <Text text={props.user?.profile.name} bold/></span>
      <span className={cn('row')}>{props.t("user.phone")}: <Text text={props.user?.profile.phone} bold/></span>
      <span className={cn('row')}>{props.t("user.email")}: <Text text={props.user?.email} bold/></span>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.shape({
    email:PropTypes.string,
    profile:PropTypes.shape({
      phone:PropTypes.string,
      name:PropTypes.string
    })
  }),
  t: PropTypes.func
};

UserCard.defaultProps = {
  t: (text) => text
}

export default memo(UserCard)