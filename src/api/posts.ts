let lastPostID = 3;

export const getPostsCall = (): Promise<Post[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: 'post1',
                    body: 'post1 post1 post1 post1',
                },
                {
                    id: 2,
                    title: 'post2',
                    body: 'post2 post2 post2 post2',
                },
                {
                    id: 3,
                    title: 'post3',
                    body: 'post3 post3 post3 post3',
                },
            ]);
        }, 1000);
    });
};

export const addPostCall = (post: AddPost): Promise<Post> => {
    lastPostID++;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: lastPostID,
                ...post,
            });
        }, 1000);
    });
};

export const editPostCall = (post: Post): Promise<Post> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ...post,
            });
        }, 1000);
    });
};

export const deletePostCall = (postId: number): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
};
