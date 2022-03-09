const express = require('express');
const router = express.Router();

const service = require('../../services/v1/list');

router.get('/:list', service.getList);

module.exports = router;