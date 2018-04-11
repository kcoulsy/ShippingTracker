import {
  ADD_ARTICLE,
  EDIT_ARTICLE,
  REMOVE_ARTICLE
} from '../constants/action-types';

export const addArticle = article => ({
  type: ADD_ARTICLE,
  payload: article
})

export const editArticle = (article) => ({
  type: EDIT_ARTICLE,
  payload: article
})

export const removeArticle = ({ id } = {}) => ({
  type: REMOVE_ARTICLE,
  id
})
