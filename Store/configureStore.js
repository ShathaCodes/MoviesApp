import { createStore, combineReducers } from 'redux';
import toggleFavorite from './Reducers/favoriteReducer'
import setAvatar from './Reducers/avatarReducer'

export default createStore(combineReducers({toggleFavorite, setAvatar}))

//in case you want to persist the store

/*const rootPersistConfig = {
  key: 'root',
  storage: storage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, setAvatar}))
*/