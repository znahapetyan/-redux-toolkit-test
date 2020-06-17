import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPosts, fetchPosts, addPost } from 'reduxFeatures/posts';
import { isFetching } from 'utils/redux';

export default function App() {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);

    const [newPost, setNewPost] = useState({
        title: '',
        body: '',
    });

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleTitleChange = useCallback(
        (e) => {
            setNewPost({
                ...newPost,
                title: e.currentTarget.value,
            });
        },
        [newPost],
    );

    const handleBodyChange = useCallback(
        (e) => {
            setNewPost({
                ...newPost,
                body: e.currentTarget.value,
            });
        },
        [newPost],
    );

    const handleAdd = useCallback(() => {
        if (newPost.title !== '' && newPost.body !== '') {
            dispatch(addPost(newPost));

            setNewPost({
                title: '',
                body: '',
            });
        }
    }, [newPost, dispatch]);

    // Renders twice because of <React.StrictMode>
    // https://www.freecodecamp.org/forum/t/simple-react-component-renders-twice-when-using-the-usestate-hook/378110/6
    console.log('posts', posts);

    return (
        <div>
            <label>Title</label>
            <input value={newPost.title} onChange={handleTitleChange} />
            <br />

            <label>Body</label>
            <input value={newPost.body} onChange={handleBodyChange} />
            <br />

            <button onClick={handleAdd}>Add</button>

            {isFetching(posts) ? (
                <div>...Loading</div>
            ) : (
                <ul>
                    {posts.data.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
