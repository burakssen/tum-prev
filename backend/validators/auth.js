const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/auth");

dotenv.config({path: "./config/config.env"});

exports.requestValidator = (method) => {
    switch (method){
        case endpoints.login: {
            return [];
        }
        case endpoints.logout: {
            return [];
        }

        case endpoints.token:{}
            return [];
        default:
            break;
    }
}