const {body} = require("express-validator");
const dotenv = require("dotenv");
const {endpoints} = require("../common/constants/endpoints/user");

dotenv.config({path: "./config/config.env"});

exports.requestValidator = (method) => {
    switch(method){
        case endpoints.get: {
            return [
                body("username")
                .exists()
                .withMessage("Username is required")
                .isLength({min: 2, max:32})
                .withMessage("Name should be between 2-32 characters")
            ]
        }
        case endpoints.getWithUsername: {
            return [
                body("username")
                    .exists()
                    .withMessage("Username is required")
                    .isLength({min: 2, max: 32})
                    .withMessage("Name should be between 2-32 characters")
            ];
        }
        case endpoints.create:{
            return [
                body("username")
                    .exists()
                    .withMessage("Username is required")
                    .isLength({min:2, max:32})
                    .withMessage("Username should be between 2-32 characters"),
                body("password")
                    .exists()
                    .withMessage("Password is required")
            ]
        }
        default:
            break;
    }
}