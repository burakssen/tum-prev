const express = require("express");

const {endpoints} = require("../common/constants/endpoints/user");

const {
    getUserController,
    getWithUsernameController,
    createUserController,
    addRefreshTokenUserController
} = require("../controllers/user");

const {validationHandler} = require("../utils/validator");
const {requestValidator} = require("../validators/user");
const {authenticateToken} = require("../utils/authenticateToken");

const router = express.Router();

router.get(
    endpoints.get,
    validationHandler,
    requestValidator(endpoints.get),
    authenticateToken,
    getUserController
);

router.get(
    endpoints.getWithUsername,
    validationHandler,
    requestValidator(endpoints.getWithUsername),
    authenticateToken,
    getWithUsernameController
);

router.post(
    endpoints.create,
    validationHandler,
    requestValidator(endpoints.create),
    createUserController
);

router.post(
    endpoints.addRefreshToken,
    validationHandler,
    addRefreshTokenUserController
);

module.exports = router;
