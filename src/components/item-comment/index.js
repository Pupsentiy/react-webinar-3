import {memo, useRef} from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import Text from "../text";
import formatDate from "../../utils/format-date";
import PropTypes from "prop-types";

function ItemComment(props){
  const cn = bem('ItemComment');
  const date = formatDate(props.item.dateCreate)
  const selectedComment = {id:props.item._id, name:props.item?.author?.profile?.name}
  const classActive = props.username === props.item?.author?.profile?.name

  return(
    <div className={cn()} >
      <div className={cn('wrapper')}>
        <Text
          text={props.item.author.profile.name}
          size={'xs'}
          bold
          margin={'0 10px 0 0'}
          color={classActive ? 'grey' : ''}
        />
        <Text
          text={date}
          size={'xs'}
          color={'grey'}/>
      </div>
      <Text
        text={props.item.text}
        size={'s'}
        margin={'10px 0 0 0'}/>

      <button
        className={cn('btn')}
        onClick={() => {props.onSelectedComment(selectedComment)}}
      >
        Ответить
      </button>
    </div>
  )
}

ItemComment.propTypes = {
  item:PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      profile: PropTypes.shape({
        name: PropTypes.string,
      })
    }),
    parent: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _type: PropTypes.string,
    }),
    isDeleted: PropTypes.bool,
    children:PropTypes.array,
  }),
  username:PropTypes.string,
  onSelectedComment:PropTypes.func
}

ItemComment.defaultProps = {
  onSelectedComment:() => {},
}

export default memo(ItemComment)