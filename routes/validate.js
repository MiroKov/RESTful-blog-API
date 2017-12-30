const { check, validationResult } = require('express-validator/check')

const validatePosts = [
    check('name').isLength({ min: 1 }).withMessage('name is required'),
    check('url').isURL().withMessage('must be a valid URL'),
    check('text').exists()
];
const validateComments = [
    check('text').exists()
];
const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    next();
}
exports.posts = [validatePosts, handleErrors];
exports.comments = [validateComments, handleErrors];