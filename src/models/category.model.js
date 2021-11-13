const { v4: uuidv4 } = require("uuid");
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

const datecreated = '1983-09-05 13:28:00';

class CategoryModel {

    tableName = 'wa_categories';

    // GET ALL CATEGORIES
    GetAll = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    // GET SUB CATEGORIES
    GetSubCategories = async (params = {}) => {

        const { columnSet, values } = multipleColumnSet(params)
    
        const sql = `SELECT * FROM wa_sub_categories WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result;
    }

    // CREATE NEW CLIENT
    createSector = async (sector) => {

        try {

            const uniqueId = uuidv4();

            const sql = `INSERT INTO wa_sectors
            (SECTOR_ID,
            SECTOR_NAME,
            DATE_CREATED) VALUES (?,?,?)`;

            const result = await query(sql, [uniqueId, sector, datecreated]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    } 

     // CREATE NEW CLIENT
     createSubCategory = async ({ categoryid, subname, sectorid}) => {

        try {

            const uniqueId = uuidv4();

            const sql = `INSERT INTO wa_sub_categories
            (SUB_CATEGORY_ID,
            CATEGORY_ID,
            SUB_NAME,
            SECTOR_ID,
            DATE_CREATED) VALUES (?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, categoryid, subname, sectorid, datecreated]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    }
}

module.exports = new CategoryModel;