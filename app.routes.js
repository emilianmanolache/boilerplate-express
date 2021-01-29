let express = require('express');
let router = express.Router();

let Handler = require('./controllers/handler');

router.get('/api/process', Handler.process);

module.exports = router;