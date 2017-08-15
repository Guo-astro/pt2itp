const posts = [
    require('./post/id').post, //Mandatory
    require('./post/sort').post,
    require('./post/dedupe').post
];

class Post {
    constructor(post = []) {
        for (p of post) {
            posts.push(require(`./post/${p}`).post);
        }
    }

    feat(f) {
        for (let post of posts) {
            f = post(f);
        }

        return f;
    }
}

module.exports = Post;
