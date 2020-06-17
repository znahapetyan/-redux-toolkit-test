import { combineReducers } from 'redux';

import postsSlice from './posts';

const rootReducer = combineReducers({
    posts: postsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
