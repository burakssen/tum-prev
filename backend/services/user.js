const asyncHandler = require("../utils/async");
const dotenv = require("dotenv");
dotenv.config();

const {
    getUserData,
    getWithUsernameData,
    createUserData,
    addRefreshTokenUserData
} = require("../data/user");

exports.getUserService = asyncHandler(async (user) => {
    return await getUserData(user);
});

exports.getWithUsernameService = asyncHandler(async (body) => {
   return await getWithUsernameData(body.username);
});

exports.createUserService = asyncHandler(async (body) => {
    return await createUserData(body);
});

exports.addRefreshTokenUserService = asyncHandler(async (body)=>{
    return await addRefreshTokenUserData(body);
})