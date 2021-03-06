const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { registerClient, validateLogin, registerCompany } = require('../middleware/validators/clientValidator.middleware');
const { route } = require('./user.route');


router.get('/fetchProviderUserDetails/:providerid', awaitHandlerFactory(clientController.fetchProviderUserID));
router.post('/changePassword', awaitHandlerFactory(clientController.changeClientPassword));
router.post('/saveConnection', awaitHandlerFactory(clientController.saveClientConnection));
router.post('/resetPassword', awaitHandlerFactory(clientController.resetClientPassword));
router.post('/createProvider', awaitHandlerFactory(clientController.createProvider));
router.post('/registerClient', registerClient, awaitHandlerFactory(clientController.registerClient));
router.post('/registerCompany', registerCompany, awaitHandlerFactory(clientController.registerCompany));
router.post('/clientLogin', validateLogin, awaitHandlerFactory(clientController.clientLogin)); 
router.get('/fetchClientDetails/:userid', awaitHandlerFactory(clientController.fetchClientDetails));
router.get('/loadSectors', awaitHandlerFactory(clientController.loadSectors));
router.get('/fetchProviderDetails/:providerid', awaitHandlerFactory(clientController.fetchProviderDetails));
router.get('/fetchConnections/:clientid', awaitHandlerFactory(clientController.fetchConnections));

module.exports = router;
