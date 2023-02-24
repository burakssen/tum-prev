const asyncHandler = require("../utils/async");
const dotenv = require("dotenv");

dotenv.config();

const jwt = require("jsonwebtoken");

const {
    SUCCESS, SERVER_ERROR, BAD_REQUEST, NOT_AUTHORIZED
} = require("../common/constants/statusCodes");

const {
    getUserService,
    getWithUsernameService,
    createUserService,
    addRefreshTokenUserService
} = require("../services/user");
const {getWithUsernameData} = require("../data/user");

exports.getUserController = asyncHandler(async (req, res) => {
    const result = await getUserService(req.body);
    res.status(SUCCESS).json({user: result});
});

exports.getWithUsernameController = asyncHandler(async (req, res) => {
   const result = await getWithUsernameService(req.body);
   res.status(SUCCESS).json(result);
});

exports.createUserController = asyncHandler(async (req, res) => {
   const result = await createUserService(req.body);
   res.status(SUCCESS).json(result);
});

exports.addRefreshTokenUserController = asyncHandler(async (req, res) => {
   const result = await addRefreshTokenUserService(req.body);
   res.status(SUCCESS).json(result);
});

