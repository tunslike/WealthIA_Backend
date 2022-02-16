const { v4: uuidv4 } = require("uuid");
const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class MessageManagerModel {


    // POST RESPONSE MESSAGE
    PostResponseMessage = async ({msgRuestID, message, response_by}) => {

        try {

            var today = new Date()
            var datecreated = today

            const uniqueId = uuidv4();

            const sql = `INSERT INTO wa_message_responses
            (RESPONSE_ID,
            MESSAGE_REQUEST_ID,
            RESPONSE_MESSAGE,
            RESPONSE_BY,
            RESPONSE_DATE
            ) VALUES (?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, msgRuestID, message, response_by, datecreated]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    } 

  // LOAD MESSAGE REPLIES
    LoadMessageReplies = async ({ messageID, messageOwner }) => {

//      const { columnSet, values } = multipleColumnSet(params)

	const sql = `SELECT DISTINCT R.RESPONSE_BY, MAX(R.RESPONSE_DATE) AS RESPONSE_DATE, MESSAGE_REQUEST_ID,(SELECT COMPANY_NAME from wa_clients C WHERE C.CLIENT_ID = R.RESPONSE_BY) AS COMPANY_NAME
                from wa_message_responses R WHERE  R.MESSAGE_REQUEST_ID = '`+ messageID  +`' AND R.RESPONSE_BY <> '`+ messageOwner +`' GROUP BY MESSAGE_REQUEST_ID, R.RESPONSE_BY;`

        const result = await query(sql);

        return result;
    }
    // END OF THAT

      // LOAD MESSAGE RESPONSE
    LoadMessageResponse = async (params = {}) => {

        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM WealthIA.wa_message_responses WHERE ${columnSet} ORDER BY RESPONSE_DATE DESC`;

        const result = await query(sql, [...values]);

        return result;
    }
    // END OF THAT


    // UPDATE MESSAGE READ STATUS
    UpdateMessageReadStatus = async (requestID) => {

        try {

            var today = new Date()
            var datecreated = today

            const sql = `UPDATE wa_client_messages SET CHECKED = 1, MESSAGE_READ_DATE = ? WHERE REQUEST_ID = ?`;
            const result = await query(sql, [datecreated, requestID]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    }

    // LOAD MESSAGE RESPONSE
    LoadMessageResponse = async (params = {}) => {

        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM WealthIA.wa_message_responses WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result;
    }
    // END OF THAT

    // GET CHANNEL NAME
    GetProviderEnquiryChannel = async (params = {}) => {

        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT SUB_CATEGORY_ID, CATEGORY_ID, SUB_NAME FROM wa_sub_categories 
                     WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result[0];

    }
    // END OF THAT

    // COUNT THE NUMBER OF MESSAGE
    GetNewMessagesCount = async (subcategoryid) => {
    
        const sql = `SELECT (SELECT COUNT(*) FROM wa_client_messages 
                    WHERE SUB_CATEGORY_ID = '`+ subcategoryid +`' AND 
                    STATUS = 0)TOTAL_MESSAGE, (SELECT COUNT(*) FROM wa_client_messages 
                    WHERE CHECKED = 0 AND SUB_CATEGORY_ID = '` + subcategoryid +`' AND STATUS = 0)UNREAD_MESSAGE;`;

        const result = await query(sql);

        return result;
    }

    // END OF MESSAGEs

      // LOAD MESSAGES
      LoadProviderEnquriesMessages = async (subcategoryid) => {
    
        const sql = `SELECT M.REQUEST_ID, U.FIRST_NAME, U.LAST_NAME, C.SUB_NAME, M.MESSAGE, 
                     M.TYPE, M.CHANNEL_CATEGORY, 
                     M.CHECKED, (DATE_FORMAT(M.DATE_CREATED,'%Y/%m/%d'))DATE_CREATED 
                     FROM wa_client_messages M LEFT JOIN 
                     wa_sub_categories C ON M.SUB_CATEGORY_ID = C.SUB_CATEGORY_ID 
                     LEFT JOIN wa_clients U ON M.CLIENT_ID = U.CLIENT_ID
                     WHERE M.SUB_CATEGORY_ID = '` + subcategoryid + `'`;

        const result = await query(sql);

        return result;
    }

    // LOAD MESSAGES
    LoadMessages = async (params = {}) => {
    
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT C.SUB_NAME, P.PROVIDER_NAME, M.REQUEST_ID, M.CLIENT_ID, M.MESSAGE, M.CHECKED, M.STATUS, 
                    M.TYPE, (DATE_FORMAT(M.DATE_CREATED,'%Y%m%d'))DATE_CREATED FROM 
                    wa_client_messages M LEFT JOIN wa_providers P ON M.PROVIDER_ID = P.PROVIDER_ID
                    LEFT JOIN wa_sub_categories C ON C.SUB_CATEGORY_ID = M.SUB_CATEGORY_ID
                    WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        return result;
    }

     // CREATE NEW CLIENT
     PostEnquiryMessage = async ({subcatid, clientid, type, message}) => {

        try {

            var today = new Date()
            var datecreated = today

            const uniqueId = uuidv4();

            const sql = `INSERT INTO wa_client_messages
            (REQUEST_ID,
            SUB_CATEGORY_ID,
            CLIENT_ID,
            MESSAGE,
            TYPE,
            DATE_CREATED) VALUES (?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, subcatid, clientid, message, type, datecreated]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    } 

     // CREATE NEW CLIENT
     PostProviderMessage = async ({subcatid, clientid, message, providerid, type, channelCategory}) => {

        try {

            var today = new Date()
            var datecreated = today

            const uniqueId = uuidv4();

            const sql = `INSERT INTO wa_client_messages
            (REQUEST_ID,
            SUB_CATEGORY_ID,
            CLIENT_ID,
            MESSAGE,
            PROVIDER_ID,
            TYPE,
            CHANNEL_CATEGORY,
            DATE_CREATED) VALUES (?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, subcatid, clientid, message, providerid, type, channelCategory, datecreated]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;

        }catch(ex) {
            console.log(ex);
        }
    } 

}

module.exports = new MessageManagerModel;
