const express = require('express');
const router = express.Router();
const { uploadFile } = require('../../services/upload-miniature')

const service = require('../../services/v1/game');

router.get('/all', service.getAll);

router.get('/:id', service.getById);

router.put('/add', uploadFile, service.add);

router.patch('/update/:id', uploadFile, service.update);

router.delete('/delete/:id', service.delete);

module.exports = router;