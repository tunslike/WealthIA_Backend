const { body } = require('express-validator');

exports.registerCompany = [
    body('contactName')
        .notEmpty()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('company_name')
        .notEmpty()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('sector')
        .notEmpty()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('state')
        .notEmpty()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('email')
        .notEmpty()
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('mobile')
        .notEmpty()
        .isNumeric()
        .withMessage('Must be a valid phone number'),
    body('client_type')
        .notEmpty()
        .isIn(['Individual', 'Company'])
        .withMessage('Invalid Role type'),
];

exports.registerClient = [
    body('first_name')
        .notEmpty()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('last_name')
        .notEmpty()
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('email')
        .notEmpty()
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('mobile')
        .notEmpty()
        .isNumeric()
        .withMessage('Must be a valid phone number'),
    body('client_type')
        .notEmpty()
        .isIn(['Individual', 'Company'])
        .withMessage('Invalid Role type'),
];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];