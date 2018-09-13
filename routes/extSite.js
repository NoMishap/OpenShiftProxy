var express = require('express');
var router = express.Router();
var extSite = require('../controller/extSite')

/* GET home page. */
router.get('/', extSite.get);

module.exports = router;
