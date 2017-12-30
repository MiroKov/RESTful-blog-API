let store = require('../data/store');
module.exports = {
    get(req, res) {
        return res.status(201).send(store.posts);
    },
    add(req, res) {
        const id = store.posts.length;
        let obj = {};
        obj.name = req.body.name;
        obj.url = req.body.url;
        obj.text = req.body.text;
        obj.comments = req.body.comments;
        store.posts.push(obj);
        return res.status(201).send({ id: id });
    },
    update(req, res) {
        const id = req.params.id;
        if (store.posts[id]==null) return res.status(403).send(`No post with id=${id} present.`);
        let obj = {};
        obj.name = req.body.name;
        obj.url = req.body.url;
        obj.text = req.body.text;
        obj.comments = req.body.comments;
        store.posts[id] = obj;
        return res.status(200).send({ post: store.posts[id] });
    },
    remove(req, res) {
        const id = req.params.id;
        if (store.posts[id]==null) return res.status(403).send(`No post with id=${id} present.`);
        store.posts.splice(id, 1);
        return res.status(200).send(`Post with id= ${id} deleted.`);
    }
}