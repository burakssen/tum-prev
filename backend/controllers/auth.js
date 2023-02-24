const asyncHandler = require("../utils/async");
const {comparePassword} = require("../utils/encryption");


const {
    getWithUsernameData,
    addRefreshTokenUserData,
    getRefreshTokenUserData,
    deleteRefreshTokenUserData
} = require("../data/user");

const {NOT_AUTHORIZED, SUCCESS} = require("../common/constants/statusCodes");
const jwt = require("jsonwebtoken");
//const {rdsClient} = require("../utils/rds");

exports.loginAuthController = asyncHandler(async  (req, res) => {

    console.log("Bu bir denemedir");
    let result = await getWithUsernameData(req.body.username);
    if(result === undefined)
        res.status(NOT_AUTHORIZED).json("User is not available");


    if(await comparePassword(req.body.password, result.password)){
        const user = {username: req.body.username};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        //await rdsClient.set(req.body.username, refreshToken);
        //await rdsClient.disconnect();

        if(result.refreshTokens == null)
            result.refreshTokens = [];
        result.newRefreshToken = refreshToken;
        await addRefreshTokenUserData(result);

        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Expose-Headers', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.cookie("refreshToken", refreshToken, {httpOnly:true, secure:true});
        res.status(SUCCESS).json({accessToken: accessToken});
    }
    else{
        res.status(NOT_AUTHORIZED).json("Password is wrong");
    }
});

exports.tokenAuthController = asyncHandler(async (req, res) => {
    //const refreshToken = await rdsClient.get(req.body.username);
    const refreshToken = null;
    if (refreshToken == null) return res.sendStatus(401);
    const refreshTokens = await getRefreshTokenUserData(req.body);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = jwt.sign({name: user.name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
        res.json({accessToken: accessToken});
    });
});

exports.logoutAuthController = asyncHandler(async (req, res) => {
    const val = await deleteRefreshTokenUserData(req.body);
    if(val.ok === true) res.json("You logout");
    else res.sendStatus(401);
});

