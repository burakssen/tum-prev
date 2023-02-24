const {nano} = require("../config/database");
const {cryptPassword} = require("../utils/encryption");
const db = nano.use("users");

exports.getUserData = async (_user) => {

}

exports.getWithUsernameData = async(_username)=>{
    const query = {
        selector: {
            username: _username,
        },
        limit: 1
    }
    return (await db.find(query)).docs[0];
}

exports.createUserData = async (_body)=>{
    return await db.insert({
        username: _body.username,
        password: await cryptPassword(_body.password)
    });
}

exports.addRefreshTokenUserData = async (_body) =>{
    const query = {
        limit: 1,
        selector: {
            username: _body.username
        }
    }
    let ts = new Date();
    ts.setDate(ts.getDate() + 5);


    let user = (await db.find(query)).docs[0];
    user["refreshTokens"] = [..._body.refreshTokens, _body.newRefreshToken];
    await db.insert(user);
}

exports.getRefreshTokenUserData = async (_body) => {
    const query = {
        limit: 1,
        selector: {
            username: _body.username
        }
    }

    return (await db.find(query)).docs[0].refreshTokens;
}

exports.deleteRefreshTokenUserData = async (_body) => {
    const query = {
        limit: 1,
        selector: {
            username: _body.username
        }
    }

    let user = (await db.find(query)).docs[0];
    user['refreshTokens'] = user['refreshTokens'].filter(token => token !== _body.token);
    return await db.insert(user);
}