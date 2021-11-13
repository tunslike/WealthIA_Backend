const MessageManagerModel = require('../models/messageManager.model');
const HttpException = require('../utils/HttpException.utils');

class MessageManagerController {



    //GET ALL CATEGORIES
    GetNewResponseMessage = async (req, res, next) => {

        let messages = await MessageManagerModel.LoadMessages({ CLIENT_ID: req.params.clientid });

        if (!messages.length) {
            throw new HttpException(404, 'Unable to load messages');
        }

        res.send(messages);
    };

    //GET ALL CATEGORIES
    LoadProviderEnquiries = async (req, res, next) => {

        const enquiries = await MessageManagerModel.LoadProviderEnquriesMessages(req.params.subcategoryid);

        if (!enquiries.length) {
            throw new HttpException(404, 'Unable to load messages');
        }

        const msgData = await MessageManagerModel.GetNewMessagesCount(req.params.subcategoryid)

        const category = await MessageManagerModel.GetProviderEnquiryChannel({ SUB_CATEGORY_ID: req.params.subcategoryid })

        res.send({enquiries, msgData, category});

    };


    //GET ALL CATEGORIES
    LoadClientMessages = async (req, res, next) => {

        let messages = await MessageManagerModel.LoadMessages({ CLIENT_ID: req.params.clientid });

        if (!messages.length) {
            throw new HttpException(404, 'Unable to load messages');
        }

        res.send(messages);
    };


     //POST ENQUIRY MESSAGE
     PostMessageReply = async (req, res, next) => {

        const result = await MessageManagerModel.PostResponseMessage(req.body);

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        //load message replys
        const messageReplys = await MessageManagerModel.LoadMessageResponse({MESSAGE_REQUEST_ID :req.body.msgRuestID});

        res.send(messageReplys);
    };

    //POST ENQUIRY MESSAGE
    PostEnquiryMessage = async (req, res, next) => {

        const result = await MessageManagerModel.PostEnquiryMessage(req.body);

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Enquiry Message was posted successfully!');
    };

     //UPDATE ENQUIRY MESSAGE
     UpdateMessageReadStatus = async (req, res, next) => {

        const result = await MessageManagerModel.UpdateMessageReadStatus(req.params.requestid );

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Enquiry Message read status was updated successfully!');
    };

    //POST PROVIDER MESSAGE
    PostProviderMessage = async (req, res, next) => {

        const result = await MessageManagerModel.PostProviderMessage(req.body);

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Provider Message was posted successfully!');
    };

}

module.exports = new MessageManagerController;