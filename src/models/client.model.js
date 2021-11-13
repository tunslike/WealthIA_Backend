const { v4: uuidv4 } = require("uuid");
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class ClientModel {

    tableName = 'wa_clients';

    // CHANGE CLIENT PASSWORD
    changeClientPassword = async (client_id, hash_password) => {

        try {

            var today = new Date()
            var datecreated = today

            const sql = `INSERT INTO wa_access (CLIENT_ID, ACCESS_ID, DATE_CREATED) VALUES (?,?,?)`;
            const result = await query(sql, [client_id, hash_password, datecreated]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    }

    // FETCH CLIENT PASSWORD DETAILS
    fetchPasswordDetails = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM wa_access WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    // FIND ONE CLIENT
    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    // FETCH CLIENT ID
    FetchProviderDetails = async (params = {}) => {

        const { columnSet, values } = multipleColumnSet(params)
    
        const sql = `SELECT * FROM WealthIA.wa_providers 
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    // FETCH CLIENT ID
    FetchClientID = async (params = {}) => {

        const { columnSet, values } = multipleColumnSet(params)
    
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    // CREATE PROVIDER
    CreateProvider = async ({provider, sectorid}) => {

        try {

            var today = new Date()
            var datecreated = today

            const uniqueId = uuidv4();

            const sql = `INSERT INTO wa_providers (PROVIDER_ID, PROVIDER_NAME, SECTOR_ID, DATE_CREATED) 
                         VALUES (?,?,?,?)`;
            const result = await query(sql, [uniqueId, provider, sectorid, datecreated]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }

    }

    // CREATE PASSWORD ACCESS
    createAccess = async (client_id, hash_password) => {

        try {

            var today = new Date()
            var datecreated = today

            const sql = `INSERT INTO wa_access (CLIENT_ID, ACCESS_ID, DATE_CREATED) VALUES (?,?,?)`;
            const result = await query(sql, [client_id, hash_password, datecreated]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    }

    // FETCH CLIENT DETAILS
    FetchClientDetails = async (params = {}) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }
    

    // CREATE NEW CLIENT
    createClient = async ({ last_name, first_name, mobile, email, client_type, state}, ip) => {

        try {

            var today = new Date()
            var datecreated = today

            const uniqueId = uuidv4();

            const sql = `INSERT INTO ${this.tableName}
            (CLIENT_ID, USER_ID, LAST_NAME, FIRST_NAME, MOBILE_PHONE, EMAIL, TYPE, STATE, DATE_CREATED, IP_ADDRESS) VALUES (?,?,?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, email, last_name, first_name, mobile, email, client_type, state, datecreated, ip]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    }

    // GET ALL CATEGORIES
    GetSectors = async (params = {}) => {

        let sql = `SELECT SECTOR_ID, SECTOR_NAME FROM WealthIA.wa_sectors`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        return await query(sql, [...values]);
    }

    // CREATE NEW COMPANY
    createCompany = async ({ company_name, sector, contactName, mobile, email, client_type, state}, ip) => {

        try {

            var today = new Date()
            var datecreated = today

            const uniqueId = uuidv4();

            const sql = `INSERT INTO ${this.tableName}
            (CLIENT_ID, USER_ID, COMPANY_NAME, CONTACT_NAME, SECTOR_ID, MOBILE_PHONE, EMAIL, TYPE, STATE, DATE_CREATED, IP_ADDRESS) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, email, company_name, contactName, sector, mobile, email, client_type, state, datecreated, ip]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    }

}

module.exports = new ClientModel;