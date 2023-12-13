import {memo} from "react";
import useTranslate from "../../hooks/use-translate";
import {cn as bem} from "@bem-react/classname";
import Text from "../text";
import 'style.css'

function UserCard(props){
  const {t} = useTranslate();
  const cn = bem("UserCard")
  return (
    <div className={cn()}>
      <span className={cn('row')}>{t("user.name")}: <Text text={props.user?.profile.name} bold/></span>
      <span className={cn('row')}>{t("user.phone")}: <Text text={props.user?.profile.phone} bold/></span>
      <span className={cn('row')}>{t("user.email")}: <Text text={props.user?.email} bold/></span>
    </div>
  )
}

export default memo(UserCard)