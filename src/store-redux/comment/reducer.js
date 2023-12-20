const defaultData = {
  count: 0,
  items: [],
};

export const initialState = {
  data: defaultData,
  oneCommentId:null,
  commentValue:'',
  waiting: false,
  selectedComment:null,
  error:null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "create-comment/load-start":
      return {...state, waiting: true};

    case "create-comment/load-success":
      return {...state, oneCommentId:action.payload, waiting: false};

    case "create-comment/load-error":
      return {...state, error: action.payload, waiting: false};


    case "comments/load-start":
      return {...state, data:defaultData, waiting: true};

    case "comments/load-success":
      return {...state, data: action.payload.data, waiting: false};

    case "comments/load-error":
      return {...state, data:defaultData, error: action.payload,waiting: false};


    case "commentById/load-start":
      return {...state, data: {...state.data}, waiting: true};

    case "commentById/load-success":
      return {...state,
        data:{
        count: state.data.items.length + 1,
        items:[...state.data.items, action.payload.data]},
        waiting: false
      };

    case "commentById/load-error":
      return {...state,data:{...state.data},error: action.payload, waiting: false};


    case "comment/set":
      return {...state, commentValue: action.payload };
    case "selected-comment-id/set":
      return {...state, selectedComment: action.payload, commentValue: '' };
    case "selected-comment-reset/set":
      return {...state, selectedComment: '', commentValue: '' };
    default:
      return state;
  }
}

export default reducer;
