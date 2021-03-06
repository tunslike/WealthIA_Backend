const ClientModel = require('../models/client.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class ClientController {


     // FETCH PROVIDER ID  DETAILS
     fetchProviderUserID = async (req, res, next) => {

        const details = await ClientModel.FetchProviderUserID({provider_user_id: req.params.providerid});

        if (!details) {
            throw new HttpException(404, 'Unable to process request');
        }

        res.send(details);
    };

     //SAVE CLIENT CONNECTION CLIENT PASSWORD CLIENT DETAILS
     saveClientConnection = async (req, res, next) => {

        const connec = await ClientModel.saveConnection(req.body);

        if (!connec) {
            throw new HttpException(404, 'Unable to process request');
        }

        res.status(201).send('Connection saved!');
    };

   //CHANGE CLIENT PASSWORD CLIENT DETAILS
    changeClientPassword = async (req, res, next) => {

        let newpwd = await this.hashPassword(req.body.nwPwd);

        const user = await ClientModel.changePassword({client_id: req.body.clientID, password:newpwd});

        if (!user) {
            throw new HttpException(404, 'Unable to process request');
        }

        res.status(200).send('Your password was changed successfully!');
    };

     //RESET CLIENT PASSWORD CLIENT DETAILS
    resetClientPassword = async (req, res, next) => {

        let newpwd = await this.hashPassword("123456");

        const user = await ClientModel.changeClientPassword({client_id: req.body.emailid, password:newpwd});

        if (!user) {
            throw new HttpException(404, 'Unable to process request');
        }

        res.status(200).send('Your password was reset successfully!');
    };

    //FETCH CLIENT DETAILS
    fetchClientDetails = async (req, res, next) => {

        const user = await ClientModel.FetchClientDetails({ CLIENT_ID: req.params.userid });
        if (!user) {
            throw new HttpException(404, 'Client not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    //FETCH CLIENT DETAILS
    fetchProviderDetails = async (req, res, next) => {

        const provider = await ClientModel.FetchProviderDetails({ PROVIDER_ID: req.params.providerid });

        if (!provider) {
            throw new HttpException(404, 'Client not found');
        }

        res.send(provider);
    };

 //FETCH CLIENT CONNECTIONS
    fetchConnections = async (req, res, next) => {

        const connection = await ClientModel.FetchClientConnections({ CLIENT_ID: req.params.clientid });

        if (!connection) {
            throw new HttpException(404, 'Client not found');
        }

        res.send(connection);
    };

    // CLIENT LOGIN
    clientLogin = async (req, res, next) => {
        this.checkValidation(req);

        console.log("Request just came in Now");

        const { email, password: pass } = req.body;

        const user = await ClientModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const pwd = await ClientModel.fetchPasswordDetails({ CLIENT_ID: user.CLIENT_ID });

        if(!pwd) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, pwd.ACCESS_ID);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect email or password!');
        }

        const providerDetails = await ClientModel.FetchProviderDetails({ PROVIDER_ID: user.PROVIDER_ID });

        // user matched!
        const secretKey = process.env.SECRET_JWT || "weathiauser";
        const token = jwt.sign({ user_id: user.USER_ID.toString() }, secretKey, {
            expiresIn: '24h'
        });

        const messageCount = await ClientModel.CountUnreadMessages({clientid: user.CLIENT_ID})       

	const connection = await ClientModel.CountConnection({client_id: user.CLIENT_ID});

        const { SEQ_NUM, DATE_CREATED, IP_ADDRESS, STATUS, ...userWithoutPassword } = user;

        res.send({ ...userWithoutPassword, token, providerDetails, messageCount, connection });
    };

    //CREATE PROVIDER
    createProvider = async (req, res, next) => {

        const result = await ClientModel.CreateProvider(req.body);

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Provider was created!');
    };

    //REGISTER NEW COMPANY
    registerCompany = async (req, res, next) => {

        this.checkValidation(req);

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const result = await ClientModel.createCompany(req.body, ip);

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        const user = await ClientModel.FetchClientID({ USER_ID: req.body.email });

        if(user) {

            let clientid = user.CLIENT_ID;
            let password = await this.hashPassword("123456");

            const pwd = await ClientModel.createAccess(clientid, password);

	    const provider = await ClientModel.CreateProvider({client_id: clientid, provider:req.body.company_name, sectorid:req.body.sector});
        }

        res.status(201).send('Client was created!');
    };

     //GET ALL CATEGORIES
     loadSectors = async (req, res, next) => {

        let sectors = await ClientModel.GetSectors();

        if (!sectors.length) {
            throw new HttpException(404, 'Unable to load sectors');
        }
        res.send(sectors);

    };

    //REGISTER NEW CLIENT
    registerClient = async (req, res, next) => {

        this.checkValidation(req);

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const result = await ClientModel.createClient(req.body, ip);

        if (!result) {

            throw new HttpException(500, 'Something went wrong');
        }

        const user = await ClientModel.FetchClientID({ USER_ID: req.body.email });

        if(user) {

            let clientid = user.CLIENT_ID;
            let password = await this.hashPassword("123456");

            const pwd = await ClientModel.createAccess(clientid, password);
        }

        res.status(201).send('Client was created!');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

     // hash password if it exists
     hashPassword = async (password) => {
        if (password) {
            password = await bcrypt.hash(password, 8);
        }
        return password;
    }

}

module.exports = new ClientController;
