const express = require("express");

const {endpoints} = require("../common/constants/endpoints/auth");

const {
    loginAuthController,
    tokenAuthController,
    logoutAuthController
} = require("../controllers/auth");

const {validationHandler} = require("../utils/validator");
const {requestValidator} = require("../validators/auth");

const router = express.Router();

router.post(
    endpoints.login,
    validationHandler,
    requestValidator(endpoints.login),
    loginAuthController
);

router.post(
  endpoints.token,
  validationHandler,
  requestValidator(endpoints.token),
  tokenAuthController
);

router.delete(
    endpoints.logout,
    validationHandler,
    requestValidator(endpoints.logout),
    logoutAuthController
);


module.exports = router;