const { body } = require('express-validator');

exports.validatePostMessage = [
    body('clientid')
        .notEmpty()
        .withMessage('Client ID is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('subcatid')
        .notEmpty()
        .withMessage('Sub Category ID is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('message')
        .notEmpty()
        .withMessage('Message cannot be empty')
        .isLength({ min: 50 })
        .withMessage('Must be at least 50 chars long'),      
];

exports.validatePostMessageReply = [
    body('msgRuestID')
        .notEmpty()
        .withMessage('Message ID is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('response_by')
        .notEmpty()
        .withMessage('Response by is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('message')
        .notEmpty()
        .withMessage('Message cannot be empty')
        .isLength({ min: 50 })
        .withMessage('Must be at least 50 chars long'),      
];

exports.validatePostProvider = [
    body('clientid')
        .notEmpty()
        .withMessage('Client ID is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('providerid')
        .notEmpty()
        .withMessage('Provider ID is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('subcatid')
        .notEmpty()
        .withMessage('Sub Category ID is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('message')
        .notEmpty()
        .withMessage('Message cannot be empty')
        .isLength({ min: 50 })
        .withMessage('Must be at least 50 chars long'),  
    body('type')
        .notEmpty()
        .withMessage('Message Type cannot be empty')
        .isLength({ min: 50 })
        .withMessage('Must be at least 50 chars long'),              
];