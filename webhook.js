const
    express = require('express'),
    router = express.Router();

router.get('*', function (req, res) {
    res.send('hello get');
});

router.post('*', function (req, res, next) {
    res.send('hello post');
});

module.exports = router;