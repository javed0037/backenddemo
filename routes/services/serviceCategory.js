const db = require('../../db'),
    global_fun = require('../../utils/globalFunction'),
    CONSTANTS = require('../../utils/constants');
let Category = db.Catgory;
let resultdb = global_fun.resultdb;


const findOneCategory = async (requestObject) => {
    try {
        var category = await Category.findOne(requestObject);
        if (category === null) {
            return resultdb(CONSTANTS.NOT_FOUND, CONSTANTS.DATA_NULL)
        } else {
            return resultdb(CONSTANTS.SUCCESS, category)
        }
    } catch (error) {
        return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL)
    }
};


const saveCategory = async (data) => {
    try {
        const CategorySchema = new Category(data);
        const responnse = await CategorySchema.save();
        return resultdb(CONSTANTS.SUCCESS, responnse)
    } catch (error) {
        console.log("there are the catch error", error);
        if (error.code)
            return resultdb(error.code, CONSTANTS.DATA_NULL)
        return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
    }
};

module.exports = {
    findOneCategory: findOneCategory,
    saveCategory: saveCategory,
};