const { v4: uuidv4 } = require("uuid");
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class ClientModel {

    tableName = 'wa_clients';

          // CREATE PROVIDER
      saveConnection = async ({client_id, connect_id}) => {

        try {

            var today = new Date()
            var datecreated = today

            const sql = `INSERT INTO wa_connections (CLIENT_ID, CONNECTION_ID, DATE_CREATED) VALUES (?,?,?)`;
            const result = await query(sql, [client_id, connect_id, datecreated]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
            
        }catch(ex) {
            console.log(ex);
        }
    }

     // COUNT CONNECTIONS
     CountConnection = async ({client_id}) => {
	
	const sql = `SELECT COUNT(*)CONNECT_COUNT FROM wa_connections WHERE STATUS = 0 AND CLIENT_ID = ?`;

	const result  = await query(sql, [client_id]);

	return result[0];
     }

    // COUNT CONNECTIONS
     FetchProviderUserID = async ({provider_user_id}) => {
        
        const sql = `SELECT CLIENT_ID, CONTACT_NAME FROM wa_clients WHERE USER_ID = ?`;

        const result  = await query(sql, [provider_user_id]);

        return result[0];
     }

      // FIND ONE CLIENT
      CountUnreadMessages = async ({clientid}) => {
        
        const sql = `SELECT COUNT(*)MSG_COUNT FROM wa_client_messages WHERE CHECKED = 0 AND CLIENT_ID = ?`;

        const result = await query(sql, [clientid]);

        // return back the first row (user)
        return result[0];
    }

   //CHANGE CLIENT PASSWORD
   changePassword = async ({client_id, password}) => {

        try {

            var today = new Date()
            var datecreated = today

            const sql = `UPDATE wa_access SET ACCESS_ID = ?, RESET_PWD_DATE = ?, CHANGE_PWD = 0 WHERE CLIENT_ID = ?`;

            const result = await query(sql, [password, datecreated, client_id]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    }

    //RESET CLIENT PASSWORD
    changeClientPassword = async ({client_id, password}) => {

        try {

            var today = new Date()
            var datecreated = today

             const sql = `UPDATE wa_access SET ACCESS_ID = ?, CHANGE_PWD_DATE = ?, 
                         CHANGE_PWD = 1 WHERE CLIENT_ID = (SELECT CLIENT_ID FROM wa_clients WHERE USER_ID = ?);`;

            const result = await query(sql, [password, datecreated, client_id]);
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

        // FETCH CLIENT CONNECTIONS
    FetchClientConnections = async (params) => {

        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM wa_connections WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result;

    }

    // FETCH CLIENT ID
    FetchProviderDetails = async (params = {}) => {

        const { columnSet, values } = multipleColumnSet(params)
    
        const sql = `SELECT * FROM wa_providers WHERE ${columnSet}`;

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
    CreateProvider = async ({client_id, provider, sectorid}) => {

        try {

            var today = new Date()
            var datecreated = today

            const uniqueId = uuidv4();

            const sql = `INSERT INTO wa_providers (PROVIDER_ID, PROVIDER_NAME, SECTOR_ID, DATE_CREATED) 
                         VALUES (?,?,?,?)`;
            const result = await query(sql, [client_id, provider, sectorid, datecreated]);

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
            (CLIENT_ID, USER_ID, COMPANY_NAME, CONTACT_NAME, SECTOR_ID, MOBILE_PHONE, EMAIL, TYPE, STATE, DATE_CREATED, IP_ADDRESS, PROVIDER_ID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, email, company_name, contactName, sector, mobile, email, client_type, state, datecreated, ip, uniqueId]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    }

}

module.exports = new ClientModel;
