const express = require('express');
const router = express.Router();
const MessageManagerController = require('../controllers/messageManager.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { validatePostMessage, validatePostProvider, validatePostMessageReply } = require('../middleware/validators/messageValidator.middleware');


router.post('/postMessageResponse', validatePostMessageReply, awaitHandlerFactory(MessageManagerController.PostMessageReply));
router.post('/postEnquiryMessage', validatePostMessage, awaitHandlerFactory(MessageManagerController.PostEnquiryMessage));
router.post('/postProviderMessage', validatePostProvider, awaitHandlerFactory(MessageManagerController.PostProviderMessage));
router.get('/loadMessages/:clientid', awaitHandlerFactory(MessageManagerController.LoadClientMessages));
router.get('/providerEnquries/:subcategoryid', awaitHandlerFactory(MessageManagerController.LoadProviderEnquiries));
router.get('/UpdateMessageReadStatus/:requestid', awaitHandlerFactory(MessageManagerController.UpdateMessageReadStatus));
router.get('/loadMessageResponses/:requestid', awaitHandlerFactory(MessageManagerController.loadMessageResponse));
router.post('/loadMessageReplies', awaitHandlerFactory(MessageManagerController.loadMessageReplies));    

module.exports = router;
