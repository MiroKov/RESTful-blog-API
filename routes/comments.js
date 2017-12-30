let store = require('../data/store');
module.exports = {
    get(req, res) {
        const postId = req.params.postId;
        if (store.posts[postId] == null) return res.status(403).send(`No post with id=${postId} present.`);
        return res.status(201).send(store.posts[postId].comments);
    },
    add(req, res) {
        const postId = req.params.postId;
        if (store.posts[postId] == null) return res.status(403).send(`No post with id=${postId} present.`);
        let obj = {};
        obj.text = req.body.text;
        if (store.posts[postId].comments == null)
            store.posts[postId].comments = [];
        const id = store.posts[postId].comments.length;
        store.posts[postId].comments.push(obj);
        return res.status(201).send({ id: id });
    },
    update(req, res) {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        if (store.posts[postId] == null) return res.status(403).send(`No post with id=${postId} present.`);
        if (store.posts[postId].comments[commentId] == null) return res.status(403).send(`No comment with id=${commentId} present.`);
        let obj = {};
        obj.text = req.body.text;
        store.posts[postId].comments[commentId] = obj;
        return res.status(200).send({ post: store.posts[postId].comments[commentId] });
    },
    remove(req, res) {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        if (store.posts[postId] == null) return res.status(403).send(`No post with id=${postId} present.`);
        if (store.posts[postId].comments[commentId] == null) return res.status(403).send(`No comment with id=${commentId} present.`);
        store.posts[postId].comments.splice(commentId, 1);
        return res.status(200).send(`Comment with id= ${commentId} deleted.`);
    }
}