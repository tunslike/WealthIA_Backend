const CategoryModel = require('../models/category.model');
const HttpException = require('../utils/HttpException.utils');

class CategoryController {

    //GET ALL CATEGORIES
    getAllCategories = async (req, res, next) => {
        let categoryList = await CategoryModel.GetAll();
        if (!categoryList.length) {
            throw new HttpException(404, 'Unable to load categories');
        }
        res.send(categoryList);
    };

    //GET ALL CATEGORIES
    getSubCategories = async (req, res, next) => {

        let subList = await CategoryModel.GetSubCategories({ CATEGORY_ID: req.params.category_id });

        if (!subList.length) {
            throw new HttpException(404, 'Unable to load categories');
        }

        res.send(subList);
    };

    //ADD SUB CATEGOGY
    createSubCategory = async (req, res, next) => {

        const result = await CategoryModel.createSubCategory(req.body);

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Sub category was created!');
    };

     //ADD SECTOR NAME
     createSector = async (req, res, next) => {

        const result = await CategoryModel.createSector(req.params.name);

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Sector was created!');
    };

}

module.exports = new CategoryController;