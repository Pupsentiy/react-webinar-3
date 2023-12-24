import {memo} from "react";
import {cn as bem} from "@bem-react/classname";
import Field from "../field";
import Text from "../text";
import './style.css'
import Textarea from "../textarea";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function CommentForm(props){
  const cn = bem('CommentForm');
  const {
    onChange,
    inputValue,
    onSubmit,
    selectedComment,
    exists,
    onCommentReset,
    t
  } = props

  const label = !selectedComment?.id ? t("comment.field.label.newComment") : t("comment.field.label.newAnswer")
  return (
    <div  className={cn()}>
      {exists ? <form onSubmit={onSubmit}>
        <Field
          label={
            <Text
              text={label}
              align={'start'}
              size={'xs'}
              bold
              margin={'10px 0 10px 0'}
            />
          }>
          <Textarea
            name={'comment'}
            onChange={onChange}
            value={inputValue}
          />
        </Field>
        <button type={'submit'} className={cn('btn-send')} >
          {t("comment.button.send")}
        </button>
        {selectedComment?.id && <button onClick={onCommentReset}>
          {t("comment.button.cancel")}
        </button>}
      </form>
        :
        <div className={cn('wrapper-message')}>
      <Link to={'/login'}><Text text={t("comment.link.singIn")} color={'link'}/></Link>
      <Text text={t("comment.link.label")}/>
          {selectedComment?.id && <button className={cn('btn-cancel')} onClick={onCommentReset}>{t("comment.button.cancel")}</button>}
    </div>
}
    </div>
  )
}

CommentForm.propTypes = {
  exists: PropTypes.bool,
  inputValue: PropTypes.string,
  onChange:PropTypes.func,
  onCommentReset:PropTypes.func,
  onSubmit:PropTypes.func,
  selectedComment: PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string}),
  t:PropTypes.func
}

CommentForm.defaultProps = {
  onChange:() => {},
  onCommentReset:() => {},
  onSubmit:() => {},
  t:()=>{}
}

export default memo(CommentForm)