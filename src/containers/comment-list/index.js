import {memo, useCallback, useEffect, useMemo, useRef} from "react";
import CommentForm from "../../components/comment-form";
import SideLayout from "../../components/side-layout";
import Text from "../../components/text";
import {useDispatch} from "react-redux";
import commentActions from '../../store-redux/comment/actions'
import List from "../../components/list";
import {useSelector as useSelectorRedux} from 'react-redux';
import ItemComment from "../../components/item-comment";
import listToTree from "../../utils/list-to-tree";
import useSelector from '../../hooks/use-selector';
import Spinner from "../../components/spinner";
import PropTypes from "prop-types";
import useTranslate from "../../hooks/use-translate";

function CommentList({articleId}){
  const {t} = useTranslate();
  const dispatch = useDispatch();
  const {
    commentValue,
    data,
    selectedComment,
    waiting,
    oneCommentId
  }  = useSelectorRedux((state) => state.comment)
const refForm = useRef(null)

  const select = useSelector(state => ({
    exists:state.session.exists,
    user:state.session.user
  }));
  const onScrollToMyRef = useCallback(()=>{
    if(refForm.current){
      refForm.current.scrollIntoView({ behavior: 'auto',block:'center' });
    }
  },[refForm.current])

  useEffect(() => {
    if(oneCommentId){
      dispatch(commentActions.loadCommentById(oneCommentId))
    }

  }, [oneCommentId]);

  useEffect(() => {
    if(refForm.current && selectedComment?.id){
      onScrollToMyRef()
    }
  }, [refForm.current, selectedComment?.id]);

  const callbacks = {
    onChange: useCallback((str) => {dispatch(commentActions.setComment(str))},[]),
    onSelectedComment:useCallback((comment) => {
      const text  = `${t("comment.field.answer.placeholder")} ${comment?.name}`
      if(comment){
        dispatch(commentActions.setSelectedComment(comment))
        dispatch(commentActions.setComment(text))
      }
      },[]
    ),
    onSubmit: useCallback((e) => {
      e.preventDefault();
      if(!commentValue.trim().length) {
       return
      }
      const newComment = {
        text:commentValue,
        parent:{_id:articleId, _type:'article'}
      }
      const replyComment = {
        text:commentValue,
        parent:{_id:selectedComment?.id, _type:'comment'}
      }
    if(selectedComment?.id) {
       dispatch(commentActions.createComment(replyComment))
    }else {
       dispatch(commentActions.createComment(newComment))
    }
    dispatch((commentActions.setCommentStateReset()))
      },[commentValue, selectedComment?.id]),

    onCommentReset:useCallback((e)=>{
      e.preventDefault()
      dispatch((commentActions.setCommentStateReset()))
    },[]),

  }

  const memoComments = {
    comments:useMemo(() => listToTree(data?.items)?.[0]?.children || []
      ,[data?.items])
  }

  const renders = {
    item: useCallback(item => (
      <ItemComment
        item={item}
        username={select.user?.profile?.name}
        onSelectedComment={callbacks.onSelectedComment}
        onScrollToMyRef={onScrollToMyRef}
      />
    ), [callbacks.onSelectedComment, select.user?.profile?.name, onScrollToMyRef]),
  };

  return(
    <SideLayout
      padding={'big'}
      position={"column"}
      side={'start'}
      align={'start'}
    >
    <Text
      title={`${t("article.comments.title")}(${data?.count})`}
      headerVariant={'h2'}
      normal
      margin={'10px 0 0 0'}
    />
   <Spinner active={waiting}>
     <List
       list={memoComments?.comments}
       renderItem={renders.item}
       selectedComment={selectedComment}
       onChange={callbacks.onChange}
       inputValue={commentValue}
       onSubmit={callbacks.onSubmit}
       exists={select.exists}
       onCommentReset={callbacks.onCommentReset}
       t={t}
       refForm={refForm}
     />
     {!selectedComment &&
       <CommentForm
         onChange={callbacks.onChange}
         inputValue={commentValue}
         onSubmit={callbacks.onSubmit}
         selectedComment={selectedComment}
         exists={select.exists}
         onCommentReset={callbacks.onCommentReset}
         t={t}
         refForm={refForm}
       />}
   </Spinner>
    </SideLayout>
  )
}

CommentList.propTypes = {
  articleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default memo(CommentList)