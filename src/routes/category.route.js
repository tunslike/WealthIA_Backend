const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/loadSectorProviders/:sub_category_id', awaitHandlerFactory(categoryController.loadSectorProviders));
router.get('/', awaitHandlerFactory(categoryController.getAllCategories));
router.get('/subCategories/:category_id', awaitHandlerFactory(categoryController.getSubCategories));
router.post('/createSubCategory', awaitHandlerFactory(categoryController.createSubCategory));
router.get('/createSector/:name', awaitHandlerFactory(categoryController.createSector));

module.exports = router;
