import { createApiSlice } from 'utils/redux';

import { RootState } from 'reduxFeatures';
import { getPostsCall, addPostCall, editPostCall, deletePostCall } from 'api/posts';

const selectPosts = (state: RootState) => state.posts;

const getData = (): Promise<Post[]> => {
    return getPostsCall();
};

const addData = async (state: Post[], post: AddPost): Promise<void> => {
    const newPost = await addPostCall(post);

    state.push(newPost);
};

const editData = async (state: Post[], post: Post): Promise<void> => {
    const edited = await editPostCall(post);

    const editedPostIndex = state.findIndex((p) => p.id === edited.id);

    if (editedPostIndex > -1) {
        state[editedPostIndex] = edited;
    }
};

const deleteData = async (state: Post[], postId: number): Promise<void> => {
    const isDeleted = await deletePostCall(postId);

    if (isDeleted) {
        const deletedPostIndex = state.findIndex((p) => p.id === postId);

        if (deletedPostIndex > -1) {
            state.slice(deletedPostIndex, 1);
        }
    }
};

const initialState: Post[] = [];

const slice = createApiSlice('posts', initialState);

const { takeCareOfApiStuff } = slice;

const fetchPosts = takeCareOfApiStuff(getData, selectPosts);
const addPost = takeCareOfApiStuff(addData, selectPosts);
const editPost = takeCareOfApiStuff(editData, selectPosts);
const deletePost = takeCareOfApiStuff(deleteData, selectPosts);

export { selectPosts, fetchPosts, addPost, editPost, deletePost };

export default slice.reducer;
