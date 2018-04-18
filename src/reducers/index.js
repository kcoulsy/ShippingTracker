import { ADD_ARTICLE,
  EDIT_ARTICLE,
  REMOVE_ARTICLE,
  SET_USER
} from '../constants/action-types';

const initialState = {
  user: {},
  articles: []
};

const rootReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_USER:
      return {...state,
      user: action.payload};
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [
          ...state.articles,
          action.payload
        ]};
    case EDIT_ARTICLE:
      return {
        ...state,
        articles: state.articles.map((article)=>{
          if(article._id === action.id){
            return {
              ...article,
              ...action.updates
            };
          }
          return article;
        })
      }
    case REMOVE_ARTICLE:
    console.log(action);
      return {
        ...state,
        articles: state.articles.filter((article)=> article._id !== action.id )
      }
    default:
      return state;
  }
};

export default rootReducer;
