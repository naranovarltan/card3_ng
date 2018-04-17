const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

router.get('/', require('./frontpage').get);

router.post('/login', require('./auth/login').post);

router.post('/signup', require('./auth/signup').post);

router.get('/chat', checkAuth, require('./chat').get);

module.exports = router;
