export default {
  /**
   * Загрузка товара
   * @param comment
   * @return {Function}
   */
  createComment: (comment) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'create-comment/load-start'});
      try {
        const res = await services.api.request({
          method:'POST',
          url: `/api/v1/comments`,
          body:JSON.stringify(comment)
        });
        dispatch({type: 'create-comment/load-success',payload:res.data.result?._id});
      } catch (e) {
        dispatch({type: 'create-comment/load-error', payload:e});
      }
    }
  },

  loadAllComments: (articleId) => {
    return async (dispatch, getState, services) => {
        dispatch({type: 'comments/load-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`
        });
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});
      } catch (e) {
        dispatch({type: 'comments/load-error', payload:e});
      }
    }
  },

  loadCommentById: (id) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'commentById/load-start'});
      try {
        const res = await services.api.request({
          url: `/api/v1/comments/${id}?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type)`
        });
        dispatch({type: 'commentById/load-success', payload: {data: res.data.result}});
      } catch (e) {
        console.log(e)
        dispatch({type: 'commentById/load-error', payload:e});
      }
    }
  },

  setComment: (str) => {
    return {type: 'comment/set', payload: str};
  },

  setSelectedComment: (id) => {
    return {type: 'selected-comment-id/set', payload: id};
  },
  setCommentStateReset: () => {
    return {type: 'selected-comment-id/set'};
  },

}
